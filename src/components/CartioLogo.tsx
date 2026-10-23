import React from 'react';

interface CartioLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  className?: string;
  onClick?: () => void;
}

export const CartioLogo: React.FC<CartioLogoProps> = ({
  size = 'md',
  showWordmark = true,
  className = '',
  onClick,
}) => {
  // Dimensions based on size with responsive mobile scaling
  const iconSizes = {
    sm: 'w-6 h-6 sm:w-7 sm:h-7',
    md: 'w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9',
    lg: 'w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11',
    xl: 'w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14',
  };

  const textSizes = {
    sm: 'text-base sm:text-lg tracking-wider sm:tracking-widest',
    md: 'text-lg sm:text-xl md:text-2xl tracking-wider sm:tracking-widest',
    lg: 'text-xl sm:text-2xl md:text-3xl tracking-widest',
    xl: 'text-2xl sm:text-3xl md:text-4xl tracking-widest',
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-1.5 h-1.5 sm:w-2 sm:h-2',
    lg: 'w-2 h-2 sm:w-2.5 sm:h-2.5',
    xl: 'w-2.5 h-2.5 sm:w-3 sm:h-3',
  };

  return (
    <div
      onClick={() => onClick?.()}
      className={`inline-flex items-center gap-1.5 sm:gap-2.5 select-none shrink-0 ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* "C" Alphabet Emblem / Logo */}
      <div className={`relative ${iconSizes[size]} shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        {/* Ambient red backglow */}
        <div className="absolute inset-0 bg-red-600/30 rounded-xl blur-[6px] group-hover:bg-red-600/50 transition-all" />

        {/* SVG Geometric "C" Monogram Badge */}
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full h-full drop-shadow-[0_2px_12px_rgba(239,68,68,0.4)]"
        >
          <defs>
            {/* Badge Background Gradient */}
            <linearGradient id="cartio-badge-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a0608" />
              <stop offset="40%" stopColor="#0b0b0e" />
              <stop offset="100%" stopColor="#050507" />
            </linearGradient>

            {/* Red Border Gradient */}
            <linearGradient id="cartio-border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#b91c1c" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </linearGradient>

            {/* Letter "C" Silver & Crimson Gradient */}
            <linearGradient id="cartio-c-grad" x1="15%" y1="15%" x2="90%" y2="85%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#fca5a5" />
              <stop offset="70%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>

            {/* Speed Slash Glow */}
            <linearGradient id="cartio-accent-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#f87171" />
            </linearGradient>
          </defs>

          {/* Badge Frame / Shield */}
          <rect
            x="1.5"
            y="1.5"
            width="41"
            height="41"
            rx="10"
            fill="url(#cartio-badge-bg)"
            stroke="url(#cartio-border-grad)"
            strokeWidth="1.75"
          />

          {/* Subtle inner carbon border */}
          <rect
            x="4"
            y="4"
            width="36"
            height="36"
            rx="8"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
          />

          {/* Sculpted Architectural "C" Monogram */}
          {/* Main bold C curve */}
          <path
            d="M 31 14.5
               C 27.5 10.5 19.5 10 14.5 14.5
               C 9.2 19.3 9.2 24.7 14.5 29.5
               C 19.5 34 27.5 33.5 31 29.5
               L 26.8 25.5
               C 24.2 28.2 18.8 28.2 16.5 25.5
               C 14.5 23.2 14.5 20.8 16.5 18.5
               C 18.8 15.8 24.2 15.8 26.8 18.5
               Z"
            fill="url(#cartio-c-grad)"
          />

          {/* Precision Velocity Cut / Red Speed Notch on the C */}
          <path
            d="M 30.5 20.5 L 34.5 22 L 30.5 23.5 Z"
            fill="url(#cartio-accent-grad)"
          />

          {/* High-speed optic core center dot */}
          <circle cx="21" cy="22" r="1.5" fill="#ffffff" opacity="0.8" />
        </svg>
      </div>

      {/* CARTIO Typography Wordmark */}
      {showWordmark && (
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black uppercase text-white font-display ${textSizes[size]} transition-colors group-hover:text-red-500`}
          >
            CARTIO
          </span>
          <span
            className={`${dotSizes[size]} rounded-full bg-red-600 inline-block mb-1 shadow-[0_0_10px_#ef4444] transition-all duration-300 group-hover:scale-125 group-hover:bg-red-500`}
          />
        </div>
      )}
    </div>
  );
};
