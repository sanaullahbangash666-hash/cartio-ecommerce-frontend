import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
  onViewProduct: (productId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  cart,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
  onViewProduct,
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 150;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const estimatedTax = Math.round(subtotal * 0.08 * 100) / 100;
  const grandTotal = subtotal + shipping + estimatedTax;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white border-l border-zinc-200 flex flex-col h-full shadow-2xl text-zinc-900">
        {/* Drawer Header */}
        <div className="p-5 border-b border-zinc-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-red-600" />
            <h2 className="text-sm font-bold text-zinc-950 uppercase tracking-wider">
              Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {cart.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-[11px] text-zinc-500 hover:text-red-600 transition-colors"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="bg-zinc-50 px-5 py-2.5 border-b border-zinc-200 text-[11px]">
          {subtotal >= freeShippingThreshold ? (
            <p className="text-emerald-700 font-semibold">✓ You have qualified for complimentary global delivery!</p>
          ) : (
            <div>
              <p className="text-zinc-600">
                Add <span className="font-bold text-zinc-950 font-mono-numbers">${freeShippingThreshold - subtotal}</span> more for complimentary delivery.
              </p>
              <div className="w-full bg-zinc-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-red-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-zinc-100 space-y-4 bg-white">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500">
              <ShoppingBag className="w-12 h-12 mb-3 text-zinc-300 stroke-[1.5]" />
              <p className="text-sm font-bold text-zinc-900 mb-1">Your bag is empty</p>
              <p className="text-xs max-w-xs mb-4 text-zinc-500">Discover the new arrivals collection or browse signature sneakers.</p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
              >
                Explore Sneakers
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                {/* Thumbnail Rounded Rectangle */}
                <div
                  onClick={() => {
                    onViewProduct(item.productId);
                    onClose();
                  }}
                  className="w-20 h-20 bg-gradient-to-b from-[#f8f8fb] to-[#ededf2] border border-zinc-200/90 rounded-2xl overflow-hidden shrink-0 cursor-pointer p-1.5 flex items-center justify-center shadow-xs"
                >
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        onClick={() => {
                          onViewProduct(item.productId);
                          onClose();
                        }}
                        className="text-xs font-bold text-zinc-900 hover:text-red-600 cursor-pointer line-clamp-1"
                      >
                        {item.productName}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-zinc-400 hover:text-red-600 transition-colors p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-zinc-500 mt-1 flex items-center gap-2">
                      <span className="text-zinc-800 font-medium">{item.selectedColor}</span>
                      <span>·</span>
                      <span className="font-mono">{item.selectedSize}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1">
                    {/* Stepper */}
                    <div className="flex items-center border border-zinc-200 rounded bg-zinc-50">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-zinc-500 hover:text-black"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-zinc-900 font-mono-numbers">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.maxStock}
                        className="p-1 text-zinc-500 hover:text-black disabled:opacity-30"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-bold text-zinc-950 font-mono-numbers">
                      ${item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer / Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-zinc-200 bg-zinc-50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span className="text-zinc-900 font-bold font-mono-numbers">${subtotal}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Estimated Shipping</span>
                <span className="text-zinc-900 font-bold font-mono-numbers">
                  {shipping === 0 ? <span className="text-emerald-600 font-semibold">Complimentary</span> : `$${shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Tax (8%)</span>
                <span className="text-zinc-900 font-bold font-mono-numbers">${estimatedTax}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-zinc-950 pt-2 border-t border-zinc-200">
                <span>Total</span>
                <span className="text-red-600 font-mono-numbers font-black">${grandTotal}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md shadow-red-600/20 flex items-center justify-center gap-2 transition-all hover:gap-3"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
