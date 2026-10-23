import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-zinc-900 py-12 px-4 sm:px-8 max-w-4xl mx-auto space-y-8">
      <div className="space-y-2 border-b border-zinc-200 pb-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 font-display">Legal Architecture</span>
        <h1 className="font-display text-3xl font-bold text-zinc-950">Terms & Conditions of Service</h1>
        <p className="text-xs text-zinc-500 font-mono">Last revised: October 2026</p>
      </div>

      <div className="space-y-6 text-xs text-zinc-600 leading-relaxed">
        <section className="space-y-2 bg-zinc-50 p-6 rounded-xl border border-zinc-200">
          <h2 className="text-sm font-bold text-zinc-950 font-display">1. Verified Authenticity Guarantee</h2>
          <p>
            All footwear silhouetted on CARTIO undergoes a multi-point physical verification audit by certified inspection technicians. In the rare event an item is found non-conforming, 100% of purchase consideration is returned.
          </p>
        </section>

        <section className="space-y-2 bg-zinc-50 p-6 rounded-xl border border-zinc-200">
          <h2 className="text-sm font-bold text-zinc-950 font-display">2. Limited Drop Allocations</h2>
          <p>
            Due to strict production ceilings on limited-run drops, CARTIO reserves the right to cap individual purchases to 2 units per colorway per customer account to prevent bot abuse and unauthorized scalping.
          </p>
        </section>

        <section className="space-y-2 bg-zinc-50 p-6 rounded-xl border border-zinc-200">
          <h2 className="text-sm font-bold text-zinc-950 font-display">3. Returns & Exchange Windows</h2>
          <p>
            Items may be returned within 30 days of arrival provided security tags remain affixed and soles show zero signs of street wear. Complimentary returns are offered for all verified domestic accounts.
          </p>
        </section>
      </div>
    </div>
  );
};
