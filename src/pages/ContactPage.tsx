import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product Allocation Inquiry');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 py-12 px-4 sm:px-8 max-w-5xl mx-auto space-y-12">
      <div className="space-y-3">
        <span className="text-[11px] font-bold uppercase tracking-widest text-red-600 font-display">Concierge Desk</span>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-zinc-950">Contact CARTIO</h1>
        <p className="text-xs sm:text-sm text-zinc-600 max-w-lg">
          For private order allocations, sizing consultations, or enterprise retail inquiries, reach our specialist team directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          {submitted ? (
            <div className="p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-display text-lg font-bold text-zinc-950">Message Transmitted</h3>
              <p className="text-xs text-zinc-600">
                A CARTIO concierge specialist has received your communication and will reply within 4 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 mb-1">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-zinc-900 focus:outline-none focus:border-red-600"
                >
                  <option value="Product Allocation Inquiry">Product Allocation Inquiry</option>
                  <option value="Order Status & Express Tracking">Order Status & Express Tracking</option>
                  <option value="Sizing & Arch Support Consultation">Sizing & Arch Support Consultation</option>
                  <option value="Wholesale & Commercial Accounts">Wholesale & Commercial Accounts</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please specify any model or order references..."
                  className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-md shadow-red-600/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Communication</span>
              </button>
            </form>
          )}
        </div>

        {/* Studio Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 space-y-6 text-xs text-zinc-600">
            <h3 className="font-bold text-zinc-950 uppercase tracking-wider text-[11px] font-display">Direct Touchpoints</h3>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-zinc-950">Digital Mail</p>
                <p className="font-mono text-zinc-600">concierge@cartio.store</p>
                <p className="text-[10px] text-zinc-500">PGP encryption key on request</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-zinc-950">Direct Line</p>
                <p className="font-mono text-zinc-600">+1 (800) 582-CARTIO</p>
                <p className="text-[10px] text-zinc-500">Mon–Fri 09:00–18:00 EST</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-zinc-950">Flagship Studio</p>
                <p className="text-zinc-600">540 West 26th Street, Chelsea Art District</p>
                <p className="text-zinc-600">New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
