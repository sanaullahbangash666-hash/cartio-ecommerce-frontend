import React, { useState, useMemo, useEffect } from 'react';
import {
  Heart,
  Star,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  AlertCircle,
  Sparkles,
  Send,
  Ruler,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Share2,
} from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { ProductCard } from '../components/ProductCard';
import { SizeGuideModal } from '../components/SizeGuideModal';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (item: {
    productId: string;
    productName: string;
    brand: string;
    selectedColor: string;
    selectedSize: string;
    price: number;
    quantity: number;
    image: string;
    maxStock: number;
    sku: string;
  }) => void;
  onBuyNow: (item: {
    productId: string;
    productName: string;
    brand: string;
    selectedColor: string;
    selectedSize: string;
    price: number;
    quantity: number;
    image: string;
    maxStock: number;
    sku: string;
  }) => void;
  onSelectProduct: (productId: string) => void;
  onNavigate?: (view: string, params?: any) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  onNavigate,
}) => {
  // Color selection state: default to first color
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const activeColor = product.colors[selectedColorIndex] || product.colors[0];

  // Size selection state
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[1] || product.sizes[0] || 'US 10');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews' | 'faq'>('details');

  // Interactive Size Guide Modal State
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // HCI Feedback State for Add to Bag
  const [addedFeedback, setAddedFeedback] = useState(false);

  // Customer review form state
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [reviewsList, setReviewsList] = useState(product.reviews || []);

  // Sync reviews when product changes
  useEffect(() => {
    setReviewsList(product.reviews || []);
    setSelectedColorIndex(0);
    setSelectedSize(product.sizes[1] || product.sizes[0] || 'US 10');
    setQuantity(1);
  }, [product]);

  // Compute active variant combination (Color + Size + Stock)
  const currentVariant: ProductVariant | undefined = useMemo(() => {
    return product.variants.find(
      (v) => v.color.toLowerCase() === activeColor.name.toLowerCase() && v.size === selectedSize
    );
  }, [product, activeColor, selectedSize]);

  // Available stock for this exact Color + Size combination
  const variantStock = currentVariant ? currentVariant.stock : 0;
  const isOutOfStock = variantStock === 0;

  // Active Main Image: Automatically swaps to the selected color variant's image!
  const activeMainImage = activeColor?.image || product.images[0];

  // Price calculation
  const currentPrice = product.salePrice || product.price;

  const handleColorSelect = (index: number) => {
    setSelectedColorIndex(index);
    setQuantity(1);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setQuantity(1);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment.trim()) return;

    const review = {
      id: `rev-${Date.now()}`,
      userId: `user-current`,
      userName: newReviewAuthor.trim() || 'Verified Footwear Collector',
      rating: newReviewRating,
      title: newReviewTitle || 'Exceptional craftsmanship & silhouette',
      comment: newReviewComment,
      verifiedPurchase: true,
      createdAt: new Date().toISOString(),
    };

    setReviewsList([review, ...reviewsList]);
    setNewReviewTitle('');
    setNewReviewComment('');
    setNewReviewAuthor('');
  };

  const buildCartPayload = () => ({
    productId: product.id,
    productName: product.name,
    brand: product.brand,
    selectedColor: activeColor.name,
    selectedSize,
    price: currentPrice,
    quantity,
    image: activeMainImage,
    maxStock: variantStock,
    sku: currentVariant?.sku || product.sku,
  });

  const handleAddToCartWithFeedback = () => {
    if (isOutOfStock) return;
    onAddToCart(buildCartPayload());
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2400);
  };

  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 3);
  const isWishlisted = wishlist.includes(product.id);

  // FAQ Accordion Data
  const faqs = [
    {
      q: 'How fast will my footwear arrive?',
      a: 'All verified orders dispatch within 24 hours from our atelier via express air freight with signature-tracked delivery. Typical arrival time is 2 to 4 business days.',
    },
    {
      q: 'What if the size doesn’t fit perfectly?',
      a: 'We offer 100% complimentary size exchanges within 30 days of delivery. Use the prepaid return label included in the collector box or contact our Concierge for instant exchange processing.',
    },
    {
      q: 'How is authenticity guaranteed?',
      a: 'Every CARTIO pair includes an embedded cryptographic NFC provenance chip and hand-signed physical certificate verifying master cobbler inspection pass.',
    },
    {
      q: 'How should I clean and maintain this sneaker?',
      a: 'For technical mesh and nylon, gently wipe with a micro-fiber cloth and lukewarm water. For Italian calfskin suede, use a dry brass-bristle suede brush. Never machine wash.',
    },
  ];
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white text-zinc-900 py-8 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Interactive Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        productName={product.name}
      />

      {/* HCI Breadcrumbs with reliable navigation */}
      <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6 font-medium">
        <button
          onClick={() => (onNavigate ? onNavigate('home') : onSelectProduct('prod-01'))}
          className="hover:text-red-600 transition-colors cursor-pointer"
        >
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => (onNavigate ? onNavigate('shop') : onSelectProduct('prod-01'))}
          className="hover:text-red-600 transition-colors cursor-pointer"
        >
          Catalog
        </button>
        <span>/</span>
        <button
          onClick={() => (onNavigate ? onNavigate('shop', { category: product.category }) : onSelectProduct('prod-01'))}
          className="hover:text-red-600 transition-colors cursor-pointer"
        >
          {product.category}
        </button>
        <span>/</span>
        <span className="text-zinc-950 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16">
        {/* Left Column: Image Gallery Stage */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Product Image Rounded Rectangle Stage */}
          <div className="relative aspect-square bg-gradient-to-b from-[#f9f9fc] via-[#f3f3f7] to-[#ebebf1] border border-zinc-200/90 rounded-3xl overflow-hidden flex items-center justify-center p-8 group shadow-[inset_0_2px_8px_rgba(255,255,255,0.9),0_12px_32px_rgba(0,0,0,0.05)] transition-all">
            {/* Subtle ambient lighting flare */}
            <div className="absolute inset-0 bg-radial from-white/60 via-transparent to-transparent pointer-events-none rounded-3xl" />

            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              {product.isSale && product.salePrice && (
                <span className="bg-red-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Save ${product.price - product.salePrice}
                </span>
              )}
              {product.isNewArrival && (
                <span className="bg-zinc-950 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  New Arrival
                </span>
              )}
              <span className="bg-white/90 backdrop-blur-md border border-zinc-200 text-zinc-800 text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wide">
                {product.category}
              </span>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => onToggleWishlist(product.id)}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/95 backdrop-blur-md border border-zinc-200 text-zinc-700 hover:text-red-600 hover:scale-110 transition-all shadow-sm cursor-pointer"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-600 text-red-600' : ''}`} />
            </button>

            {/* Main Stage Image (Normal unclipped shoe silhouette) */}
            <img
              src={activeMainImage}
              alt={`${product.name} in ${activeColor.name}`}
              className="w-full h-full object-contain filter drop-shadow-[0_22px_38px_rgba(0,0,0,0.2)] transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Colorway Thumbnails preview */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {product.colors.map((c, idx) => (
              <button
                key={c.name}
                type="button"
                onClick={() => handleColorSelect(idx)}
                className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                  selectedColorIndex === idx
                    ? 'border-red-600 bg-red-50/60 ring-2 ring-red-600/30 shadow-xs'
                    : 'border-zinc-200 bg-white hover:border-zinc-300'
                }`}
              >
                <div className="aspect-square w-full rounded-xl bg-gradient-to-b from-[#f8f8fb] to-[#ededf2] overflow-hidden mb-1.5 flex items-center justify-center p-2 border border-zinc-200/80">
                  <img src={c.image} alt={c.name} className="w-full h-full object-contain" />
                </div>
                <span className="text-[10px] font-bold text-zinc-800 block truncate">{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Buying Center & Technical Specification */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold uppercase tracking-wider text-red-600">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1.5 text-zinc-700 bg-zinc-100 px-2.5 py-1 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-zinc-950 font-mono-numbers">{product.rating}</span>
                  <span className="text-zinc-500">({reviewsList.length} reviews)</span>
                </div>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-black text-zinc-950 leading-tight">
                {product.name}
              </h1>

              {/* Price display */}
              <div className="mt-3 flex items-baseline gap-3">
                {product.salePrice ? (
                  <>
                    <span className="text-3xl font-black text-red-600 font-mono-numbers">
                      ${product.salePrice}
                    </span>
                    <span className="text-base text-zinc-400 line-through font-mono-numbers">
                      ${product.price}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      Save ${product.price - product.salePrice} (Special Drop)
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-black text-zinc-950 font-mono-numbers">
                    ${product.price}
                  </span>
                )}
              </div>

              {/* Installments note (HCI Transparency) */}
              <p className="text-[11px] text-zinc-500 mt-1">
                Or 4 interest-free payments of{' '}
                <span className="font-bold text-zinc-900 font-mono-numbers">
                  ${(currentPrice / 4).toFixed(2)}
                </span>{' '}
                with Klarna or Afterpay.
              </p>
            </div>

            {/* Colorway Selection */}
            <div className="space-y-2 pt-3 border-t border-zinc-200">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-zinc-800 uppercase tracking-wider text-[11px]">
                  Colorway: <span className="text-zinc-950 font-semibold">{activeColor.name}</span>
                </span>
                <span className="text-[11px] text-zinc-400">Swaps image in real time</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {product.colors.map((c, idx) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => handleColorSelect(idx)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs transition-all cursor-pointer ${
                      selectedColorIndex === idx
                        ? 'border-red-600 bg-red-50 text-red-700 font-bold shadow-xs'
                        : 'border-zinc-200 bg-white text-zinc-700 hover:text-zinc-950 hover:border-zinc-300'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-zinc-300" style={{ backgroundColor: c.hex }} />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector with Size Guide trigger */}
            <div className="space-y-2 pt-3 border-t border-zinc-200">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-zinc-800 uppercase tracking-wider text-[11px]">
                  Select Shoe Size (US)
                </span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 underline cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide & Fit Advisor</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((s) => {
                  const variantForSize = product.variants.find(
                    (v) => v.color.toLowerCase() === activeColor.name.toLowerCase() && v.size === s
                  );
                  const sizeStock = variantForSize ? variantForSize.stock : 0;
                  const sizeAvailable = sizeStock > 0;

                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleSizeSelect(s)}
                      disabled={!sizeAvailable}
                      className={`py-2.5 text-center rounded-xl border text-xs font-mono transition-all relative cursor-pointer ${
                        selectedSize === s
                          ? 'border-red-600 bg-red-600 text-white font-bold shadow-md shadow-red-600/30'
                          : sizeAvailable
                          ? 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400 hover:text-zinc-950'
                          : 'border-zinc-100 bg-zinc-50 text-zinc-300 line-through cursor-not-allowed'
                      }`}
                    >
                      <span>{s}</span>
                      {sizeAvailable && sizeStock <= 3 && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 animate-pulse" title="Low stock" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stock Status & SKU Indicator */}
            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {isOutOfStock ? (
                  <>
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-red-600 font-semibold">Out of Stock in this combination</span>
                  </>
                ) : variantStock <= 5 ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-amber-800 font-semibold">
                      Low Stock: Only {variantStock} pair{variantStock > 1 ? 's' : ''} left in {selectedSize}!
                    </span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">
                      In Stock ({variantStock} available to dispatch)
                    </span>
                  </>
                )}
              </div>

              <span className="text-[10px] text-zinc-500 font-mono">
                SKU: {currentVariant?.sku || product.sku}
              </span>
            </div>

            {/* Quantity Stepper + Purchase Buttons */}
            <div className="space-y-3 pt-2 border-t border-zinc-200">
              <div className="flex items-center gap-4">
                <span className="text-xs text-zinc-600 font-semibold uppercase tracking-wider">Quantity</span>
                <div className="flex items-center border border-zinc-300 rounded-xl bg-white shadow-xs">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-1.5 text-zinc-600 hover:text-zinc-950 font-bold cursor-pointer"
                    disabled={quantity <= 1 || isOutOfStock}
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-bold text-zinc-950 font-mono-numbers">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(variantStock, quantity + 1))}
                    className="px-3.5 py-1.5 text-zinc-600 hover:text-zinc-950 font-bold cursor-pointer"
                    disabled={quantity >= variantStock || isOutOfStock}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons with HCI feedback */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCartWithFeedback}
                  disabled={isOutOfStock}
                  className={`py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                    addedFeedback
                      ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                      : 'bg-zinc-950 hover:bg-black text-white hover:-translate-y-0.5'
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  {addedFeedback ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added {selectedSize} to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag ({selectedSize})</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onBuyNow(buildCartPayload())}
                  disabled={isOutOfStock}
                  className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>Instant Checkout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Authenticity & Dispatch Assurances */}
          <div className="pt-4 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-zinc-600">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-50 border border-zinc-200">
              <ShieldCheck className="w-4 h-4 text-red-600 shrink-0" />
              <span className="text-[11px] font-medium leading-tight">NFC Authenticated Pass</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-50 border border-zinc-200">
              <Truck className="w-4 h-4 text-red-600 shrink-0" />
              <span className="text-[11px] font-medium leading-tight">24h Express Air Dispatch</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-50 border border-zinc-200">
              <RotateCcw className="w-4 h-4 text-red-600 shrink-0" />
              <span className="text-[11px] font-medium leading-tight">Free 30-Day Exchanges</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Description, Technical Specs, Verified Reviews, FAQ */}
      <div className="border-t border-zinc-200 pt-10 mb-16">
        <div className="flex border-b border-zinc-200 mb-8 gap-6 sm:gap-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 font-display whitespace-nowrap cursor-pointer ${
              activeTab === 'details' ? 'border-red-600 text-red-600' : 'border-transparent text-zinc-500 hover:text-zinc-950'
            }`}
          >
            Design & Construction
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 font-display whitespace-nowrap cursor-pointer ${
              activeTab === 'specs' ? 'border-red-600 text-red-600' : 'border-transparent text-zinc-500 hover:text-zinc-950'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 font-display whitespace-nowrap cursor-pointer ${
              activeTab === 'reviews' ? 'border-red-600 text-red-600' : 'border-transparent text-zinc-500 hover:text-zinc-950'
            }`}
          >
            Verified Customer Reviews ({reviewsList.length})
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 font-display whitespace-nowrap cursor-pointer ${
              activeTab === 'faq' ? 'border-red-600 text-red-600' : 'border-transparent text-zinc-500 hover:text-zinc-950'
            }`}
          >
            Atelier Q&A & Shipping
          </button>
        </div>

        {/* Tab 1: Details */}
        {activeTab === 'details' && (
          <div className="max-w-3xl space-y-4 text-sm text-zinc-700 leading-relaxed font-normal">
            <p className="text-base text-zinc-900 font-medium">{product.description}</p>
            <p>
              Each pair is constructed using anatomical lasts sculpted specifically for the human gait cycle. The sole architecture harmonizes impact dispersion with energetic toe-off propulsion, rendering it optimal for high-mileage urban exploration, street style statements, or race day performance.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span key={t} className="px-3 py-1 bg-zinc-100 border border-zinc-200 rounded-lg text-xs text-zinc-700 font-semibold">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Specifications */}
        {activeTab === 'specs' && (
          <div className="max-w-2xl bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden divide-y divide-zinc-200 text-xs shadow-xs">
            {product.specifications ? (
              Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="px-5 py-3.5 flex justify-between bg-white first:bg-white">
                  <span className="font-semibold text-zinc-600">{key}</span>
                  <span className="font-bold text-zinc-950 text-right">{val}</span>
                </div>
              ))
            ) : (
              <div className="p-4 bg-white text-zinc-500">Standard Atelier Specifications apply.</div>
            )}
            <div className="px-5 py-3.5 flex justify-between bg-white">
              <span className="font-semibold text-zinc-600">Model Origin</span>
              <span className="font-bold text-zinc-950">Handcrafted in Atelier Montebelluna</span>
            </div>
            <div className="px-5 py-3.5 flex justify-between bg-white">
              <span className="font-semibold text-zinc-600">Authentication</span>
              <span className="font-bold text-zinc-950">Cryptographic NFC Verified</span>
            </div>
          </div>
        )}

        {/* Tab 3: Reviews */}
        {activeTab === 'reviews' && (
          <div className="max-w-4xl space-y-8">
            {/* Reviews Summary Header with Fit Sentiment */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="text-center md:border-r border-zinc-200 md:pr-6">
                <span className="text-4xl font-black text-zinc-950 font-mono-numbers">{product.rating}</span>
                <div className="flex items-center justify-center gap-1 text-amber-400 my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-zinc-500">Based on {reviewsList.length} verified reviews</span>
              </div>

              {/* Fit sentiment */}
              <div className="md:col-span-2 space-y-2">
                <div className="flex justify-between text-xs font-bold text-zinc-800">
                  <span>Shoe Fit Sentiment</span>
                  <span className="text-emerald-700">94% True to Size</span>
                </div>
                <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-amber-400 h-full w-[4%]" title="Runs Small (4%)" />
                  <div className="bg-emerald-600 h-full w-[92%]" title="True to Size (92%)" />
                  <div className="bg-amber-400 h-full w-[4%]" title="Runs Large (4%)" />
                </div>
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                  <span>Runs Small (4%)</span>
                  <span className="text-emerald-700 font-bold">True to Size (92%)</span>
                  <span>Runs Large (4%)</span>
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="p-5 bg-white border border-zinc-200 rounded-2xl space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-zinc-950">{rev.userName}</span>
                    <span className="text-[10px] text-zinc-400">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < rev.rating ? 'fill-current' : 'text-zinc-200'}`}
                      />
                    ))}
                  </div>

                  <h5 className="font-bold text-xs text-zinc-900">{rev.title}</h5>
                  <p className="text-xs text-zinc-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>

            {/* Write a Review Form */}
            <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 font-display">
                Share Your Customer Review
              </h4>
              <form onSubmit={handleAddReview} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-600 uppercase mb-1">
                      Your Name / Handle
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Marcus V."
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-600 uppercase mb-1">
                      Rating
                    </label>
                    <div className="flex items-center gap-1 mt-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReviewRating(star)}
                          className={`p-1 cursor-pointer ${star <= newReviewRating ? 'text-amber-400' : 'text-zinc-300'}`}
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Review title (e.g. Flawless materials and extreme comfort)"
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-600"
                />

                <textarea
                  rows={3}
                  required
                  placeholder="Describe your fit, arch feel, and day-to-day experience..."
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-600"
                />

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 shadow-md shadow-red-600/30 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Customer Review</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 4: FAQ & Atelier Q&A */}
        {activeTab === 'faq' && (
          <div className="max-w-3xl space-y-3">
            {faqs.map((f, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className="border border-zinc-200 rounded-2xl overflow-hidden bg-white">
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left font-bold text-xs text-zinc-900 flex items-center justify-between hover:bg-zinc-50 transition-colors cursor-pointer"
                  >
                    <span>{f.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-zinc-600 leading-relaxed border-t border-zinc-100 pt-3 bg-zinc-50/50">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Related Products Section */}
      <div className="border-t border-zinc-200 pt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display text-xl font-bold text-zinc-950">
              Related Silhouettes You May Like
            </h3>
            <p className="text-xs text-zinc-500">Hand-selected pairings from the same atelier series</p>
          </div>
          <button
            onClick={() => onNavigate && onNavigate('shop')}
            className="text-xs font-bold text-red-600 hover:text-red-700 underline cursor-pointer"
          >
            Explore All Footwear →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              isWishlisted={wishlist.includes(p.id)}
              onToggleWishlist={onToggleWishlist}
              onSelectProduct={onSelectProduct}
              onQuickAdd={(item, color, size) =>
                onAddToCart({
                  productId: item.id,
                  productName: item.name,
                  brand: item.brand,
                  selectedColor: color,
                  selectedSize: size,
                  price: item.salePrice || item.price,
                  quantity: 1,
                  image: item.colors.find((c) => c.name === color)?.image || item.images[0],
                  maxStock: item.stock,
                  sku: item.sku,
                })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
