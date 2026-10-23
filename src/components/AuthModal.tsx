import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User as UserIcon, Eye, EyeOff, CheckCircle2, AlertCircle, Shield, BarChart3, Settings } from 'lucide-react';
import { authService } from '../services/authService';
import { Role } from '../types';
import { CartioLogo } from './CartioLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialMode?: 'login' | 'signup' | 'forgot';
  initialEmail?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'login',
  initialEmail = '',
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [selectedRole, setSelectedRole] = useState<Role>('customer');
  const [errorMessage, setErrorMessage] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (typeof initialEmail === 'string' && initialEmail) {
        setEmail(initialEmail);
      } else {
        setEmail('');
      }
      setMode(initialMode);
      setPassword('');
      setErrorMessage('');
      setSuccessNotice('');
    }
  }, [isOpen, initialEmail, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessNotice('');

    if (!agreeTerms && mode !== 'forgot') {
      setErrorMessage('Please agree to terms to proceed.');
      return;
    }

    if (mode === 'login') {
      const result = authService.loginWithEmail(email, password);
      if (result.success) {
        onSuccess();
        onClose();
      } else {
        setErrorMessage(result.error || 'Invalid email or password.');
      }
    } else if (mode === 'signup') {
      if (!name.trim()) {
        setErrorMessage('Please provide your name.');
        return;
      }
      if (password.length < 4) {
        setErrorMessage('Password must be at least 4 characters.');
        return;
      }
      const result = authService.register(name, email, password, selectedRole);
      if (result.success) {
        onSuccess();
        onClose();
      } else {
        setErrorMessage(result.error || 'Registration failed.');
      }
    } else if (mode === 'forgot') {
      if (!email || !email.includes('@')) {
        setErrorMessage('Please enter a valid email address.');
        return;
      }
      setSuccessNotice(`Password reset instructions sent to ${email}.`);
      setTimeout(() => {
        setMode('login');
        setSuccessNotice('');
      }, 2000);
    }
  };

  const handleProviderLogin = (provider: 'Google' | 'Facebook' | 'Apple') => {
    if (!agreeTerms) {
      setErrorMessage('Please accept terms to continue with social login.');
      return;
    }
    authService.loginWithProvider(provider);
    onSuccess();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Compact Obsidian & Crimson Glass Modal Card */}
      <div className="relative w-full max-w-[390px] max-h-[92vh] overflow-y-auto bg-[#09090c]/95 backdrop-blur-2xl border border-red-950/80 rounded-2xl shadow-[0_0_40px_rgba(220,38,38,0.22),0_20px_50px_rgba(0,0,0,0.9)] p-5 sm:p-6 text-white animate-in zoom-in-95 duration-150 my-auto">
        {/* Top glowing laser red line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_10px_#ef4444]" />

        {/* Ambient background red radial flare */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-red-600/15 rounded-full blur-3xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3.5 right-3.5 p-1.5 text-zinc-400 hover:text-white rounded-full bg-zinc-900/70 hover:bg-zinc-800 border border-zinc-800 transition-all cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-3.5 pt-0.5">
          <div className="flex justify-center mb-1.5">
            <CartioLogo size="sm" />
          </div>
          <h2 className="text-sm font-extrabold text-white tracking-wide">
            {mode === 'login' && 'Sign In to CARTIO'}
            {mode === 'signup' && 'Create Your Account'}
            {mode === 'forgot' && 'Reset Password'}
          </h2>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            {mode === 'login' && 'Enter your credentials to continue'}
            {mode === 'signup' && 'Join for priority drops and order tracking'}
            {mode === 'forgot' && 'Enter your email to receive reset link'}
          </p>
        </div>

        {/* Navigation Tabs (Sign In / Create Account) */}
        {mode !== 'forgot' && (
          <div className="flex bg-[#121217] p-1 rounded-xl border border-zinc-850 mb-3.5">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMessage('');
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMessage('');
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                mode === 'signup'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Alerts */}
        {errorMessage && (
          <div className="mb-3 p-2.5 rounded-xl bg-red-950/70 border border-red-700/60 text-red-200 text-[11px] font-medium flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
        {successNotice && (
          <div className="mb-3 p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-emerald-200 text-[11px] font-medium flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Staff Demo Credentials Quick-Select Panel */}
        {mode === 'login' && (
          <div className="mb-3 p-2 rounded-xl bg-[#121217] border border-red-950/60 text-[10.5px]">
            <div className="flex items-center justify-between text-zinc-400 font-bold mb-1.5 uppercase tracking-wider text-[9.5px]">
              <span className="text-red-400 flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Staff Demo Accounts
              </span>
              <span className="text-zinc-500 text-[9px] font-normal">Click to quick-fill</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {/* Admin */}
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@cartio.com');
                  setPassword('');
                  setErrorMessage('');
                }}
                className={`p-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                  email === 'admin@cartio.com'
                    ? 'bg-red-950/80 border-red-500 text-white shadow-xs'
                    : 'bg-[#181820] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[10px] text-red-300">Admin</span>
                  <Settings className="w-2.5 h-2.5 text-red-400" />
                </div>
                <div className="text-[9px] text-zinc-400 font-mono truncate">admin@cartio.com</div>
                <div className="text-[8px] text-zinc-500 font-mono">pass: admin123</div>
              </button>

              {/* Cyber */}
              <button
                type="button"
                onClick={() => {
                  setEmail('cyber@cartio.com');
                  setPassword('');
                  setErrorMessage('');
                }}
                className={`p-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                  email === 'cyber@cartio.com'
                    ? 'bg-red-950/80 border-red-500 text-white shadow-xs'
                    : 'bg-[#181820] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[10px] text-red-400">Cyber</span>
                  <Shield className="w-2.5 h-2.5 text-red-400" />
                </div>
                <div className="text-[9px] text-zinc-400 font-mono truncate">cyber@cartio.com</div>
                <div className="text-[8px] text-zinc-500 font-mono">pass: cyber123</div>
              </button>

              {/* Analyst */}
              <button
                type="button"
                onClick={() => {
                  setEmail('analyst@cartio.com');
                  setPassword('');
                  setErrorMessage('');
                }}
                className={`p-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                  email === 'analyst@cartio.com'
                    ? 'bg-red-950/80 border-red-500 text-white shadow-xs'
                    : 'bg-[#181820] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[10px] text-amber-300">Analyst</span>
                  <BarChart3 className="w-2.5 h-2.5 text-amber-400" />
                </div>
                <div className="text-[9px] text-zinc-400 font-mono truncate">analyst@cartio.com</div>
                <div className="text-[8px] text-zinc-500 font-mono">pass: analyst123</div>
              </button>
            </div>

            <div className="flex items-center justify-between text-[9px] text-zinc-400 pt-1.5 mt-1 border-t border-zinc-850">
              <span className="text-zinc-400">Customer account:</span>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMessage('');
                }}
                className="text-red-400 hover:underline font-bold cursor-pointer"
              >
                Create your custom customer account →
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-2.5">
          {/* Full Name Field (Sign Up Mode) */}
          {mode === 'signup' && (
            <div>
              <label className="block text-[10px] font-bold text-zinc-300 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-zinc-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jordan Hayes"
                  className="w-full bg-[#121217] border border-zinc-800 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>
          )}

          {/* Text Field 1: Email Address */}
          <div>
            <label className="block text-[10px] font-bold text-zinc-300 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@cartio.com"
                className="w-full bg-[#121217] border border-zinc-800 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
          </div>

          {/* Text Field 2: Password */}
          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider">
                  Password
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      setErrorMessage('');
                    }}
                    className="text-[10px] text-red-400 hover:text-red-300 font-medium hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-zinc-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#121217] border border-zinc-800 rounded-lg pl-8 pr-9 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-2.5 top-2 text-zinc-500 hover:text-zinc-300 p-0.5 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          )}

          {/* User Agreement Checkbox */}
          {mode !== 'forgot' && (
            <div className="pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-[10.5px] text-zinc-300 select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded border-zinc-700 bg-zinc-900 text-red-600 focus:ring-red-500 w-3.5 h-3.5 cursor-pointer accent-red-600 shrink-0"
                />
                <span className="leading-tight">
                  I agree to the{' '}
                  <span className="text-white font-medium underline decoration-red-600/60">
                    User Agreement
                  </span>{' '}
                  &{' '}
                  <span className="text-white font-medium underline decoration-red-600/60">
                    Privacy Policy
                  </span>
                </span>
              </label>
            </div>
          )}

          {/* Primary Submit Button */}
          <button
            type="submit"
            className="w-full mt-1.5 py-2.5 px-4 rounded-xl font-black text-xs tracking-wider uppercase text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 border border-red-500/50 shadow-[0_2px_14px_rgba(220,38,38,0.4)] hover:shadow-[0_4px_20px_rgba(220,38,38,0.6)] transition-all cursor-pointer"
          >
            {mode === 'login' && 'Sign In'}
            {mode === 'signup' && 'Create Account'}
            {mode === 'forgot' && 'Reset Password'}
          </button>
        </form>

        {/* Back Link for Forgot Mode */}
        {mode === 'forgot' && (
          <div className="mt-3 text-center">
            <button
              onClick={() => {
                setMode('login');
                setErrorMessage('');
              }}
              className="text-xs text-zinc-400 hover:text-white hover:underline cursor-pointer"
            >
              ← Back to Sign In
            </button>
          </div>
        )}

        {/* Social Authentication: Google, Apple, Facebook */}
        {mode !== 'forgot' && (
          <div className="mt-3.5">
            <div className="relative flex items-center justify-center mb-2.5">
              <div className="border-t border-zinc-800/80 w-full" />
              <span className="bg-[#09090c] px-2 text-[9.5px] uppercase tracking-wider text-zinc-500 font-bold absolute">
                Or Continue With
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {/* Google */}
              <button
                type="button"
                onClick={() => handleProviderLogin('Google')}
                className="flex items-center justify-center py-2 px-2 bg-[#121217] hover:bg-[#1a1a22] border border-zinc-800 hover:border-red-900/60 rounded-xl text-[11px] font-bold text-zinc-200 transition-all gap-1.5 cursor-pointer shadow-xs"
                title="Sign in with Google"
              >
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Google</span>
              </button>

              {/* Apple */}
              <button
                type="button"
                onClick={() => handleProviderLogin('Apple')}
                className="flex items-center justify-center py-2 px-2 bg-[#121217] hover:bg-[#1a1a22] border border-zinc-800 hover:border-red-900/60 rounded-xl text-[11px] font-bold text-zinc-200 transition-all gap-1.5 cursor-pointer shadow-xs"
                title="Sign in with Apple"
              >
                <svg className="w-3.5 h-3.5 fill-white shrink-0" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.4c.67-.82 1.12-1.95 1-3.08-1 .04-2.22.67-2.92 1.49-.62.72-1.16 1.87-1.01 2.97 1.12.09 2.26-.56 2.93-1.38z"/>
                </svg>
                <span>Apple</span>
              </button>

              {/* Facebook */}
              <button
                type="button"
                onClick={() => handleProviderLogin('Facebook')}
                className="flex items-center justify-center py-2 px-2 bg-[#121217] hover:bg-[#1a1a22] border border-zinc-800 hover:border-red-900/60 rounded-xl text-[11px] font-bold text-zinc-200 transition-all gap-1.5 cursor-pointer shadow-xs"
                title="Sign in with Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-[#1877F2] shrink-0" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </button>
            </div>
          </div>
        )}

        {/* Bottom Switcher */}
        {mode === 'login' ? (
          <div className="mt-3 text-center text-[11px] text-zinc-400">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMessage('');
              }}
              className="text-red-400 hover:text-red-300 font-bold hover:underline cursor-pointer ml-1"
            >
              Create Account
            </button>
          </div>
        ) : mode === 'signup' ? (
          <div className="mt-3 text-center text-[11px] text-zinc-400">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMessage('');
              }}
              className="text-red-400 hover:text-red-300 font-bold hover:underline cursor-pointer ml-1"
            >
              Sign In
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
