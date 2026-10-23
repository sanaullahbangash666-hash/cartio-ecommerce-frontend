import React, { useState } from 'react';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (productId: string) => void;
  onQuickAdd: (product: Product, colorName: string, size: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
}) => {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const activeColor = product.colors[selectedColorIdx] || product.colors[0];
  const activeImage = activeColor?.image || product.images[0];

  const handleColorClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setSelectedColorIdx(idx);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product.id);
  };

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[1] || product.sizes[0] || 'US 10';
    onQuickAdd(product, activeColor.name, defaultSize);
  };

  return (
    <div
      onClick={() => onSelectProduct(product.id)}
      className="group relative flex flex-col bg-white border border-zinc-200/80 rounded-2xl overflow-hidden hover:border-zinc-300 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-zinc-950/10 hover:-translate-y-1.5"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/3] w-full bg-gradient-to-b from-[#f8f8fb] via-[#f4f4f8] to-[#ededf2] overflow-hidden flex items-center justify-center p-6 border-b border-zinc-100">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {product.isSale && product.salePrice && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase shadow-xs">
              Save ${product.price - product.salePrice}
            </span>
          )}
          {product.isNewArrival && !product.isSale && (
            <span className="bg-zinc-950 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase shadow-xs">
              New Drop
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-white/95 text-zinc-900 border border-zinc-200 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
              Best Seller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/95 backdrop-blur-md border border-zinc-200 text-zinc-700 hover:text-red-600 hover:scale-110 transition-all shadow-sm cursor-pointer"
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-600 text-red-600' : ''}`} />
        </button>

        {/* Main Product Image (Normal, unclipped shoe silhouette) */}
        <img
          src={activeImage}
          alt={`${product.name} in ${activeColor?.name}`}
          className="object-contain w-full h-full transform group-hover:scale-106 transition-transform duration-500 drop-shadow-[0_12px_22px_rgba(0,0,0,0.12)]"
          loading="lazy"
        />

        {/* Quick Add Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex justify-center z-10">
          <button
            onClick={handleQuickAddClick}
            className="w-full py-2.5 px-3 bg-zinc-950 hover:bg-black text-white text-xs font-bold rounded-xl shadow-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Add ({activeColor?.name})</span>
          </button>
        </div>
      </div>

      {/* Metadata & Details */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white">
        <div>
          <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-1">
            <span className="font-bold uppercase tracking-wider text-zinc-500">{product.brand}</span>
            <div className="flex items-center gap-1 text-zinc-700">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-mono-numbers font-semibold">{product.rating}</span>
              <span className="text-zinc-400">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="font-bold text-sm text-zinc-900 group-hover:text-red-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </div>

        {/* Color Swatches and Price */}
        <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between">
          {/* Swatches */}
          <div className="flex items-center gap-1.5">
            {product.colors.map((c, idx) => (
              <button
                key={c.name}
                type="button"
                onClick={(e) => handleColorClick(e, idx)}
                title={c.name}
                aria-label={`Select ${c.name} color`}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColorIdx === idx
                    ? 'ring-2 ring-red-600 ring-offset-2 ring-offset-white border-transparent scale-110'
                    : 'border-zinc-300 hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
            <span className="text-[10px] text-zinc-400 font-medium ml-1">
              {product.colors.length} {product.colors.length > 1 ? 'colors' : 'color'}
            </span>
          </div>

          {/* Price */}
          <div className="text-right">
            {product.salePrice ? (
              <div className="flex items-baseline gap-1.5 font-mono-numbers">
                <span className="text-sm font-extrabold text-red-600">${product.salePrice}</span>
                <span className="text-xs text-zinc-400 line-through">${product.price}</span>
              </div>
            ) : (
              <span className="text-sm font-bold text-zinc-900 font-mono-numbers">${product.price}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
