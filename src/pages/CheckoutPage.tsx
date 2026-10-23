import React, { useState, useEffect } from 'react';
import { ShieldCheck, CreditCard, Banknote, ArrowRight, CheckCircle2, Lock, Wallet, Sparkles, AlertCircle } from 'lucide-react';
import { CartItem, Order, User, Address, UserWallet } from '../types';
import { storage } from '../services/storage';

interface CheckoutPageProps {
  cart: CartItem[];
  currentUser: User | null;
  appliedDiscount: number;
  onOrderSuccess: (order: Order) => void;
  onBackToCart: () => void;
  onNavigateToWallet?: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cart,
  currentUser,
  appliedDiscount,
  onOrderSuccess,
  onBackToCart,
  onNavigateToWallet,
}) => {
  // Customer details form
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '+1 (555) 234-8901');

  // Digital Wallet state
  const [wallet, setWallet] = useState<UserWallet>(() => storage.getWallet(currentUser?.id));
  const [walletError, setWalletError] = useState<string>('');

  // Shipping details form
  const [street, setStreet] = useState('742 Evergreen Terrace, Suite 4B');
  const [city, setCity] = useState('New York');
  const [state, setState] = useState('NY');
  const [postalCode, setPostalCode] = useState('10001');
  const [country, setCountry] = useState('United States');

  useEffect(() => {
    const unsub = storage.subscribe(() => {
      setWallet(storage.getWallet(currentUser?.id));
    });
    return () => unsub();
  }, [currentUser?.id]);

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'Test Card' | 'Cash on Delivery' | 'Demo Pay' | 'CARTIO Wallet'>('CARTIO Wallet');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 150;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const taxableAmount = Math.max(0, subtotal - appliedDiscount);
  const tax = Math.round(taxableAmount * 0.08 * 100) / 100;
  const grandTotal = Math.max(0, subtotal - appliedDiscount) + shipping + tax;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);

    const shippingAddress: Address = {
      id: `addr-${Date.now()}`,
      fullName,
      street,
      city,
      state,
      postalCode,
      country,
      isDefault: true,
    };

    const orderItems = cart.map((c) => ({
      productId: c.productId,
      productName: c.productName,
      brand: c.brand,
      selectedColor: c.selectedColor,
      selectedSize: c.selectedSize,
      price: c.price,
      quantity: c.quantity,
      image: c.image,
      sku: c.sku,
    }));

    // If payment method is CARTIO Wallet, check balance first
    if (paymentMethod === 'CARTIO Wallet') {
      if (wallet.balance < grandTotal) {
        setWalletError(`Insufficient balance in CARTIO Wallet ($${wallet.balance.toFixed(2)}). Need $${grandTotal.toFixed(2)}.`);
        setIsSubmitting(false);
        return;
      }
      setWalletError('');
    }

    setTimeout(() => {
      const createdOrder = storage.createOrder({
        customerId: currentUser?.id || `cust-guest-${Date.now().toString().slice(-4)}`,
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        shippingAddress,
        items: orderItems,
        subtotal,
        shipping,
        tax,
        discount: appliedDiscount,
        total: grandTotal,
        paymentMethod,
        paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
        orderStatus: 'Confirmed',
      });

      // If CARTIO Wallet was used, execute wallet debit + 3% cashback transaction
      if (paymentMethod === 'CARTIO Wallet') {
        storage.payOrderWithWallet(grandTotal, createdOrder.orderNumber);
      }

      // Clear the cart
      storage.clearCart();
      setIsSubmitting(false);
      onOrderSuccess(createdOrder);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 py-8 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="mb-8 border-b border-zinc-200 pb-4">
        <h1 className="font-display text-3xl font-black text-zinc-950">Checkout</h1>
        <p className="text-xs text-zinc-500 mt-1">
          Complete your customer verification and delivery details.
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Information, Shipping, Payment */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Customer Information */}
          <div className="bg-white border border-zinc-200/80 rounded-xl p-6 space-y-4 shadow-xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 flex items-center gap-2 font-display">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-mono">1</span>
              <span>Customer Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Jordan Hayes"
                  className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jordan@example.com"
                  className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                  Phone Number (for Courier Tracking SMS)
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-600"
                />
              </div>
            </div>
          </div>

          {/* 2. Shipping Address */}
          <div className="bg-white border border-zinc-200/80 rounded-xl p-6 space-y-4 shadow-xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 flex items-center gap-2 font-display">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-mono">2</span>
              <span>Delivery Destination</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                  State / Province
                </label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                  Postal Code
                </label>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                  Country
                </label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-red-600"
                />
              </div>
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="bg-white border border-zinc-200/80 rounded-xl p-6 space-y-4 shadow-xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 flex items-center gap-2 font-display">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-mono">3</span>
              <span>Payment Option</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('CARTIO Wallet')}
                className={`p-3.5 rounded-lg border text-left flex items-start gap-3 transition-all relative overflow-hidden ${
                  paymentMethod === 'CARTIO Wallet'
                    ? 'border-red-600 bg-red-50 text-red-700 ring-1 ring-red-600'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100'
                }`}
              >
                <Wallet className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-zinc-950">CARTIO Wallet</p>
                    <span className="text-[9px] uppercase font-black px-1.5 py-0.2 rounded bg-amber-400 text-zinc-950">3% BACK</span>
                  </div>
                  <p className="text-[11px] font-mono text-zinc-600 mt-0.5 font-bold">
                    Bal: ${wallet.balance.toFixed(2)}
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Test Card')}
                className={`p-3.5 rounded-lg border text-left flex items-start gap-3 transition-all ${
                  paymentMethod === 'Test Card'
                    ? 'border-red-600 bg-red-50 text-red-700 ring-1 ring-red-600'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100'
                }`}
              >
                <CreditCard className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-zinc-950">Safe Test Card</p>
                  <p className="text-[11px] text-zinc-500">Instant demo verification</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Cash on Delivery')}
                className={`p-3.5 rounded-lg border text-left flex items-start gap-3 transition-all ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'border-red-600 bg-red-50 text-red-700 ring-1 ring-red-600'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100'
                }`}
              >
                <Banknote className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-zinc-950">Cash on Delivery</p>
                  <p className="text-[11px] text-zinc-500">Pay on arrival</p>
                </div>
              </button>
            </div>

            {/* If CARTIO Wallet Selected */}
            {paymentMethod === 'CARTIO Wallet' && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-[#1b0809] border border-red-950 text-white space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-white uppercase tracking-wider text-[11px]">Instant Wallet Settlement</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-bold">
                    {wallet.walletNumber}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-zinc-950/70 p-3 rounded-lg border border-zinc-800">
                  <div>
                    <p className="text-[10px] text-zinc-400 uppercase">Available Wallet Balance</p>
                    <p className="text-lg font-black font-mono-numbers text-white">${wallet.balance.toFixed(2)} USD</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-emerald-400 font-bold uppercase">Estimated VIP Cashback</p>
                    <p className="text-sm font-bold font-mono-numbers text-emerald-300">+${(grandTotal * 0.03).toFixed(2)}</p>
                  </div>
                </div>

                {wallet.balance < grandTotal && (
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-red-950/50 border border-red-800 text-red-200 text-xs">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>Balance too low (${wallet.balance.toFixed(2)} &lt; ${grandTotal.toFixed(2)}).</span>
                    </div>
                    {onNavigateToWallet && (
                      <button
                        type="button"
                        onClick={onNavigateToWallet}
                        className="underline font-bold text-white hover:text-amber-300 ml-2 shrink-0 cursor-pointer"
                      >
                        Add Funds
                      </button>
                    )}
                  </div>
                )}

                {walletError && (
                  <p className="text-xs text-red-400 font-medium">{walletError}</p>
                )}
              </div>
            )}

            {paymentMethod === 'Test Card' && (
              <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 space-y-3">
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span className="text-[11px] uppercase tracking-wider font-semibold">Test Gateway Credentials</span>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                    <Lock className="w-3 h-3" />
                    <span>256-Bit TLS Encrypted</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-xs font-mono text-zinc-900 focus:outline-none focus:border-red-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-600 mb-1">Expires</label>
                    <input
                      type="text"
                      value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-xs font-mono text-zinc-900 focus:outline-none focus:border-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-600 mb-1">CVC Security Code</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-xs font-mono text-zinc-900 focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Placement */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-zinc-200/80 rounded-xl p-6 space-y-5 sticky top-24 shadow-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-3 font-display">
              Order Review ({cart.reduce((s, i) => s + i.quantity, 0)} items)
            </h2>

            {/* Cart item recap */}
            <div className="max-h-60 overflow-y-auto divide-y divide-zinc-200 space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-b from-[#f8f8fb] to-[#ededf2] border border-zinc-200/90 rounded-xl p-1.5 shrink-0 overflow-hidden flex items-center justify-center shadow-xs">
                    <img src={item.image} alt={item.productName} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 text-xs">
                    <p className="font-semibold text-zinc-950 line-clamp-1">{item.productName}</p>
                    <p className="text-[11px] text-zinc-500">
                      {item.selectedColor} · {item.selectedSize} × {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-bold font-mono-numbers text-zinc-950">
                    ${item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Price lines */}
            <div className="space-y-2 text-xs pt-3 border-t border-zinc-200">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span className="text-zinc-950 font-bold font-mono-numbers">${subtotal}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Applied Promo Discount</span>
                  <span className="font-mono-numbers">-${appliedDiscount}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-600">
                <span>Air Freight Express</span>
                <span className="text-zinc-950 font-bold font-mono-numbers">
                  {shipping === 0 ? <span className="text-emerald-700 font-semibold">Complimentary</span> : `$${shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Sales Tax (8%)</span>
                <span className="text-zinc-950 font-bold font-mono-numbers">${tax}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-zinc-950 pt-3 border-t border-zinc-200">
                <span className="font-display">Grand Total</span>
                <span className="text-red-600 font-mono-numbers font-black">${grandTotal}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md shadow-red-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Authorizing Order...</span>
              ) : (
                <>
                  <span>Place Order (${grandTotal})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onBackToCart}
              className="w-full text-center text-xs text-zinc-500 hover:text-zinc-950 transition-colors font-medium"
            >
              Modify Bag
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
