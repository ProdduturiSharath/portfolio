const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.beforeEach(async ({ page }) => {
  const runtimeErrors = [];
  page.on('pageerror', error => runtimeErrors.push(error.message));
  page.runtimeErrors = runtimeErrors;
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test.afterEach(async ({ page }) => {
  expect(page.runtimeErrors).toEqual([]);
});

test('responsive content, navigation, résumé, and skip link', async ({ page }) => {
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();

  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  const resume = page.getByRole('link', { name: 'View résumé', exact: true }).first();
  const response = await page.request.get(await resume.getAttribute('href'));
  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('application/pdf');

  await page.setViewportSize({ width: 390, height: 844 });
  const menu = page.getByRole('button', { name: /^(Open|Close) navigation$/ });
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: /Selected work/ }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeHidden();
});

test('project filters and case studies preserve focus and full technical content', async ({ page }) => {
  const projects = page.locator('#projects');
  const filters = page.getByRole('group', { name: 'Filter projects' });
  await expect(projects.locator('article')).toHaveCount(3);
  for (const filter of ['Multi-agent', 'Fine-tuning', 'RAG pipelines']) {
    await filters.getByRole('button', { name: filter, exact: true }).click();
    await expect(projects.locator('article')).toHaveCount(1);
    const openButton = projects.getByRole('button', { name: /View details:/ });
    await expect(openButton).toHaveAttribute('aria-haspopup', 'dialog');
    // Click the artwork, well outside the visible details button.
    await projects.locator('article').click({ position: { x: 24, y: 24 } });
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading', { name: 'Engineering highlights' })).toBeVisible();
    await page.keyboard.press('Shift+Tab');
    expect(await dialog.evaluate(element => element.contains(document.activeElement))).toBe(true);
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(openButton).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
    await openButton.press('Enter');
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
  }
  await filters.getByRole('button', { name: /All work/ }).click();
  await expect(projects.locator('article')).toHaveCount(3);
  await page.setViewportSize({ width: 390, height: 844 });
  await projects.locator('article').first().click({ position: { x: 24, y: 24 } });
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Close project details' }).click();
  await expect(projects.getByRole('button', { name: /View details:/ }).first()).toBeFocused();
});

test('expanded architecture fits every project on desktop, tablet, and mobile', async ({ page }) => {
  const projects = [
    { name: /View details: Enterprise Multi-Agent/, firstStage: 'User query' },
    { name: /View details: SLM Instruction/, firstStage: 'Support dataset' },
    { name: /View details: Enterprise RAG/, firstStage: 'Knowledge sources' },
  ];

  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const project of projects) {
      await page.getByRole('button', { name: project.name }).click();
      const dialog = page.getByRole('dialog');
      const details = dialog.locator('.technical-diagram');
      const summary = details.locator('summary');
      const figure = details.getByRole('figure');
      await expect(figure).toBeHidden();
      await summary.focus();
      await summary.press('Enter');
      await expect(figure).toBeVisible();
      await expect(figure.locator('.architecture-stage')).toHaveCount(3);
      await expect(figure.locator('.architecture-supports > li')).toHaveCount(2);
      await expect(figure.locator('.architecture-stage strong').first()).toHaveText(project.firstStage);

      // Catch wide diagrams and clipped labels, including at narrow phone widths.
      for (const region of [dialog, figure]) {
        expect(await region.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
      }
      const labelsFit = await figure.locator('strong, p, .architecture-tech').evaluateAll(elements =>
        elements.every(element => element.scrollWidth <= element.clientWidth)
      );
      expect(labelsFit).toBe(true);
      const [first, second] = await figure.locator('.architecture-stage').evaluateAll(elements =>
        elements.slice(0, 2).map(element => {
          const { x, y, right, bottom } = element.getBoundingClientRect();
          return { x, y, right, bottom };
        })
      );
      if (width <= 390) expect(second.y).toBeGreaterThan(first.bottom);
      if (width === 1440) expect(second.x).toBeGreaterThan(first.right);

      await summary.press('Enter');
      await expect(figure).toBeHidden();
      await expect(dialog).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(dialog).toBeHidden();
      await expect(page.getByRole('button', { name: project.name })).toBeFocused();
    }
  }
});

test('expertise search, empty state, and experience details', async ({ page }) => {
  const search = page.getByRole('searchbox', { name: 'Search technologies' });
  await search.fill('Python');
  await expect(page.locator('.skill-tags li')).toHaveText(['Python']);
  await page.getByRole('group', { name: 'Filter expertise' }).getByRole('button', { name: 'AI systems' }).click();
  await expect(page.getByText(/No technologies match/)).toBeVisible();
  await page.getByRole('button', { name: 'Reset filters' }).click();
  await expect(page.locator('.skill-card')).toHaveCount(4);
  const hcl = page.getByRole('button', { name: 'HCL Technologies' });
  await hcl.click();
  await expect(hcl).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('button', { name: 'LTIMindtree' })).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#experience-hcl-tech-intern')).toBeVisible();
});

test('contact validates fields and handles successful, failed, and offline submissions', async ({ page }) => {
  let mode = 'success';
  const payloads = [];
  await page.route('https://formspree.io/f/**', async route => {
    payloads.push(route.request().postDataJSON());
    if (mode === 'offline') return route.abort('failed');
    await route.fulfill({ status: mode === 'success' ? 200 : 422, contentType: 'application/json', body: JSON.stringify(mode === 'success' ? { ok: true } : { error: 'Please try again later.' }) });
  });
  const send = page.getByRole('button', { name: 'Send message', exact: true });
  await send.click();
  await expect(page.getByLabel('Your name', { exact: false })).toBeFocused();
  expect(payloads).toHaveLength(0);

  const fillForm = async () => {
    await page.getByLabel('Your name', { exact: false }).fill('  Portfolio visitor  ');
    await page.locator('#email').fill('visitor@example.com');
    await page.getByLabel("What's on your mind?", { exact: false }).fill('I would love to discuss your AI systems.');
  };
  await fillForm();
  await page.locator('#email').fill('invalid');
  await send.click();
  await expect(page.locator('#email')).toBeFocused();
  expect(payloads).toHaveLength(0);
  await page.locator('#email').fill('visitor@example.com');
  await send.click();
  await expect(page.getByText(/Message sent. Thank you/)).toBeVisible();
  await expect(page.locator('#name')).toHaveValue('');
  expect(payloads[0].name).toBe('Portfolio visitor');

  mode = 'error';
  await fillForm();
  await send.click();
  await expect(page.getByRole('alert')).toHaveText('Please try again later.');
  await expect(page.locator('#message')).not.toHaveValue('');
  mode = 'offline';
  await send.click();
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(send).toBeEnabled();
  expect(payloads).toHaveLength(3);
});

test('3D animation pauses on demand, offscreen, and for reduced motion', async ({ page }) => {
  const canvas = page.locator('.sculpture-stage canvas');
  const image = () => canvas.evaluate(element => element.toDataURL());
  await expect(page.getByRole('button', { name: /Animation disabled by reduced motion/ })).toBeDisabled();
  const still = await image();
  await page.waitForTimeout(150);
  expect(await image()).toBe(still);

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.getByRole('button', { name: 'Pause animation', exact: true })).toBeEnabled();
  const start = await image();
  await expect.poll(image).not.toBe(start);
  await page.getByRole('button', { name: 'Pause animation', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Play animation', exact: true })).toBeVisible();
  const paused = await image();
  await page.waitForTimeout(150);
  expect(await image()).toBe(paused);

  await page.getByRole('button', { name: 'Play animation', exact: true }).click();
  await page.locator('#contact').evaluate(element => element.scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(150);
  const offscreen = await image();
  await page.waitForTimeout(150);
  expect(await image()).toBe(offscreen);
});

test('desktop, mobile, and project dialog pass automated accessibility checks', async ({ page }) => {
  const scan = async () => {
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(results.violations).toEqual([]);
  };
  await scan();
  await page.getByRole('button', { name: /View details:/ }).first().click();
  await page.locator('.technical-diagram summary').click();
  await scan();
  await page.setViewportSize({ width: 390, height: 844 });
  await scan();
  await page.keyboard.press('Escape');
  await scan();
});
