import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Tag,
  Star,
  ShoppingBag,
  ShieldCheck,
  Flame,
  Layers,
  Home,
  LayoutGrid,
  Footprints,
  Heart,
  User,
  Feather,
  Waves,
  Gem,
  Wallet,
} from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import {
  heroSneakerImg,
  blackSneakerImg,
  whiteSneakerImg,
  lifestyleBannerImg,
  retroSneakerImg,
  streetwearCyberImg,
  retroRunnerImg,
  newArrivalAuraImg,
  retroCourtVintageImg,
  streetwearSkateImg,
  cartioHeroSneakerImg,
} from '../services/storage';

interface HomePageProps {
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (productId: string) => void;
  onQuickAdd: (product: Product, colorName: string, size: string) => void;
  onNavigate: (view: string, params?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
  onNavigate,
}) => {
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  // Offer shoe color variation state directly on the hero
  const offerVariants = [
    { name: 'CARTIO Tech Yellow', hex: '#f59e0b', image: cartioHeroSneakerImg },
    { name: 'Crimson Fire', hex: '#dc2626', image: heroSneakerImg },
    { name: 'Stealth Black', hex: '#18181b', image: blackSneakerImg },
    { name: 'Spectral White', hex: '#f4f4f5', image: whiteSneakerImg },
  ];
  const [selectedOfferColorIdx, setSelectedOfferColorIdx] = useState(0);
  const activeOffer = offerVariants[selectedOfferColorIdx];
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Quick View Modal State
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Spotlight category tab state
  const [spotlightTab, setSpotlightTab] = useState<'streetwear' | 'retro' | 'new' | 'all'>('streetwear');

  const spotlightProducts = useMemo(() => {
    if (spotlightTab === 'streetwear') {
      return products
        .filter((p) => p.category === 'Streetwear' || p.tags.some((t) => t.toLowerCase().includes('streetwear')))
        .slice(0, 4);
    }
    if (spotlightTab === 'retro') {
      return products
        .filter((p) => p.category === 'Retro' || p.tags.some((t) => t.toLowerCase().includes('retro')))
        .slice(0, 4);
    }
    if (spotlightTab === 'new') {
      return products.filter((p) => p.isNewArrival).slice(0, 4);
    }
    return products.slice(0, 4);
  }, [products, spotlightTab]);

  const handleClaimOffer = () => {
    const flagshipProduct = products.find((p) => p.id === 'prod-01') || products[0];
    if (flagshipProduct) {
      onQuickAdd(flagshipProduct, activeOffer.name, 'US 10');
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* 1. Full-Front Hero Section matching uploaded reference design with STEP UP WITH QUALITY in white and red */}
      <section className="relative overflow-hidden w-full bg-[#08080b] text-white border-b border-zinc-800/90 pt-8 pb-14 lg:pt-12 lg:pb-18">
        {/* Background Texture from user uploaded image */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <img
            src="/src/assets/images/dark_grunge_texture_1791626750389.jpg"
            alt="Dark grunge texture background"
            className="w-full h-full object-cover object-center opacity-85"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient vignette to blend edges cleanly */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#08080b]/75 via-transparent to-[#08080b]/90" />
          <div className="absolute inset-0 bg-radial-vignette opacity-70" />
        </div>

        {/* Dynamic Atmospheric Red, Amber & Black Lighting Overlays */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
          {/* Crimson Radial Aura */}
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/20 rounded-full blur-[140px] animate-velocity-pulse" />
          {/* Amber Flare behind headline & shoe */}
          <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-amber-500/12 rounded-full blur-[130px]" />
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-700/12 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 z-10">
          <div className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 lg:gap-10">
            {/* Left Bar (Home, Explore Catalog, etc.) adjusted to left top directly below CARTIO logo */}
            <div className="flex lg:flex-col items-center self-start gap-2 sm:gap-3 lg:gap-4 py-2 px-3 sm:py-2.5 sm:px-3.5 lg:py-4 lg:px-2.5 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-full shadow-2xl shrink-0 -mt-1 lg:-mt-2 -ml-2 sm:-ml-3 lg:-ml-7 xl:-ml-10">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                title="Home"
                className="p-2.5 sm:p-3 bg-red-600 hover:bg-red-500 text-white rounded-2xl shadow-md shadow-red-600/30 transition-all hover:scale-105 cursor-pointer"
              >
                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('shop')}
                title="Explore Catalog"
                className="p-2 sm:p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-xl transition-all cursor-pointer"
              >
                <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('shop', { category: 'Streetwear' })}
                title="Streetwear & Sneakers"
                className="p-2 sm:p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-xl transition-all cursor-pointer"
              >
                <Footprints className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('customer-dashboard', { tab: 'wishlist' })}
                title="Wishlist"
                className="p-2 sm:p-2.5 text-zinc-400 hover:text-red-500 hover:bg-zinc-800/80 rounded-xl transition-all cursor-pointer"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('customer-dashboard', { tab: 'wallet' })}
                title="CARTIO Digital Wallet"
                className="p-2 sm:p-2.5 text-amber-400 hover:text-amber-300 hover:bg-zinc-800/80 rounded-xl transition-all cursor-pointer"
              >
                <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('customer-dashboard')}
                title="My Account"
                className="p-2 sm:p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-xl transition-all cursor-pointer"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Center-Left Content Area */}
            <div className="flex-1 space-y-6 pt-1 sm:pt-2">
              {/* Top Tag: PREMIUM SNEAKERS — */}
              <div className="inline-flex items-center gap-3">
                <span className="text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-zinc-300 font-display">
                  PREMIUM SNEAKERS
                </span>
                <span className="w-10 h-1 bg-amber-400 rounded-full inline-block" />
              </div>

              {/* Headline: "Step Up with Quality" in unique calligraphy font style with white and red color (#ff0000) */}
              <div className="space-y-1 select-none py-1">
                <h1 className="font-calligraphy text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide leading-[1.05] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] filter">
                  Step Up
                </h1>
                <h1 
                  className="font-calligraphy text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide leading-[1.05] text-[#ff0000] drop-shadow-[0_4px_30px_rgba(255,0,0,0.7)] filter"
                  style={{ color: '#ff0000' }}
                >
                  With Quality
                </h1>
              </div>

              {/* Subtitle from uploaded pic */}
              <p className="text-zinc-300 text-sm sm:text-base max-w-lg font-medium leading-relaxed">
                Modern style. Superior comfort. Built for your every move.
              </p>

              {/* Action Buttons: SHOP COLLECTION → and Claim Offer */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  onClick={() => onNavigate('shop')}
                  className="px-8 py-4 bg-gradient-to-r from-amber-400 via-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-zinc-950 text-xs sm:text-sm font-black uppercase tracking-wider rounded-full shadow-[0_4px_25px_rgba(245,158,11,0.5)] hover:shadow-[0_6px_35px_rgba(245,158,11,0.7)] transition-all flex items-center gap-2 group hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>SHOP COLLECTION</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleClaimOffer}
                  className="px-6 py-4 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 hover:border-red-600/50 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full shadow-md transition-all hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-red-500" />
                  <span>Claim Offer ($195)</span>
                </button>
              </div>
            </div>

            {/* Right Column: Hero Sneaker with "CARTIO" branding on lateral overlay - enlarged for tablet & full screen */}
            <div className="w-full md:max-w-lg lg:w-[46%] xl:w-[45%] max-w-md lg:max-w-[500px] xl:max-w-[540px] relative flex flex-col justify-center items-center mx-auto lg:mx-0 lg:ml-auto">
              <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-800/90 bg-gradient-to-b from-zinc-900 via-[#0e0e13] to-black shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-2 sm:p-3 group">
                <div className="relative aspect-[4/3] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                  <img
                    src={activeOffer.image}
                    alt="CARTIO Blade Flagship Sneaker"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Brand Callout Badge */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-zinc-950/85 backdrop-blur-md border border-amber-400/50 px-3.5 py-1.5 rounded-full shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[11px] font-bold text-white tracking-wider">CARTIO BLADE 01</span>
                  </div>

                  {/* Colorway preview switcher tabs inside the stage */}
                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 px-3 py-1.5 rounded-full shadow-lg">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase mr-1">Edition:</span>
                    {offerVariants.map((v, idx) => (
                      <button
                        key={v.name}
                        onClick={() => setSelectedOfferColorIdx(idx)}
                        className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                          selectedOfferColorIdx === idx
                            ? 'ring-2 ring-amber-400 border-white scale-110 shadow-xs'
                            : 'border-zinc-700 opacity-60 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: v.hex }}
                        title={v.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5-Item Technical Features Bottom Bar (from uploaded reference image) */}
          <div className="mt-10 sm:mt-12 w-full bg-[#0d0e12]/95 border border-zinc-800/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl shadow-black/80">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800/80">
              {/* 1. LIGHTWEIGHT COMFORT */}
              <div className="flex flex-col items-start gap-2.5 pt-4 sm:pt-0">
                <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400">
                  <Feather className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">LIGHTWEIGHT COMFORT</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Feel light. Move freely.</p>
                </div>
              </div>

              {/* 2. BREATHABLE MESH UPPER */}
              <div className="flex flex-col items-start gap-2.5 pt-4 sm:pt-0 sm:pl-6">
                <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400">
                  <Waves className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">BREATHABLE MESH UPPER</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Keeps your feet cool all day.</p>
                </div>
              </div>

              {/* 3. DURABLE OUTSOLE */}
              <div className="flex flex-col items-start gap-2.5 pt-4 sm:pt-0 sm:pl-6">
                <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400">
                  <Gem className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">DURABLE OUTSOLE</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Long-lasting grip & performance.</p>
                </div>
              </div>

              {/* 4. ERGONOMIC FIT */}
              <div className="flex flex-col items-start gap-2.5 pt-4 sm:pt-0 sm:pl-6">
                <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400">
                  <Footprints className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">ERGONOMIC FIT</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Perfect support for every step.</p>
                </div>
              </div>

              {/* 5. PREMIUM QUALITY */}
              <div className="flex flex-col items-start gap-2.5 pt-4 sm:pt-0 sm:pl-6">
                <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">PREMIUM QUALITY</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Style, comfort & performance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shop By Category with Shadows */}
      <section className="py-16 border-b border-zinc-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-red-600 font-bold mb-1">
                Curated Silhouettes
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950">
                Shop by Category
              </h2>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs text-zinc-600 hover:text-zinc-950 flex items-center gap-1 group font-bold"
            >
              <span>View all categories</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div
              onClick={() => onNavigate('shop', { category: 'Streetwear' })}
              className="group relative bg-[#f8f8fa] border border-zinc-200/80 hover:border-red-600/60 rounded-2xl overflow-hidden p-5 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-red-950/10 hover:-translate-y-1.5"
            >
              {/* Product Picture Container */}
              <div className="aspect-square bg-gradient-to-b from-white to-[#f4f4f8] rounded-xl mb-4 flex items-center justify-center p-3 border border-zinc-200/80 overflow-hidden group-hover:border-zinc-300 transition-all">
                <img
                  src={streetwearCyberImg}
                  alt="Streetwear & Tactical"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_12px_18px_rgba(0,0,0,0.15)]"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <h3 className="text-sm font-bold text-zinc-950 group-hover:text-red-600 transition-colors">Streetwear</h3>
              </div>
              <p className="text-[11px] text-zinc-500 mt-0.5">Tactical buckles & chunky soles</p>
            </div>

            <div
              onClick={() => onNavigate('shop', { category: 'Retro Classics' })}
              className="group relative bg-[#f8f8fa] border border-zinc-200/80 hover:border-red-600/60 rounded-2xl overflow-hidden p-5 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-red-950/10 hover:-translate-y-1.5"
            >
              {/* Product Picture Container */}
              <div className="aspect-square bg-gradient-to-b from-white to-[#f4f4f8] rounded-xl mb-4 flex items-center justify-center p-3 border border-zinc-200/80 overflow-hidden group-hover:border-zinc-300 transition-all">
                <img
                  src={retroCourtVintageImg}
                  alt="Retro Classics"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_12px_18px_rgba(0,0,0,0.15)]"
                />
              </div>
              <h3 className="text-sm font-bold text-zinc-950 group-hover:text-red-600 transition-colors">Retro Classics</h3>
              <p className="text-[11px] text-zinc-500 mt-0.5">1977-1985 court & track heritage</p>
            </div>

            <div
              onClick={() => onNavigate('shop', { filter: 'new' })}
              className="group relative bg-[#f8f8fa] border border-zinc-200/80 hover:border-red-600/60 rounded-2xl overflow-hidden p-5 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-red-950/10 hover:-translate-y-1.5"
            >
              {/* Product Picture Container */}
              <div className="aspect-square bg-gradient-to-b from-white to-[#f4f4f8] rounded-xl mb-4 flex items-center justify-center p-3 border border-zinc-200/80 overflow-hidden group-hover:border-zinc-300 transition-all">
                <img
                  src={newArrivalAuraImg}
                  alt="New Arrivals"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_12px_18px_rgba(0,0,0,0.15)]"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <h3 className="text-sm font-bold text-zinc-950 group-hover:text-red-600 transition-colors">New Arrivals</h3>
              </div>
              <p className="text-[11px] text-zinc-500 mt-0.5">Aura carbon plate speed trainers</p>
            </div>

            <div
              onClick={() => onNavigate('shop', { category: 'Running' })}
              className="group relative bg-[#f8f8fa] border border-zinc-200/80 hover:border-red-600/60 rounded-2xl overflow-hidden p-5 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-red-950/10 hover:-translate-y-1.5"
            >
              {/* Product Picture Container */}
              <div className="aspect-square bg-gradient-to-b from-white to-[#f4f4f8] rounded-xl mb-4 flex items-center justify-center p-3 border border-zinc-200/80 overflow-hidden group-hover:border-zinc-300 transition-all">
                <img
                  src={heroSneakerImg}
                  alt="Performance Running"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_12px_18px_rgba(0,0,0,0.15)]"
                />
              </div>
              <h3 className="text-sm font-bold text-zinc-950 group-hover:text-red-600 transition-colors">Performance</h3>
              <p className="text-[11px] text-zinc-500 mt-0.5">Supercritical PEBA racing foam</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Drops Grid */}
      <section className="py-16 border-b border-zinc-200/80 bg-zinc-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-red-600 font-bold mb-1">
                Featured Selection
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950">
                Headline Releases
              </h2>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs text-zinc-600 hover:text-zinc-950 flex items-center gap-1 group font-bold"
            >
              <span>Explore all {products.length} models</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                isWishlisted={wishlist.includes(p.id)}
                onToggleWishlist={onToggleWishlist}
                onSelectProduct={onSelectProduct}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3.5 Interactive Spotlight: Streetwear, Retro Classics & New Arrivals */}
      <section className="py-16 border-b border-zinc-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-600">
                  Curated Focus Collection
                </span>
                <span className="text-zinc-300">·</span>
                <span className="text-xs text-zinc-500 font-medium">Customer Interactive Showcase</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950">
                Streetwear, Retro Classics & New Arrivals
              </h2>
            </div>

            {/* Interactive Category Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-zinc-100 rounded-xl border border-zinc-200 text-xs">
              <button
                type="button"
                onClick={() => setSpotlightTab('streetwear')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  spotlightTab === 'streetwear'
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Streetwear</span>
              </button>
              <button
                type="button"
                onClick={() => setSpotlightTab('retro')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  spotlightTab === 'retro'
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                Retro Classics
              </button>
              <button
                type="button"
                onClick={() => setSpotlightTab('new')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  spotlightTab === 'new'
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>New Arrivals</span>
              </button>
              <button
                type="button"
                onClick={() => setSpotlightTab('all')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  spotlightTab === 'all'
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                All Models
              </button>
            </div>
          </div>

          {/* Cards Grid with Quick View */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {spotlightProducts.map((p) => (
              <div key={p.id} className="relative group/card">
                <ProductCard
                  product={p}
                  isWishlisted={wishlist.includes(p.id)}
                  onToggleWishlist={onToggleWishlist}
                  onSelectProduct={onSelectProduct}
                  onQuickAdd={onQuickAdd}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuickViewProduct(p);
                    setIsQuickViewOpen(true);
                  }}
                  className="absolute top-3 left-3 opacity-0 group-hover/card:opacity-100 transition-opacity z-20 px-2.5 py-1 bg-white/95 backdrop-blur-md border border-zinc-200 hover:border-zinc-400 rounded-md text-[10px] font-bold text-zinc-800 shadow-sm cursor-pointer"
                  title="Quick View"
                >
                  Quick View
                </button>
              </div>
            ))}
          </div>

          {/* Direct CTA */}
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                if (spotlightTab === 'streetwear') onNavigate('shop', { category: 'Streetwear' });
                else if (spotlightTab === 'retro') onNavigate('shop', { category: 'Retro Classics' });
                else if (spotlightTab === 'new') onNavigate('shop', { filter: 'new' });
                else onNavigate('shop');
              }}
              className="px-6 py-3 bg-zinc-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all inline-flex items-center gap-2 shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Explore Complete {spotlightTab.toUpperCase()} Vault</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Editorial Campaign Banner with Rich Shadow */}
      <section className="py-16 border-b border-zinc-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="relative rounded-3xl overflow-hidden border border-zinc-900 bg-zinc-950 grid grid-cols-1 lg:grid-cols-12 items-center shadow-2xl shadow-zinc-950/20">
            <div className="lg:col-span-6 p-8 sm:p-12 space-y-5 z-10 text-white">
              <span className="text-[11px] uppercase font-bold tracking-widest text-red-500">
                Editorial Showcase · Vol. 04
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                THE SHADOW MATRIX: <br />
                URBAN TACTICAL REDEFINED
              </h3>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-md">
                Constructed for high-stress weather environments with waterproof ballistic CORDURA® nylon and autoclaved carbon stabilization shanks.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onSelectProduct('prod-04')}
                  className="px-6 py-3 bg-white text-zinc-950 hover:bg-zinc-100 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-black/30 hover:-translate-y-0.5"
                >
                  <span>Discover Shadow Carbon High</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[16/9] lg:aspect-auto lg:h-full min-h-[320px]">
              <img
                src={lifestyleBannerImg}
                alt="Tactical Streetwear Campaign"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-zinc-950 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Best Sellers Section */}
      <section className="py-16 border-b border-zinc-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-red-600 font-bold mb-1">
                Trending on CARTIO
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950">
                Best Sellers & Recent Drops
              </h2>
            </div>
            <button
              onClick={() => onNavigate('shop', { filter: 'best' })}
              className="text-xs text-zinc-600 hover:text-zinc-950 flex items-center gap-1 group font-bold"
            >
              <span>View rankings</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                isWishlisted={wishlist.includes(p.id)}
                onToggleWishlist={onToggleWishlist}
                onSelectProduct={onSelectProduct}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Top Brands Showcase */}
      <section className="py-16 border-b border-zinc-200/80 bg-zinc-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
          <p className="text-[11px] uppercase tracking-widest text-zinc-500 font-bold mb-6">
            Verified Partner Ateliers & Studios
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div
              onClick={() => onNavigate('shop', { brand: 'CARTIO LAB' })}
              className="p-6 rounded-2xl bg-white border border-zinc-200/80 hover:border-zinc-400 hover:shadow-xl hover:shadow-zinc-950/8 transition-all cursor-pointer text-center group shadow-sm hover:-translate-y-1"
            >
              <h4 className="text-lg font-bold text-zinc-950 group-hover:text-red-600 transition-colors">
                CARTIO LAB
              </h4>
              <p className="text-[11px] text-zinc-500 mt-1">High-Performance Innovation</p>
            </div>

            <div
              onClick={() => onNavigate('shop', { brand: 'CARTIO Retro' })}
              className="p-6 rounded-2xl bg-white border border-zinc-200/80 hover:border-zinc-400 hover:shadow-xl hover:shadow-zinc-950/8 transition-all cursor-pointer text-center group shadow-sm hover:-translate-y-1"
            >
              <h4 className="text-lg font-bold text-zinc-950 group-hover:text-red-600 transition-colors">
                CARTIO RETRO
              </h4>
              <p className="text-[11px] text-zinc-500 mt-1">Golden-Era Basketball Silhouettes</p>
            </div>

            <div
              onClick={() => onNavigate('shop', { brand: 'Kuro Noir' })}
              className="p-6 rounded-2xl bg-white border border-zinc-200/80 hover:border-zinc-400 hover:shadow-xl hover:shadow-zinc-950/8 transition-all cursor-pointer text-center group shadow-sm hover:-translate-y-1"
            >
              <h4 className="text-lg font-bold text-zinc-950 group-hover:text-red-600 transition-colors">
                KURO NOIR
              </h4>
              <p className="text-[11px] text-zinc-500 mt-1">Architectural Tactical Streetwear</p>
            </div>

            <div
              onClick={() => onNavigate('shop', { brand: 'Apex Tech' })}
              className="p-6 rounded-2xl bg-white border border-zinc-200/80 hover:border-zinc-400 hover:shadow-xl hover:shadow-zinc-950/8 transition-all cursor-pointer text-center group shadow-sm hover:-translate-y-1"
            >
              <h4 className="text-lg font-bold text-zinc-950 group-hover:text-red-600 transition-colors">
                APEX TECH
              </h4>
              <p className="text-[11px] text-zinc-500 mt-1">Supercritical PEBA Race Foams</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-4">
          <span className="text-[11px] uppercase font-bold tracking-widest text-red-600">
            Private Priority Access
          </span>
          <h2 className="text-3xl font-extrabold text-zinc-950">
            Join the CARTIO Syndicate
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto">
            Receive private allocations, invite-only restock notifications, and early previews of seasonal sneaker drops.
          </p>
          {newsletterSubscribed ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold inline-flex items-center gap-2 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>You have been granted priority access to the CARTIO Syndicate notifications list.</span>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newsletterEmail) {
                  setNewsletterSubscribed(true);
                }
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2"
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-3 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-600 focus:bg-white shadow-xs"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md shadow-red-600/30 hover:shadow-lg hover:shadow-red-600/40 transition-all shrink-0 hover:-translate-y-0.5 cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Interactive Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onToggleWishlist={onToggleWishlist}
        onSelectProduct={onSelectProduct}
        onAddToCart={(item) => onQuickAdd(quickViewProduct!, item.selectedColor, item.selectedSize)}
      />
    </div>
  );
};
