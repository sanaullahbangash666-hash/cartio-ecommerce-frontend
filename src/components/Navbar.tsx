import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, User as UserIcon, Shield, BarChart3, Settings, LogOut, ChevronDown, Sparkles, LogIn, Wallet } from 'lucide-react';
import { User, Role } from '../types';
import { CartioLogo } from './CartioLogo';

interface NavbarProps {
  currentUser: User | null;
  cartCount: number;
  wishlistCount: number;
  activeView: string;
  onNavigate: (view: string, params?: any) => void;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  onSwitchDemoRole: (role: Role) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  cartCount,
  wishlistCount,
  activeView,
  onNavigate,
  onOpenCart,
  onOpenAuth,
  onLogout,
  onSwitchDemoRole,
}) => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('shop', { query: searchQuery.trim() });
      setSearchOpen(false);
    }
  };

  const getRoleDashboardLabel = (role: Role) => {
    switch (role) {
      case 'admin':
        return 'Admin Dashboard';
      case 'cybersecurity':
        return 'Cybersecurity Scanner';
      case 'data_analyst':
        return 'Data Analyst Hub';
      default:
        return 'My Account';
    }
  };

  const getRoleDashboardView = (role: Role) => {
    switch (role) {
      case 'admin':
        return 'admin-dashboard';
      case 'cybersecurity':
        return 'cyber-dashboard';
      case 'data_analyst':
        return 'analyst-dashboard';
      default:
        return 'customer-dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0a0d] backdrop-blur-md border-b border-red-950/80 shadow-[0_4px_30px_rgba(0,0,0,0.6)] transition-all overflow-x-clip">
      {/* Top Announcement Bar & Quick Role Switcher */}
      <div className="bg-[#050507] text-[11px] text-zinc-400 border-b border-red-950/50 py-1 sm:py-1.5 px-3 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] animate-pulse shrink-0" />
            <span className="font-bold text-white tracking-wide">SPRING DROP ACTIVE</span>
            <span className="text-zinc-700 hidden sm:inline">·</span>
            <span className="hidden sm:inline text-zinc-300">Complimentary global delivery on orders over $150</span>
          </div>

          {/* Quick Demo Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] overflow-x-auto max-w-full no-scrollbar py-0.5">
            <span className="text-zinc-500 hidden md:inline shrink-0">Demo Persona:</span>
            <div className="flex items-center gap-0.5 sm:gap-1 bg-zinc-900/90 rounded border border-zinc-800 p-0.5 shrink-0">
              <button
                onClick={() => onSwitchDemoRole('customer')}
                className={`px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-medium transition-colors ${
                  currentUser?.role === 'customer' ? 'bg-red-600 text-white font-bold shadow-xs' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => onSwitchDemoRole('admin')}
                className={`px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-medium transition-colors ${
                  currentUser?.role === 'admin' ? 'bg-red-600 text-white font-bold shadow-xs' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => onSwitchDemoRole('cybersecurity')}
                className={`px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-medium transition-colors ${
                  currentUser?.role === 'cybersecurity' ? 'bg-red-700 text-white font-bold shadow-xs' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Cybersecurity
              </button>
              <button
                onClick={() => onSwitchDemoRole('data_analyst')}
                className={`px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-medium transition-colors ${
                  currentUser?.role === 'data_analyst' ? 'bg-red-800 text-white font-bold shadow-xs' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Analyst
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation (3-Zone Top Bar Contract) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-8 h-15 sm:h-18 flex items-center justify-between gap-1.5 sm:gap-6">
        {/* Zone 1: Brand Wordmark with C Alphabet Logo */}
        <div className="flex items-center shrink-0">
          <CartioLogo
            size="md"
            onClick={() => onNavigate('home')}
          />
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-wider font-bold text-zinc-300">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors hover:text-red-400 ${activeView === 'home' ? 'text-red-500 font-extrabold border-b-2 border-red-500 pb-0.5' : ''}`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('shop', { category: 'Running' })}
            className="transition-colors hover:text-red-400"
          >
            Performance
          </button>
          <button
            onClick={() => onNavigate('shop', { category: 'Streetwear' })}
            className="transition-colors hover:text-red-400"
          >
            Streetwear
          </button>
          <button
            onClick={() => onNavigate('shop', { category: 'Retro' })}
            className="transition-colors hover:text-red-400"
          >
            Retro Classics
          </button>
          <button
            onClick={() => onNavigate('shop', { filter: 'new' })}
            className="transition-colors hover:text-red-400 flex items-center gap-1"
          >
            New Arrivals
          </button>
          <button
            onClick={() => onNavigate('shop', { filter: 'sale' })}
            className="text-red-500 font-extrabold hover:text-red-400 transition-colors"
          >
            Sale
          </button>
        </nav>

        {/* Zone 3: Actions (Search, Wishlist, Cart, Login, User Account) */}
        <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search sneakers"
            className="p-1.5 sm:p-2 text-zinc-300 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-red-900/50 rounded-full transition-all shrink-0 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Wishlist */}
          <button
            onClick={() => onNavigate('customer-dashboard', { tab: 'wishlist' })}
            aria-label="Wishlist"
            className="relative p-1.5 sm:p-2 text-zinc-300 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-red-900/50 rounded-full transition-all shrink-0 cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-red-600 text-white text-[8px] sm:text-[9px] font-bold rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(220,38,38,0.7)] font-mono-numbers">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Digital Wallet Quick Access */}
          <button
            onClick={() => onNavigate('customer-dashboard', { tab: 'wallet' })}
            aria-label="Digital Wallet"
            title="CARTIO Digital Wallet"
            className="p-1.5 sm:p-2 text-amber-400 hover:text-amber-300 hover:bg-zinc-900 border border-transparent hover:border-amber-500/40 rounded-full transition-all shrink-0 cursor-pointer"
          >
            <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Shopping Cart */}
          <button
            onClick={onOpenCart}
            aria-label="Shopping bag"
            className="relative p-1.5 sm:p-2 text-zinc-300 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-red-900/50 rounded-full transition-all shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-red-600 text-white text-[8px] sm:text-[9px] font-bold rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(220,38,38,0.7)] font-mono-numbers">
                {cartCount}
              </span>
            )}
          </button>

          {/* If guest (not logged in), show Login button directly next to shopping bag */}
          {!currentUser ? (
            <button
              onClick={() => onOpenAuth()}
              aria-label="Open Login Modal"
              className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all duration-200 shadow-[0_2px_14px_rgba(220,38,38,0.45)] hover:shadow-[0_4px_24px_rgba(220,38,38,0.7)] border border-red-500/60 cursor-pointer active:scale-95 group shrink-0"
            >
              <LogIn className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/90 group-hover:translate-x-0.5 transition-transform" />
              <span>Login</span>
            </button>
          ) : (
            /* User Account / Profile Dropdown (when authenticated - e.g. Elena) */
            <div className="relative shrink-0">
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-zinc-900/90 border border-red-950/50 hover:border-red-500/70 transition-all text-[11px] sm:text-xs font-semibold text-white shadow-xs shrink-0 cursor-pointer"
              >
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
                <span className="max-w-[55px] sm:max-w-[100px] truncate">{currentUser.name.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-400" />
              </button>

              {accountMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#0e0e13] border border-red-950/80 shadow-[0_15px_35px_rgba(0,0,0,0.8)] py-2 z-50 text-white">
                  <div className="px-4 py-2 border-b border-zinc-800">
                    <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                    <p className="text-[10px] text-zinc-400 font-mono truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 text-[9px] uppercase tracking-wider font-bold text-red-500">
                      Role: {currentUser.role.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        onNavigate(getRoleDashboardView(currentUser.role));
                        setAccountMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-zinc-300 hover:bg-zinc-900 hover:text-white flex items-center gap-2 font-medium transition-colors"
                    >
                      {currentUser.role === 'admin' ? (
                        <Settings className="w-3.5 h-3.5 text-red-500" />
                      ) : currentUser.role === 'cybersecurity' ? (
                        <Shield className="w-3.5 h-3.5 text-red-400" />
                      ) : currentUser.role === 'data_analyst' ? (
                        <BarChart3 className="w-3.5 h-3.5 text-red-400" />
                      ) : (
                        <UserIcon className="w-3.5 h-3.5 text-zinc-400" />
                      )}
                      <span>{getRoleDashboardLabel(currentUser.role)}</span>
                    </button>

                    <button
                      onClick={() => {
                        onNavigate('customer-dashboard', { tab: 'wallet' });
                        setAccountMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-amber-300 hover:bg-zinc-900 hover:text-amber-200 flex items-center gap-2 font-medium transition-colors"
                    >
                      <Wallet className="w-3.5 h-3.5 text-amber-400" />
                      <span>Digital Wallet (CARTIO Pay)</span>
                    </button>

                    {/* If admin, supervisor shortcuts */}
                    {currentUser.role === 'admin' && (
                      <>
                        <button
                          onClick={() => {
                            onNavigate('cyber-dashboard');
                            setAccountMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-zinc-400 hover:bg-zinc-900 hover:text-white flex items-center gap-2 font-medium transition-colors"
                        >
                          <Shield className="w-3.5 h-3.5 text-red-500" />
                          <span>Security Scanner Hub</span>
                        </button>
                        <button
                          onClick={() => {
                            onNavigate('analyst-dashboard');
                            setAccountMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-zinc-400 hover:bg-zinc-900 hover:text-white flex items-center gap-2 font-medium transition-colors"
                        >
                          <BarChart3 className="w-3.5 h-3.5 text-red-500" />
                          <span>Analytics & KPIs Hub</span>
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => {
                        onNavigate('customer-dashboard', { tab: 'orders' });
                        setAccountMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-zinc-300 hover:bg-zinc-900 hover:text-white flex items-center gap-2 font-medium transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-zinc-400" />
                      <span>My Orders</span>
                    </button>
                  </div>

                  <div className="border-t border-zinc-800 pt-1">
                    <button
                      onClick={() => {
                        onLogout();
                        setAccountMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-950/40 hover:text-red-300 flex items-center gap-2 font-semibold transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Expandable Search Input */}
      {searchOpen && (
        <div className="border-t border-red-950/80 bg-[#08080b] py-3 px-4 sm:px-8">
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-3">
            <Search className="w-4 h-4 text-red-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sneakers by silhouette, colorway, brand (e.g. Spektr, Crimson, Kuro)..."
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-1.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
              autoFocus
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="text-xs text-zinc-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </header>
  );
};
