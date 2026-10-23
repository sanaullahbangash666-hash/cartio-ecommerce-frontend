import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Check, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CartPageProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: (appliedDiscount: number) => void;
  onContinueShopping: () => void;
  onSelectProduct: (productId: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onContinueShopping,
  onSelectProduct,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoSuccess, setPromoSuccess] = useState(false);
  const [promoError, setPromoError] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 150;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const estimatedTax = Math.round(taxableAmount * 0.08 * 100) / 100;
  const grandTotal = Math.max(0, subtotal - discountAmount) + shipping + estimatedTax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'CARTIO20') {
      const discount = Math.round(subtotal * 0.2);
      setDiscountAmount(discount);
      setPromoSuccess(true);
    } else if (promoCode.trim().toUpperCase() === 'WELCOME10') {
      const discount = Math.round(subtotal * 0.1);
      setDiscountAmount(discount);
      setPromoSuccess(true);
    } else {
      setPromoError('Invalid promotion code. Try code "CARTIO20".');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center mb-4 text-zinc-500">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-display text-2xl font-bold text-zinc-950 mb-2">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-zinc-500 mb-6 leading-relaxed">
          Looks like you haven't added any designer sneakers to your bag yet. Explore our latest arrivals or featured silhouettes.
        </p>
        <button
          onClick={onContinueShopping}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md shadow-red-600/20 transition-colors"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 py-8 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-200">
        <div>
          <h1 className="font-display text-3xl font-black text-zinc-950">Shopping Bag</h1>
          <p className="text-xs text-zinc-500 mt-1">
            Review your selected colorways, sizes, and quantities.
          </p>
        </div>
        <button
          onClick={onClearCart}
          className="text-xs text-zinc-500 hover:text-red-600 transition-colors font-medium"
        >
          Clear bag
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-zinc-200/80 rounded-xl divide-y divide-zinc-200 overflow-hidden shadow-xs">
            {cart.map((item) => (
              <div key={item.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    onClick={() => onSelectProduct(item.productId)}
                    className="w-20 h-20 bg-gradient-to-b from-[#f8f8fb] to-[#ededf2] border border-zinc-200/90 rounded-2xl overflow-hidden shrink-0 cursor-pointer p-1.5 flex items-center justify-center shadow-xs"
                  >
                    <img src={item.image} alt={item.productName} className="w-full h-full object-contain" />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-display">{item.brand}</span>
                    <h3
                      onClick={() => onSelectProduct(item.productId)}
                      className="text-sm font-semibold text-zinc-950 hover:text-red-600 cursor-pointer"
                    >
                      {item.productName}
                    </h3>
                    <div className="text-xs text-zinc-500 mt-1 flex items-center gap-2">
                      <span className="text-zinc-900 font-medium">{item.selectedColor}</span>
                      <span>·</span>
                      <span className="font-mono">{item.selectedSize}</span>
                    </div>
                  </div>
                </div>

                {/* Stepper & Price */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  <div className="flex items-center border border-zinc-300 rounded-lg bg-zinc-50">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-zinc-600 hover:text-zinc-950"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-xs font-bold font-mono-numbers text-zinc-950">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.maxStock}
                      className="px-2.5 py-1 text-zinc-600 hover:text-zinc-950 disabled:opacity-30"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="text-sm font-bold text-zinc-950 font-mono-numbers min-w-[70px] text-right">
                    ${item.price * item.quantity}
                  </span>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-zinc-400 hover:text-red-600 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onContinueShopping}
            className="text-xs text-zinc-600 hover:text-zinc-950 flex items-center gap-2 transition-colors pt-2 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Right Column: Order Summary & Checkout */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-zinc-200/80 rounded-xl p-6 space-y-5 shadow-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-3 font-display">
              Summary
            </h2>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="text-[11px] font-semibold text-zinc-600 uppercase tracking-wider">
                Discount Code
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Enter CARTIO20"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-900 placeholder-zinc-400 uppercase focus:outline-none focus:border-red-600 focus:bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-zinc-900 hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors shrink-0"
                >
                  Apply
                </button>
              </div>

              {promoSuccess && (
                <p className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
                  <Check className="w-3 h-3" />
                  <span>Promo code applied! Saved ${discountAmount}</span>
                </p>
              )}
              {promoError && (
                <p className="text-[11px] text-red-600 font-medium">{promoError}</p>
              )}
            </form>

            {/* Totals Breakdown */}
            <div className="space-y-2.5 text-xs pt-3 border-t border-zinc-200">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span className="text-zinc-950 font-bold font-mono-numbers">${subtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount (CARTIO20)</span>
                  <span className="font-mono-numbers">-${discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between text-zinc-600">
                <span>Estimated Shipping</span>
                <span className="text-zinc-950 font-bold font-mono-numbers">
                  {shipping === 0 ? <span className="text-emerald-700">Complimentary</span> : `$${shipping}`}
                </span>
              </div>

              <div className="flex justify-between text-zinc-600">
                <span>Estimated Tax (8%)</span>
                <span className="text-zinc-950 font-bold font-mono-numbers">${estimatedTax}</span>
              </div>

              <div className="flex justify-between text-base font-bold text-zinc-950 pt-3 border-t border-zinc-200">
                <span className="font-display">Estimated Total</span>
                <span className="text-red-600 font-mono-numbers font-black">${grandTotal}</span>
              </div>
            </div>

            <button
              onClick={() => onProceedToCheckout(discountAmount)}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md shadow-red-600/20 flex items-center justify-center gap-2 transition-all hover:gap-3"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
