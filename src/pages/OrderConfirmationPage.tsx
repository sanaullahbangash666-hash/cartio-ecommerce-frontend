import React from 'react';
import { CheckCircle2, Package, Truck, ArrowRight, ShoppingBag, Download } from 'lucide-react';
import { Order } from '../types';

interface OrderConfirmationPageProps {
  order: Order;
  onNavigate: (view: string, params?: any) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ order, onNavigate }) => {
  return (
    <div className="min-h-screen bg-white text-zinc-900 py-12 px-4 sm:px-8 max-w-4xl mx-auto">
      {/* Success Banner */}
      <div className="text-center space-y-4 mb-10">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 font-display">
          Order Verified & In Production
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-zinc-950">
          Thank you, {order.customerName.split(' ')[0]}!
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
          Your order has been recorded in the database. A shipment notification will be dispatched once our specialists complete physical authenticity inspection.
        </p>
      </div>

      {/* Order Identity Card */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-200">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Order Number</p>
            <p className="text-base font-bold font-mono text-zinc-950 mt-0.5">{order.orderNumber}</p>
          </div>

          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Air Waybill / Tracking</p>
            <p className="text-xs font-mono text-red-600 font-bold mt-0.5">{order.trackingNumber}</p>
          </div>

          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Payment Status</p>
            <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {order.paymentStatus} ({order.paymentMethod})
            </span>
          </div>

          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Order Status</p>
            <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded text-[11px] font-bold bg-zinc-100 text-zinc-800 border border-zinc-200">
              {order.orderStatus}
            </span>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 font-display">
            Selected Silhouettes ({order.items.length})
          </h3>
          <div className="divide-y divide-zinc-200">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-4 first:pt-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-b from-[#f8f8fb] to-[#ededf2] border border-zinc-200/90 rounded-2xl p-1.5 overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
                    <img src={item.image} alt={item.productName} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{item.brand}</span>
                    <h4 className="text-sm font-semibold text-zinc-950">{item.productName}</h4>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {item.selectedColor} · Size {item.selectedSize} · Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold font-mono-numbers text-zinc-950">
                  ${item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Address & Financial Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-zinc-200 text-xs">
          <div>
            <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-[11px] mb-2 font-display">
              Shipment Destination
            </h4>
            <div className="text-zinc-600 space-y-0.5 leading-relaxed">
              <p className="text-zinc-950 font-semibold">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
              <p>{order.shippingAddress.country}</p>
              <p className="text-[11px] text-zinc-500 pt-1 font-mono">{order.customerPhone}</p>
            </div>
          </div>

          <div className="bg-zinc-50 p-4 rounded-xl space-y-2 border border-zinc-200">
            <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-[11px] mb-2 font-display">
              Receipt Breakdown
            </h4>
            <div className="flex justify-between text-zinc-600">
              <span>Subtotal</span>
              <span className="text-zinc-950 font-bold font-mono-numbers">${order.subtotal}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Discount</span>
                <span className="font-mono-numbers">-${order.discount}</span>
              </div>
            )}
            <div className="flex justify-between text-zinc-600">
              <span>Shipping</span>
              <span className="text-zinc-950 font-bold font-mono-numbers">
                {order.shipping === 0 ? 'Complimentary' : `$${order.shipping}`}
              </span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span>Tax</span>
              <span className="text-zinc-950 font-bold font-mono-numbers">${order.tax}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-zinc-950 pt-2 border-t border-zinc-200">
              <span className="font-display">Total Paid</span>
              <span className="text-red-600 font-mono-numbers font-black">${order.total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => onNavigate('customer-dashboard', { tab: 'orders' })}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md shadow-red-600/20 flex items-center gap-2 transition-all"
        >
          <Package className="w-4 h-4" />
          <span>Track in Customer Portal</span>
        </button>

        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-3 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-900 text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-2 transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>
    </div>
  );
};
