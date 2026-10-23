import React, { useState } from 'react';
import { X, Star, ShoppingBag, Eye, Heart, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (productId: string) => void;
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
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onAddToCart,
}) => {
  if (!isOpen || !product) return null;

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const activeColor = product.colors[selectedColorIdx] || product.colors[0];
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[1] || product.sizes[0] || 'US 10');
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const activeImage = activeColor?.image || product.images[0];
  const currentVariant = product.variants.find(
    (v) => v.color.toLowerCase() === activeColor.name.toLowerCase() && v.size === selectedSize
  );
  const variantStock = currentVariant ? currentVariant.stock : 0;
  const isOutOfStock = variantStock === 0;
  const currentPrice = product.salePrice || product.price;

  const handleAdd = () => {
    onAddToCart({
      productId: product.id,
      productName: product.name,
      brand: product.brand,
      selectedColor: activeColor.name,
      selectedSize,
      price: currentPrice,
      quantity,
      image: activeImage,
      maxStock: variantStock,
      sku: currentVariant?.sku || product.sku,
    });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-white rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] text-zinc-900"
      >
        {/* Left: Product Image Stage */}
        <div className="w-full md:w-1/2 bg-[#f8f8fa] p-6 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-zinc-200 relative">
          <div className="w-full flex items-center justify-between z-10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-100/80 px-2 py-0.5 rounded">
              {product.category}
            </span>
            <button
              onClick={() => onToggleWishlist(product.id)}
              className="p-1.5 rounded-full bg-white border border-zinc-200 text-zinc-600 hover:text-red-600 shadow-xs cursor-pointer"
              title="Toggle Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-600 text-red-600' : ''}`} />
            </button>
          </div>

          <div className="relative my-auto py-4 aspect-square w-full max-w-[280px] bg-gradient-to-b from-[#f9f9fc] via-[#f3f3f7] to-[#ebebf1] border border-zinc-200/90 rounded-2xl flex items-center justify-center p-5 shadow-[inset_0_2px_6px_rgba(255,255,255,0.9),0_8px_24px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="absolute inset-0 bg-radial from-white/50 via-transparent to-transparent pointer-events-none rounded-2xl" />
            <img
              src={activeImage}
              alt={`${product.name} in ${activeColor.name}`}
              className="w-full h-full object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.18)] transition-all duration-300"
            />
          </div>

          {/* Color Switcher */}
          <div className="flex items-center gap-2 pt-2">
            {product.colors.map((c, idx) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedColorIdx(idx)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition-all cursor-pointer ${
                  selectedColorIdx === idx
                    ? 'border-red-600 bg-red-50 text-red-700 font-semibold'
                    : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
                }`}
              >
                <span className="w-3 h-3 rounded-full border border-zinc-300" style={{ backgroundColor: c.hex }} />
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Details & HCI Action Center */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto space-y-4">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  {product.brand}
                </span>
                <h3 className="text-lg font-black text-zinc-950 mt-0.5">
                  {product.name}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1.5 text-xs mt-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold font-mono-numbers">{product.rating}</span>
              <span className="text-zinc-400">({product.reviewsCount} reviews)</span>
            </div>

            {/* Pricing */}
            <div className="mt-2.5 flex items-baseline gap-2">
              {product.salePrice ? (
                <>
                  <span className="text-2xl font-black text-red-600 font-mono-numbers">
                    ${product.salePrice}
                  </span>
                  <span className="text-xs text-zinc-400 line-through font-mono-numbers">
                    ${product.price}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Save ${product.price - product.salePrice}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-black text-zinc-950 font-mono-numbers">
                  ${product.price}
                </span>
              )}
            </div>

            <p className="text-xs text-zinc-600 line-clamp-2 mt-2 leading-relaxed">
              {product.description}
            </p>

            {/* Sizes */}
            <div className="mt-4 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-800 uppercase tracking-wide text-[11px]">
                  Select Size (US)
                </span>
                <span className="text-[10px] text-zinc-500">Standard D-Width</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {product.sizes.map((s) => {
                  const variant = product.variants.find(
                    (v) => v.color.toLowerCase() === activeColor.name.toLowerCase() && v.size === s
                  );
                  const isAvail = variant && variant.stock > 0;
                  return (
                    <button
                      key={s}
                      type="button"
                      disabled={!isAvail}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2 text-center rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'border-red-600 bg-red-600 text-white font-bold shadow-xs'
                          : isAvail
                          ? 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400'
                          : 'border-zinc-100 bg-zinc-50 text-zinc-300 line-through cursor-not-allowed'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stock indicator */}
            <div className="mt-3 text-xs flex items-center justify-between bg-zinc-50 p-2.5 rounded-lg border border-zinc-200">
              <div className="flex items-center gap-1.5">
                {isOutOfStock ? (
                  <>
                    <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                    <span className="text-red-600 font-semibold text-[11px]">Out of Stock</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold text-[11px]">
                      {variantStock <= 5 ? `Low Stock (${variantStock} left)` : `In Stock (${variantStock} available)`}
                    </span>
                  </>
                )}
              </div>
              <span className="text-[10px] text-zinc-500 font-mono">
                SKU: {currentVariant?.sku || product.sku}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2 border-t border-zinc-200">
            <button
              onClick={handleAdd}
              disabled={isOutOfStock}
              className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                addedNotice
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                  : 'bg-zinc-950 hover:bg-black text-white'
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {addedNotice ? (
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
              onClick={() => {
                onSelectProduct(product.id);
                onClose();
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-zinc-300 hover:border-zinc-950 text-zinc-800 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Full Silhouette Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
