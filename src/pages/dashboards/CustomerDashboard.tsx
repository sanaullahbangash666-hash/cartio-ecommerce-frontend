import React, { useState, useEffect } from 'react';
import { ShoppingBag, Package, Heart, MapPin, User, LogOut, ChevronRight, Wallet, Sparkles } from 'lucide-react';
import { User as UserType, Order, Product, UserWallet } from '../../types';
import { DigitalWalletView } from '../../components/DigitalWalletView';
import { storage } from '../../services/storage';

interface CustomerDashboardProps {
  currentUser: UserType | null;
  orders: Order[];
  products: Product[];
  wishlist: string[];
  initialTab?: string;
  onLogout: () => void;
  onSelectProduct: (id: string) => void;
  onNavigate: (view: string, params?: any) => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  currentUser,
  orders,
  products,
  wishlist,
  initialTab = 'overview',
  onLogout,
  onSelectProduct,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [profileSaved, setProfileSaved] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Filter orders belonging to this user
  const userOrders = orders.filter(
    (o) => o.customerEmail.toLowerCase() === currentUser?.email.toLowerCase() || o.customerId === currentUser?.id
  );

  const pendingCount = userOrders.filter((o) => o.orderStatus === 'Pending' || o.orderStatus === 'Processing' || o.orderStatus === 'Confirmed').length;
  const completedCount = userOrders.filter((o) => o.orderStatus === 'Delivered').length;
  const totalSpent = userOrders.reduce((sum, o) => sum + o.total, 0);

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));
  const [wallet, setWallet] = useState<UserWallet>(() => storage.getWallet(currentUser?.id));

  useEffect(() => {
    const unsub = storage.subscribe(() => {
      setWallet(storage.getWallet(currentUser?.id));
    });
    return () => unsub();
  }, [currentUser?.id]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 py-8 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Top Profile Banner */}
      <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-red-100 border border-red-200 flex items-center justify-center text-red-600 font-bold text-xl font-display">
            {currentUser?.name?.charAt(0) || 'C'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-xl sm:text-2xl font-black text-zinc-950">{currentUser?.name || 'Customer Account'}</h1>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-zinc-200 text-zinc-800">
                Collector Tier
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">{currentUser?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs border-t md:border-t-0 md:border-l border-zinc-200 pt-4 md:pt-0 md:pl-8">
          {/* Quick Wallet Balance Pill */}
          <button
            onClick={() => setActiveTab('wallet')}
            className="text-left group cursor-pointer"
          >
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-red-600">
              <Wallet className="w-3.5 h-3.5" />
              <span>CARTIO Wallet</span>
            </div>
            <p className="text-lg font-bold text-zinc-950 font-mono-numbers group-hover:text-red-600 transition-colors">
              ${wallet.balance.toFixed(2)}
            </p>
          </button>
          <div>
            <p className="text-[10px] uppercase font-bold text-zinc-500">Total Orders</p>
            <p className="text-lg font-bold text-zinc-950 font-mono-numbers">{userOrders.length}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-zinc-500">In Transit</p>
            <p className="text-lg font-bold text-amber-600 font-mono-numbers">{pendingCount}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-zinc-500">Total Spent</p>
            <p className="text-lg font-bold text-emerald-700 font-mono-numbers">${totalSpent.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Tabs + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3 space-y-1 bg-white border border-zinc-200/80 rounded-xl p-3 h-fit shadow-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'overview' ? 'bg-red-600 text-white' : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'wallet' ? 'bg-red-600 text-white' : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Wallet className="w-4 h-4 text-amber-500" />
              <span>Digital Wallet</span>
            </div>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${activeTab === 'wallet' ? 'bg-red-700 text-white' : 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold'}`}>
              ${wallet.balance.toFixed(0)}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'orders' ? 'bg-red-600 text-white' : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4" />
              <span>My Orders</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-200 text-zinc-800">
              {userOrders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'wishlist' ? 'bg-red-600 text-white' : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Heart className="w-4 h-4" />
              <span>Wishlist</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-200 text-zinc-800">
              {wishlistedProducts.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'addresses' ? 'bg-red-600 text-white' : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'profile' ? 'bg-red-600 text-white' : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Account Profile</span>
          </button>

          <div className="pt-2 border-t border-zinc-200">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs text-red-600 hover:bg-red-50 transition-colors font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-9">
          {/* TAB: DIGITAL WALLET */}
          {activeTab === 'wallet' && (
            <DigitalWalletView
              currentUser={currentUser}
              onNavigateToShop={() => onNavigate('shop')}
              onNavigateToOrders={() => setActiveTab('orders')}
            />
          )}

          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Total Orders Placed</p>
                  <p className="text-2xl font-black text-zinc-950 mt-1 font-mono-numbers">{userOrders.length}</p>
                  <p className="text-[11px] text-zinc-500 mt-1">Verified on CARTIO platform</p>
                </div>
                <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">In Production / Transit</p>
                  <p className="text-2xl font-black text-amber-600 mt-1 font-mono-numbers">{pendingCount}</p>
                  <p className="text-[11px] text-zinc-500 mt-1">Active tracking numbers assigned</p>
                </div>
                <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Delivered Shipments</p>
                  <p className="text-2xl font-black text-emerald-700 mt-1 font-mono-numbers">{completedCount}</p>
                  <p className="text-[11px] text-zinc-500 mt-1">100% authenticity certified</p>
                </div>
              </div>

              {/* Recent Orders Table */}
              <div className="bg-white border border-zinc-200/80 rounded-xl p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 font-display">Recent Orders</h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-red-600 hover:text-red-700 font-semibold"
                  >
                    View all ({userOrders.length})
                  </button>
                </div>

                {userOrders.length === 0 ? (
                  <div className="text-center py-8 text-zinc-400 text-xs">
                    No orders placed yet. Start your collection in the catalog.
                  </div>
                ) : (
                  <div className="divide-y divide-zinc-200">
                    {userOrders.slice(0, 3).map((o) => (
                      <div key={o.id} className="py-4 first:pt-0 flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs text-zinc-950">{o.orderNumber}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-100 text-zinc-700 border border-zinc-200">
                              {o.orderStatus}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-500 mt-1">
                            {o.items.map((i) => `${i.productName} (${i.selectedColor})`).join(', ')}
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-xs font-bold font-mono-numbers text-zinc-950">
                            ${o.total}
                          </span>
                          <button
                            onClick={() => {
                              setSelectedOrder(o);
                              setActiveTab('orders');
                            }}
                            className="p-1.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: MY ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {selectedOrder ? (
                <div className="bg-white border border-zinc-200/80 rounded-xl p-6 space-y-6 shadow-xs">
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                    <div>
                      <button
                        onClick={() => setSelectedOrder(null)}
                        className="text-xs text-zinc-500 hover:text-zinc-950 mb-2 font-medium"
                      >
                        ← Back to all orders
                      </button>
                      <h3 className="font-display text-xl font-bold text-zinc-950">
                        Order #{selectedOrder.orderNumber}
                      </h3>
                      <p className="text-xs text-zinc-500 font-mono">
                        Placed on {new Date(selectedOrder.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="px-3 py-1 rounded text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                        {selectedOrder.orderStatus}
                      </span>
                      <p className="text-[11px] text-zinc-500 font-mono mt-1">Tracking: {selectedOrder.trackingNumber}</p>
                    </div>
                  </div>

                  {/* Order Progress Stepper */}
                  <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-3 font-display">
                      Shipment Status Progression
                    </p>
                    <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                      <div className="space-y-1">
                        <div className="w-3 h-3 rounded-full bg-emerald-600 mx-auto" />
                        <span className="font-bold text-zinc-900">Confirmed</span>
                      </div>
                      <div className="space-y-1">
                        <div className="w-3 h-3 rounded-full bg-emerald-600 mx-auto" />
                        <span className="font-bold text-zinc-900">Inspected</span>
                      </div>
                      <div className="space-y-1">
                        <div className={`w-3 h-3 rounded-full mx-auto ${selectedOrder.orderStatus === 'Shipped' || selectedOrder.orderStatus === 'Delivered' ? 'bg-emerald-600' : 'bg-zinc-300'}`} />
                        <span className={selectedOrder.orderStatus === 'Shipped' || selectedOrder.orderStatus === 'Delivered' ? 'font-bold text-zinc-900' : 'text-zinc-400'}>In Flight</span>
                      </div>
                      <div className="space-y-1">
                        <div className={`w-3 h-3 rounded-full mx-auto ${selectedOrder.orderStatus === 'Delivered' ? 'bg-emerald-600' : 'bg-zinc-300'}`} />
                        <span className={selectedOrder.orderStatus === 'Delivered' ? 'font-bold text-zinc-900' : 'text-zinc-400'}>Delivered</span>
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="divide-y divide-zinc-200">
                    {selectedOrder.items.map((i, idx) => (
                      <div key={idx} className="py-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-b from-[#f8f8fb] to-[#ededf2] border border-zinc-200/90 rounded-xl p-1.5 overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
                            <img src={i.image} alt={i.productName} className="w-full h-full object-contain" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-zinc-950">{i.productName}</p>
                            <p className="text-[11px] text-zinc-500">
                              {i.selectedColor} · Size {i.selectedSize} · Qty {i.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-bold font-mono-numbers text-zinc-950">
                          ${i.price * i.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-zinc-200/80 rounded-xl divide-y divide-zinc-200 overflow-hidden shadow-xs">
                  <div className="p-5 border-b border-zinc-200">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 font-display">All Orders ({userOrders.length})</h3>
                  </div>

                  {userOrders.map((o) => (
                    <div key={o.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-zinc-50/50">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-sm text-zinc-950">{o.orderNumber}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-100 text-zinc-800 border border-zinc-200">
                            {o.orderStatus}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-1">
                          {o.items.length} item{o.items.length > 1 ? 's' : ''} · Placed {new Date(o.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-sm font-bold font-mono-numbers text-zinc-950">
                          ${o.total}
                        </span>
                        <button
                          onClick={() => setSelectedOrder(o)}
                          className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-semibold rounded-lg border border-zinc-300"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 font-display">My Saved Silhouettes</h3>
              {wishlistedProducts.length === 0 ? (
                <div className="p-8 text-center text-zinc-400 text-xs bg-zinc-50 rounded-xl border border-zinc-200">
                  Your wishlist is empty. Tap the heart icon on any sneaker to save it here.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlistedProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => onSelectProduct(p.id)}
                      className="p-4 bg-white border border-zinc-200/80 rounded-xl cursor-pointer hover:border-zinc-400 transition-all group shadow-xs hover:shadow-md"
                    >
                      <div className="aspect-[4/3] bg-gradient-to-b from-[#f8f8fb] to-[#ededf2] border border-zinc-200/90 rounded-xl mb-3 p-3 flex items-center justify-center overflow-hidden shadow-xs">
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain group-hover:scale-106 transition-transform" />
                      </div>
                      <p className="text-[10px] uppercase font-bold text-zinc-500 font-display">{p.brand}</p>
                      <h4 className="text-xs font-semibold text-zinc-950 group-hover:text-red-600 line-clamp-1">{p.name}</h4>
                      <p className="text-xs font-bold text-zinc-950 font-mono-numbers mt-2">${p.salePrice || p.price}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="bg-white border border-zinc-200/80 rounded-xl p-6 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 font-display">Saved Delivery Addresses</h3>
              <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-xs text-zinc-950">Default Residence</p>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Primary
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                    Marcus Vance<br />
                    742 Evergreen Terrace, Apt 4B<br />
                    New York, NY 10001, United States<br />
                    +1 (555) 234-8901
                  </p>
                </div>
                <button className="text-xs text-red-600 hover:text-red-700 font-semibold">Edit</button>
              </div>
            </div>
          )}

          {/* TAB: PROFILE */}
          {activeTab === 'profile' && (
            <div className="bg-white border border-zinc-200/80 rounded-xl p-6 space-y-4 max-w-xl shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 font-display">Collector Profile Information</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-600 block mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue={currentUser?.name}
                    className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-zinc-900 focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-600 block mb-1">Email Address</label>
                  <input
                    type="email"
                    disabled
                    defaultValue={currentUser?.email}
                    className="w-full bg-zinc-100 border border-zinc-200 rounded-lg px-3 py-2 text-zinc-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-600 block mb-1">Phone</label>
                  <input
                    type="tel"
                    defaultValue={currentUser?.phone || '+1 (555) 234-8901'}
                    className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-zinc-900 focus:outline-none focus:border-red-600"
                  />
                </div>
                {profileSaved && (
                  <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                    ✓ Profile credentials updated successfully.
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setProfileSaved(true);
                    setTimeout(() => setProfileSaved(false), 3000);
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg mt-2 shadow-sm cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
