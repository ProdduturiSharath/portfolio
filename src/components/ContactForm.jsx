import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { submitContactForm } from '../services/api';

export default function ContactForm({ personalInfo }) {
  const info = personalInfo || {
    phone: "+91 9642730647",
    email: "sharathchandraprodduturi@gmail.com",
    linkedin: "https://linkedin.com/in/sharathchandraprodduturi",
    github: "https://github.com/sharathchandraprodduturi",
    location: "Bangalore, India"
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const validateField = (name, value) => {
    let err = '';
    if (name === 'name') {
      if (!value.trim()) err = 'Name is required';
    } else if (name === 'email') {
      if (!value.trim()) {
        err = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        err = 'Please enter a valid email address';
      }
    } else if (name === 'message') {
      if (!value.trim()) err = 'Message is required';
    }
    setErrors(prev => ({ ...prev, [name]: err }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameErr = !formData.name.trim() ? 'Name is required' : '';
    const emailErr = !formData.email.trim()
      ? 'Email is required'
      : (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) ? 'Please enter a valid email address' : '');
    const msgErr = !formData.message.trim() ? 'Message is required' : '';

    if (nameErr || emailErr || msgErr) {
      setErrors({ name: nameErr, email: emailErr, message: msgErr });
      setToast({
        type: 'error',
        message: 'Please resolve the highlighted errors before submitting.'
      });
      return;
    }

    setSubmitting(true);
    setToast(null);

    const result = await submitContactForm(formData);
    setSubmitting(false);

    if (result.success) {
      setToast({
        type: 'success',
        message: result.message || 'Thank you for reaching out! Your message has been received.'
      });
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } else {
      setToast({
        type: 'error',
        message: result.message || 'Failed to send message. Please try again.'
      });
    }
  };

  return (
    <section id="contact" className="py-20 relative bg-[#0b0f19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#111827] border border-[#1e293b] text-xs font-mono text-sky-400 mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Let's Build <span className="text-sky-400">Something Great</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Whether you have a technical opportunity, a backend architectural question, or just want to connect — my inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">

          {/* Left Column: Direct Contact Details & Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#111827] border border-[#1e293b] rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="text-xl font-bold text-white mb-2">Contact Information</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Directly accessible for interviews, technical discussions, or engineering collaborations.
              </p>

              <div className="space-y-4 pt-2">
                {/* Email */}
                <a
                  href={`mailto:${info.email}`}
                  className="flex items-center space-x-4 p-3.5 rounded-lg bg-[#1f2937] border border-[#374151] hover:border-sky-400 transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-[#111827] text-sky-400 border border-[#374151]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">Email Address</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-sky-400 transition-colors">
                      {info.email}
                    </div>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${info.phone}`}
                  className="flex items-center space-x-4 p-3.5 rounded-lg bg-[#1f2937] border border-[#374151] hover:border-emerald-400 transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-[#111827] text-emerald-400 border border-[#374151]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">Phone Number</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
                      {info.phone}
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center space-x-4 p-3.5 rounded-lg bg-[#1f2937] border border-[#374151]">
                  <div className="p-3 rounded-lg bg-[#111827] text-indigo-400 border border-[#374151]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">Location</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-200">
                      {info.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-4 border-t border-[#1e293b]">
                <div className="text-xs font-mono text-slate-400 mb-3">Professional Profiles</div>
                <div className="flex items-center space-x-3">
                  <a
                    href={info.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-[#1f2937] border border-[#374151] text-xs font-semibold text-slate-200 hover:text-sky-400 hover:border-sky-400 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-sky-400" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={info.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-[#1f2937] border border-[#374151] text-xs font-semibold text-slate-200 hover:text-white hover:border-slate-400 transition-colors"
                  >
                    <Github className="w-4 h-4 text-slate-300" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#111827] border border-[#1e293b] rounded-xl p-6 sm:p-8 shadow-sm">
              
              {/* Toast Notification Banner */}
              {toast && (
                <div
                  className={`mb-6 p-4 rounded-lg border text-xs sm:text-sm flex items-start space-x-3 transition-all ${
                    toast.type === 'success'
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                      : 'bg-red-950/60 border-red-500/50 text-red-300'
                  }`}
                >
                  {toast.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <span>{toast.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-mono font-semibold text-slate-300">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Mercer"
                    className={`w-full px-4 py-3 rounded-lg bg-[#111827] border ${
                      errors.name ? 'border-red-500' : 'border-[#1e293b]'
                    } text-slate-100 placeholder-slate-500 focus:border-sky-400 focus:outline-none text-xs sm:text-sm`}
                  />
                  {errors.name && <p className="text-[11px] text-red-400 font-mono">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-mono font-semibold text-slate-300">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex.mercer@company.com"
                    className={`w-full px-4 py-3 rounded-lg bg-[#111827] border ${
                      errors.email ? 'border-red-500' : 'border-[#1e293b]'
                    } text-slate-100 placeholder-slate-500 focus:border-sky-400 focus:outline-none text-xs sm:text-sm`}
                  />
                  {errors.email && <p className="text-[11px] text-red-400 font-mono">{errors.email}</p>}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-mono font-semibold text-slate-300">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share details about your project, role, or inquiry..."
                    className={`w-full px-4 py-3 rounded-lg bg-[#111827] border ${
                      errors.message ? 'border-red-500' : 'border-[#1e293b]'
                    } text-slate-100 placeholder-slate-500 focus:border-sky-400 focus:outline-none text-xs sm:text-sm resize-none`}
                  ></textarea>
                  {errors.message && <p className="text-[11px] text-red-400 font-mono">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-lg bg-sky-400 hover:bg-sky-500 text-[#0b0f19] font-bold text-sm shadow-sm transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#0b0f19]" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#0b0f19]" />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
