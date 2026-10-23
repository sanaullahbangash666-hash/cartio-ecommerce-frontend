import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-zinc-900 py-12 px-4 sm:px-8 max-w-4xl mx-auto space-y-8">
      <div className="space-y-2 border-b border-zinc-200 pb-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 font-display">Legal Architecture</span>
        <h1 className="font-display text-3xl font-bold text-zinc-950">Privacy & Telemetry Policy</h1>
        <p className="text-xs text-zinc-500 font-mono">Last revised: October 2026 · Compliant with GDPR, CCPA & ISO 27001</p>
      </div>

      <div className="space-y-6 text-xs text-zinc-600 leading-relaxed">
        <section className="space-y-2 bg-zinc-50 p-6 rounded-xl border border-zinc-200">
          <h2 className="text-sm font-bold text-zinc-950 font-display">1. Information Collection & Minimalist Footprint</h2>
          <p>
            CARTIO collects only transactional information necessary to process authentic orders and verify physical delivery. We do not sell, rent, or trade customer browsing profiles to external ad networks.
          </p>
        </section>

        <section className="space-y-2 bg-zinc-50 p-6 rounded-xl border border-zinc-200">
          <h2 className="text-sm font-bold text-zinc-950 font-display">2. Cardholder Data & Encryption Standards</h2>
          <p>
            Payment instruments are tokenized end-to-end using TLS 1.3 encryption. CARTIO infrastructure never stores raw 16-digit primary account numbers (PAN) or Card Verification Values (CVV) in plain text or local storage databases.
          </p>
        </section>

        <section className="space-y-2 bg-zinc-50 p-6 rounded-xl border border-zinc-200">
          <h2 className="text-sm font-bold text-zinc-950 font-display">3. Diagnostic Security Audits</h2>
          <p>
            All vulnerability scanning capabilities within the CARTIO platform are strictly authorized for designated test endpoints and development sandboxes. Automated testing adheres to non-destructive probing protocols.
          </p>
        </section>
      </div>
    </div>
  );
};
