import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Loader2, Send } from 'lucide-react';
import { submitContactForm } from '../services/api';
import { Reveal } from './Motion';

const emptyForm = { name: '', email: '', message: '' };
const validate = (name, value) => {
  if (!value.trim()) return `${name === 'name' ? 'Your name' : name === 'email' ? 'An email address' : 'A message'} is required.`;
  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address.';
  return '';
};

export default function ContactForm({ personalInfo }) {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [copyStatus, setCopyStatus] = useState('');
  const copyTimer = useRef(null);
  const formRef = useRef(null);
  const inFlight = useRef(false);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(previous => ({ ...previous, [name]: value }));
    if (errors[name]) setErrors(previous => ({ ...previous, [name]: validate(name, value) }));
    if (feedback) setFeedback(null);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (inFlight.current) return;
    const nextErrors = Object.fromEntries(Object.entries(formData).map(([name, value]) => [name, validate(name, value)]));
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors).find(name => nextErrors[name]);
    if (firstInvalid) {
      formRef.current.elements.namedItem(firstInvalid)?.focus();
      return;
    }
    inFlight.current = true;
    setSubmitting(true);
    setFeedback(null);
    try {
      const result = await submitContactForm(Object.fromEntries(Object.entries(formData).map(([name, value]) => [name, value.trim()])));
      setFeedback({ type: result.success ? 'success' : 'error', message: result.success ? "Message sent. Thank you for reaching out — let's build something meaningful." : result.message || 'Something went wrong. Please try again or email me directly.' });
      if (result.success) {
        setFormData(emptyForm);
        setErrors({});
      }
    } catch {
      setFeedback({ type: 'error', message: 'Unable to send right now. Please try again or email me directly.' });
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopyStatus('Email copied');
    } catch {
      setCopyStatus('Please select the email address to copy it.');
    }
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyStatus(''), 3500);
  };

  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-title">
      <div className="container contact-layout">
        <Reveal className="contact-copy">
          <p className="eyebrow"><span className="section-number">04</span> START A CONVERSATION</p>
          <h2 id="contact-title">The next great<br />thing starts with<br /><em>a conversation.</em></h2>
          <p>Have an AI engineering opportunity, a challenging idea, or a shared curiosity? I'd love to hear about it.</p>
          <div className="contact-email-row"><a className="contact-email" href={`mailto:${personalInfo.email}`}>{personalInfo.email}<ArrowUpRight size={17} /></a><button className="icon-button" aria-label="Copy email address" onClick={copyEmail}>{copyStatus === 'Email copied' ? <Check size={16} /> : <Copy size={16} />}</button></div>
          <span className="copy-status" role="status">{copyStatus}</span>
          <div className="contact-socials"><a href={personalInfo.github} target="_blank" rel="noopener noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={13} /></a><a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={13} /></a></div>
          <div className="contact-location"><span className="status-dot" /><span>{personalInfo.location}</span><a href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}>{personalInfo.phone}</a></div>
        </Reveal>
        <Reveal className="contact-form-wrap" delay={100}>
          <div className="form-heading"><span className="mono">A NOTE, NOT A FORMALITY.</span><ArrowUpRight size={22} /></div>
          <form ref={formRef} onSubmit={handleSubmit} noValidate aria-busy={submitting}>
            <fieldset disabled={submitting}>
              <legend className="sr-only">Send a message — all fields are required</legend>
              <div className="form-field"><label htmlFor="name">Your name <span>*</span></label><input id="name" name="name" autoComplete="name" required maxLength={120} placeholder="What should I call you?" value={formData.name} onChange={handleChange} onBlur={event => setErrors(previous => ({ ...previous, name: validate('name', event.target.value) }))} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />{errors.name && <p id="name-error" className="field-error">{errors.name}</p>}</div>
              <div className="form-field"><label htmlFor="email">Email address <span>*</span></label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" value={formData.email} onChange={handleChange} onBlur={event => setErrors(previous => ({ ...previous, email: validate('email', event.target.value) }))} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />{errors.email && <p id="email-error" className="field-error">{errors.email}</p>}</div>
              <div className="form-field"><label htmlFor="message">What's on your mind? <span>*</span></label><textarea id="message" name="message" rows={4} required maxLength={5000} placeholder="An idea, an opportunity, or just a hello…" value={formData.message} onChange={handleChange} onBlur={event => setErrors(previous => ({ ...previous, message: validate('message', event.target.value) }))} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />{errors.message && <p id="message-error" className="field-error">{errors.message}</p>}</div>
              <button className="button button-primary submit-button" type="submit" disabled={submitting}>{submitting ? <>Sending message <Loader2 size={17} className="loading-spinner" /></> : <>Send message <Send size={16} /></>}</button>
            </fieldset>
            {feedback && <div className={`form-feedback ${feedback.type}`} role={feedback.type === 'error' ? 'alert' : 'status'}>{feedback.message}</div>}
            <p className="form-note">Straight to my inbox. I'll get back to you personally.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
