import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';
import { CartioLogo } from './CartioLogo';

interface FooterProps {
  onNavigate: (view: string, params?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 text-zinc-600 text-xs">
      {/* Brand Trust Bar */}
      <div className="border-b border-zinc-200/80 py-8 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="p-2.5 rounded-lg bg-zinc-100 text-red-600 border border-zinc-200">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-zinc-900 text-sm">100% Verified Authentic</p>
              <p className="text-zinc-500 text-[11px]">Multi-point specialist inspection</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="p-2.5 rounded-lg bg-zinc-100 text-red-600 border border-zinc-200">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-zinc-900 text-sm">Express Global Transit</p>
              <p className="text-zinc-500 text-[11px]">Tracked air shipping with insurance</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="p-2.5 rounded-lg bg-zinc-100 text-red-600 border border-zinc-200">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-zinc-900 text-sm">30-Day Hassle-Free Returns</p>
              <p className="text-zinc-500 text-[11px]">Complimentary pickup on unworn drops</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="p-2.5 rounded-lg bg-zinc-100 text-red-600 border border-zinc-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-zinc-900 text-sm">Encrypted Secure Checkout</p>
              <p className="text-zinc-500 text-[11px]">Zero raw card storage / SOC2 ready</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div>
            <CartioLogo size="sm" onClick={() => onNavigate('home')} />
          </div>
          <p className="text-zinc-600 text-xs leading-relaxed max-w-sm">
            Curated marketplace for elite performance silhouettes, limited-run retros, and architectural streetwear. Engineered for collectors and enthusiasts worldwide.
          </p>
          <div className="flex items-center gap-3 text-zinc-500 text-xs font-medium">
            <span>New York</span>
            <span>·</span>
            <span>Tokyo</span>
            <span>·</span>
            <span>Milan</span>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-zinc-950 uppercase tracking-wider text-[11px] mb-3">Collections</h4>
          <ul className="space-y-2 text-zinc-600">
            <li>
              <button onClick={() => onNavigate('shop', { category: 'Running' })} className="hover:text-black transition-colors">
                Performance Runners
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('shop', { category: 'Streetwear' })} className="hover:text-black transition-colors">
                Tactical Streetwear
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('shop', { category: 'Basketball' })} className="hover:text-black transition-colors">
                Court & Basketball
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('shop', { category: 'Retro' })} className="hover:text-black transition-colors">
                Retro Classics
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('shop', { filter: 'sale' })} className="text-red-600 font-semibold hover:text-red-700 transition-colors">
                Seasonal Archive Sale
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-zinc-950 uppercase tracking-wider text-[11px] mb-3">Platform & Portals</h4>
          <ul className="space-y-2 text-zinc-600">
            <li>
              <button onClick={() => onNavigate('customer-dashboard')} className="hover:text-black transition-colors">
                Customer Account
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('admin-dashboard')} className="hover:text-black transition-colors">
                Merchant Admin
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('cyber-dashboard')} className="hover:text-black transition-colors">
                Cybersecurity Scanner
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('analyst-dashboard')} className="hover:text-black transition-colors">
                Data Analyst Hub
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-black transition-colors">
                About CARTIO
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-zinc-950 uppercase tracking-wider text-[11px] mb-3">Assistance & Legal</h4>
          <ul className="space-y-2 text-zinc-600">
            <li>
              <button onClick={() => onNavigate('contact')} className="hover:text-black transition-colors">
                Concierge Contact
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('privacy')} className="hover:text-black transition-colors">
                Privacy Policy
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('terms')} className="hover:text-black transition-colors">
                Terms of Service
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('contact')} className="hover:text-black transition-colors">
                Size & Fit Guide
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-zinc-200/80 py-6 px-4 sm:px-8 bg-zinc-100/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} CARTIO International Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>High-Fidelity Sneaker Commerce</span>
            <span>·</span>
            <span>Certified TLS 1.3 End-to-End</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
