import React from 'react';
import { Award, ShieldCheck, Cpu } from 'lucide-react';
import { lifestyleBannerImg } from '../services/storage';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-zinc-900 py-12 px-4 sm:px-8 max-w-5xl mx-auto space-y-16">
      {/* Editorial Header */}
      <div className="space-y-4 max-w-2xl">
        <span className="text-[11px] font-bold uppercase tracking-widest text-red-600 font-display">
          The CARTIO Manifesto
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-black text-zinc-950 leading-tight">
          ARCHITECTURAL FOOTWEAR FOR MODERN MOTION.
        </h1>
        <p className="text-zinc-600 text-sm leading-relaxed">
          Founded in New York with technical design ateliers in Tokyo and Milan, CARTIO bridges precision athletic engineering with brutalist, high-fashion silhouettes.
        </p>
      </div>

      {/* Visual Break */}
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-zinc-200 shadow-sm">
        <img src={lifestyleBannerImg} alt="CARTIO Studio" className="w-full h-full object-cover" />
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 space-y-3">
          <Award className="w-6 h-6 text-red-600" />
          <h3 className="font-display text-lg font-bold text-zinc-950">Full-Grain Integrity</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Every upper is cut from vegetable-tanned Italian calfskin and reinforced technical ballistic weaves, designed to develop a distinct patina with age.
          </p>
        </div>

        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 space-y-3">
          <Cpu className="w-6 h-6 text-red-600" />
          <h3 className="font-display text-lg font-bold text-zinc-950">Propulsion Geometry</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Our Spektr and Apex lines integrate autoclaved carbon fiber propulsion plates paired with nitrogen-infused PEBA foams for maximum kinetic energy return.
          </p>
        </div>

        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 space-y-3">
          <ShieldCheck className="w-6 h-6 text-red-600" />
          <h3 className="font-display text-lg font-bold text-zinc-950">Verified Provenance</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Each pair shipped is backed by cryptographic serial IDs and physical authentication signatures, preventing counterfeit proliferation.
          </p>
        </div>
      </div>
    </div>
  );
};
