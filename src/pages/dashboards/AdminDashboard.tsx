import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Tag,
  Boxes,
  Plus,
  Edit2,
  Trash2,
  ArrowUpRight,
  Search,
  X,
  Save,
} from 'lucide-react';
import { Product, Order, OrderStatus } from '../../types';
import { storage } from '../../services/storage';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  onRefreshData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, orders, onRefreshData }) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'products' | 'orders' | 'inventory' | 'customers' | 'discounts'>('overview');

  // Product editor modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Form states for add/edit product
  const [formName, setFormName] = useState('');
  const [formBrand, setFormBrand] = useState('CARTIO LAB');
  const [formCategory, setFormCategory] = useState<Product['category']>('Running');
  const [formDescription, setFormDescription] = useState('');
  const [formPrice, setFormPrice] = useState(220);
  const [formSalePrice, setFormSalePrice] = useState<number | undefined>(undefined);
  const [formStock, setFormStock] = useState(50);
  const [formSku, setFormSku] = useState('CR-NEW-01');
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formIsSale, setFormIsSale] = useState(false);
  const [formIsNewArrival, setFormIsNewArrival] = useState(true);
  const [formIsBestSeller, setFormIsBestSeller] = useState(false);

  // Orders status updater state
  const [orderSearch, setOrderSearch] = useState('');

  // Overview calculations
  const totalSales = orders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' ? o.total : 0), 0) + 18450;
  const pendingOrders = orders.filter((o) => o.orderStatus === 'Pending' || o.orderStatus === 'Processing');
  const lowStockProducts = products.filter((p) => p.stock <= 80);

  const openCreateModal = () => {
    setIsCreatingNew(true);
    setEditingProduct(null);
    setFormName('');
    setFormBrand('CARTIO LAB');
    setFormCategory('Running');
    setFormDescription('Engineered high-performance luxury runner with reactive cushioning.');
    setFormPrice(240);
    setFormSalePrice(undefined);
    setFormStock(60);
    setFormSku(`CR-LAB-${Math.floor(100 + Math.random() * 900)}`);
    setFormIsFeatured(false);
    setFormIsSale(false);
    setFormIsNewArrival(true);
    setFormIsBestSeller(false);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setIsCreatingNew(false);
    setFormName(p.name);
    setFormBrand(p.brand);
    setFormCategory(p.category);
    setFormDescription(p.description);
    setFormPrice(p.price);
    setFormSalePrice(p.salePrice);
    setFormStock(p.stock);
    setFormSku(p.sku);
    setFormIsFeatured(p.isFeatured || false);
    setFormIsSale(p.isSale || false);
    setFormIsNewArrival(p.isNewArrival || false);
    setFormIsBestSeller(p.isBestSeller || false);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProduct) {
      // Update existing
      const updated: Product = {
        ...editingProduct,
        name: formName,
        brand: formBrand,
        category: formCategory,
        description: formDescription,
        price: Number(formPrice),
        salePrice: formSalePrice ? Number(formSalePrice) : undefined,
        stock: Number(formStock),
        sku: formSku,
        isFeatured: formIsFeatured,
        isSale: formIsSale,
        isNewArrival: formIsNewArrival,
        isBestSeller: formIsBestSeller,
        updatedAt: new Date().toISOString(),
      };
      storage.saveProduct(updated);
    } else {
      // Create new product
      const newProduct: Product = {
        id: `prod-admin-${Date.now().toString().slice(-4)}`,
        name: formName,
        brand: formBrand,
        category: formCategory,
        description: formDescription,
        price: Number(formPrice),
        salePrice: formSalePrice ? Number(formSalePrice) : undefined,
        images: [products[0]?.images[0] || ''],
        colors: [
          { name: 'Obsidian Black', hex: '#18181b', image: products[0]?.colors[0]?.image || '' },
          { name: 'Optic White', hex: '#ffffff', image: products[0]?.colors[1]?.image || '' },
        ],
        sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
        variants: [
          { id: `var-${Date.now()}-1`, color: 'Obsidian Black', size: 'US 10', stock: 20, sku: `${formSku}-BLK-10` },
          { id: `var-${Date.now()}-2`, color: 'Optic White', size: 'US 10', stock: 20, sku: `${formSku}-WHT-10` },
        ],
        stock: Number(formStock),
        sku: formSku,
        rating: 5.0,
        reviewsCount: 1,
        tags: ['New Release', 'Admin Created'],
        isFeatured: formIsFeatured,
        isSale: formIsSale,
        isNewArrival: formIsNewArrival,
        isBestSeller: formIsBestSeller,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      storage.saveProduct(newProduct);
    }

    setEditingProduct(null);
    setIsCreatingNew(false);
    onRefreshData();
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to permanently delete this product?')) {
      storage.deleteProduct(id);
      onRefreshData();
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    storage.updateOrderStatus(orderId, newStatus);
    onRefreshData();
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 py-8 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 font-display">Merchant Operations</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-zinc-950 mt-1">Admin Dashboard</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md shadow-red-600/20 flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 mb-8 pb-2 border-b border-zinc-200 text-xs font-semibold">
        <button
          onClick={() => setActiveSection('overview')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shrink-0 ${
            activeSection === 'overview' ? 'bg-red-600 text-white font-bold' : 'text-zinc-600 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveSection('products')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shrink-0 ${
            activeSection === 'products' ? 'bg-red-600 text-white font-bold' : 'text-zinc-600 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Products ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('orders')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shrink-0 ${
            activeSection === 'orders' ? 'bg-red-600 text-white font-bold' : 'text-zinc-600 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('inventory')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shrink-0 ${
            activeSection === 'inventory' ? 'bg-red-600 text-white font-bold' : 'text-zinc-600 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200'
          }`}
        >
          <Boxes className="w-3.5 h-3.5" />
          <span>Inventory Alerts</span>
        </button>

        <button
          onClick={() => setActiveSection('customers')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shrink-0 ${
            activeSection === 'customers' ? 'bg-red-600 text-white font-bold' : 'text-zinc-600 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Customers</span>
        </button>

        <button
          onClick={() => setActiveSection('discounts')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shrink-0 ${
            activeSection === 'discounts' ? 'bg-red-600 text-white font-bold' : 'text-zinc-600 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200'
          }`}
        >
          <Tag className="w-3.5 h-3.5" />
          <span>Discounts & Promotions</span>
        </button>
      </div>

      {/* 1. OVERVIEW SECTION */}
      {activeSection === 'overview' && (
        <div className="space-y-8">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-5 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-display">Gross Sales</span>
              <p className="text-2xl font-black text-emerald-700 font-mono-numbers mt-1">
                ${totalSales.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-emerald-700 mt-2 font-medium">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+14.8% vs last month</span>
              </div>
            </div>

            <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-5 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-display">Total Orders</span>
              <p className="text-2xl font-black text-zinc-950 font-mono-numbers mt-1">{orders.length + 84}</p>
              <p className="text-[11px] text-zinc-500 mt-2">{pendingOrders.length} requiring dispatch</p>
            </div>

            <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-5 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-display">Live Catalog</span>
              <p className="text-2xl font-black text-zinc-950 font-mono-numbers mt-1">{products.length} Models</p>
              <p className="text-[11px] text-zinc-500 mt-2">15 distinct color variations</p>
            </div>

            <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-5 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-display">Stock Alerts</span>
              <p className="text-2xl font-black text-amber-600 font-mono-numbers mt-1">{lowStockProducts.length}</p>
              <p className="text-[11px] text-amber-700 mt-2">Reorder threshold triggered</p>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="bg-white border border-zinc-200/80 rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 font-display">Recent Customer Orders</h3>
              <button
                onClick={() => setActiveSection('orders')}
                className="text-xs text-red-600 hover:text-red-700 font-semibold"
              >
                Manage all orders →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-200 text-zinc-500 uppercase tracking-wider text-[10px]">
                    <th className="pb-3">Order #</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Silhouettes</th>
                    <th className="pb-3">Total</th>
                    <th className="pb-3">Payment</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 text-zinc-700">
                  {orders.slice(0, 5).map((o) => (
                    <tr key={o.id} className="hover:bg-zinc-50/50">
                      <td className="py-3 font-mono font-bold text-zinc-950">{o.orderNumber}</td>
                      <td className="py-3 font-medium text-zinc-900">{o.customerName}</td>
                      <td className="py-3 text-zinc-500">
                        {o.items.map((i) => `${i.productName} (${i.selectedColor})`).join(', ')}
                      </td>
                      <td className="py-3 font-mono font-bold text-zinc-950">${o.total}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          o.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {o.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-100 text-zinc-700 border border-zinc-200">
                          {o.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRODUCTS MANAGEMENT */}
      {activeSection === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 font-display">Catalog Inventory</h3>
            <button
              onClick={openCreateModal}
              className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Product</span>
            </button>
          </div>

          <div className="bg-white border border-zinc-200/80 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-200 text-zinc-500 uppercase tracking-wider text-[10px] bg-zinc-50">
                    <th className="p-4">Silhouette</th>
                    <th className="p-4">Brand / SKU</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Colorways</th>
                    <th className="p-4">Stock Units</th>
                    <th className="p-4">Flags</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 text-zinc-700">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-50/50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-b from-[#f8f8fb] to-[#ededf2] border border-zinc-200/90 rounded-xl p-1 overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
                            <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain" />
                          </div>
                          <div>
                            <p className="font-semibold text-zinc-950">{p.name}</p>
                            <p className="text-[11px] text-zinc-500 font-mono">Rating: {p.rating} ★ ({p.reviewsCount})</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-zinc-950">{p.brand}</p>
                        <p className="font-mono text-zinc-500 text-[10px]">{p.sku}</p>
                      </td>
                      <td className="p-4 font-medium">{p.category}</td>
                      <td className="p-4 font-mono font-bold">
                        {p.salePrice ? (
                          <div>
                            <span className="text-red-600">${p.salePrice}</span>
                            <span className="text-zinc-400 line-through text-[10px] ml-1">${p.price}</span>
                          </div>
                        ) : (
                          <span className="text-zinc-950">${p.price}</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          {p.colors.map((c) => (
                            <span
                              key={c.name}
                              className="w-3.5 h-3.5 rounded-full border border-zinc-300"
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="p-4 font-mono font-bold">
                        <span className={p.stock <= 80 ? 'text-amber-600' : 'text-zinc-950'}>{p.stock}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 text-[9px]">
                          {p.isFeatured && <span className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200">Featured</span>}
                          {p.isSale && <span className="px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-200 font-bold">Sale</span>}
                          {p.isNewArrival && <span className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200">New</span>}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-1.5 text-zinc-500 hover:text-zinc-950 rounded hover:bg-zinc-100"
                            title="Edit product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 text-zinc-400 hover:text-red-600 rounded hover:bg-zinc-100"
                            title="Delete product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. ORDERS MANAGEMENT */}
      {activeSection === 'orders' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 font-display">Customer Orders Management</h3>
            <div className="relative min-w-[240px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search by order ID or customer..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="w-full bg-white border border-zinc-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-600"
              />
            </div>
          </div>

          <div className="bg-white border border-zinc-200/80 rounded-xl divide-y divide-zinc-200 overflow-hidden shadow-xs">
            {orders
              .filter((o) =>
                orderSearch
                  ? o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
                    o.customerName.toLowerCase().includes(orderSearch.toLowerCase())
                  : true
              )
              .map((order) => (
                <div key={order.id} className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-zinc-50/50">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-sm text-zinc-950">{order.orderNumber}</span>
                      <span className="text-xs text-zinc-500 font-mono">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        order.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {order.paymentStatus} ({order.paymentMethod})
                      </span>
                    </div>

                    <p className="text-xs text-zinc-700">
                      <span className="font-semibold text-zinc-950">{order.customerName}</span> · {order.customerEmail} · {order.shippingAddress.city}, {order.shippingAddress.country}
                    </p>

                    <div className="text-[11px] text-zinc-500">
                      {order.items.map((i, idx) => (
                        <span key={idx} className="mr-3">
                          {i.productName} ({i.selectedColor}, {i.selectedSize}) × {i.quantity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-zinc-500">Order Total</p>
                      <p className="text-sm font-bold font-mono-numbers text-zinc-950">${order.total}</p>
                    </div>

                    {/* Change Status Dropdown */}
                    <div className="flex items-center gap-2">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Status:</label>
                      <select
                        value={order.orderStatus}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="bg-white border border-zinc-300 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900 focus:outline-none focus:border-red-600 font-medium"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 4. INVENTORY ALERTS */}
      {activeSection === 'inventory' && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200/80 rounded-xl p-6 shadow-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 mb-4 font-display">Stock Levels & Replenishment Monitor</h3>
            <div className="divide-y divide-zinc-200">
              {products.map((p) => (
                <div key={p.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-b from-[#f8f8fb] to-[#ededf2] border border-zinc-200/90 rounded-xl p-1 overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-zinc-950">{p.name}</p>
                      <p className="text-[10px] font-mono text-zinc-500">SKU: {p.sku}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-zinc-950">{p.stock} units</span>
                      <p className="text-[10px] text-zinc-500">Total in reserve</p>
                    </div>
                    <button
                      onClick={() => {
                        p.stock += 20;
                        storage.saveProduct(p);
                        onRefreshData();
                      }}
                      className="px-3 py-1 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-900 text-xs font-semibold rounded"
                    >
                      +20 Units
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. CUSTOMERS LIST */}
      {activeSection === 'customers' && (
        <div className="bg-white border border-zinc-200/80 rounded-xl p-6 shadow-xs">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 mb-4 font-display">Registered Collector Accounts</h3>
          <div className="divide-y divide-zinc-200 text-xs text-zinc-700">
            {storage.getUsers().map((u) => (
              <div key={u.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-zinc-950">{u.name}</p>
                  <p className="text-[11px] font-mono text-zinc-500">{u.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-zinc-100 text-zinc-800 border border-zinc-200">
                    {u.role.replace('_', ' ')}
                  </span>
                  <span className="text-zinc-500 text-[10px] font-mono">
                    Member since {new Date(u.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. DISCOUNTS */}
      {activeSection === 'discounts' && (
        <div className="bg-white border border-zinc-200/80 rounded-xl p-6 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 font-display">Active Promotional Codes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-200 space-y-1">
              <span className="font-mono font-bold text-sm text-red-600">CARTIO20</span>
              <p className="text-zinc-950 font-medium">20% off all silhouettes</p>
              <p className="text-[11px] text-zinc-500">Unrestricted promotional campaign</p>
            </div>
            <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-200 space-y-1">
              <span className="font-mono font-bold text-sm text-red-600">WELCOME10</span>
              <p className="text-zinc-950 font-medium">10% first customer acquisition bonus</p>
              <p className="text-[11px] text-zinc-500">First-time checkout bonus</p>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL */}
      {(editingProduct || isCreatingNew) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-zinc-200 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 text-xs text-zinc-700 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-6">
              <h3 className="font-display text-lg font-bold text-zinc-950">
                {isCreatingNew ? 'Add New Sneaker to Catalog' : `Edit Silhouette: ${editingProduct?.name}`}
              </h3>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsCreatingNew(false);
                }}
                className="p-1 text-zinc-400 hover:text-zinc-950"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-zinc-900 focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 mb-1">Brand Atelier</label>
                  <select
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-zinc-900 focus:outline-none focus:border-red-600"
                  >
                    <option value="CARTIO LAB">CARTIO LAB</option>
                    <option value="CARTIO Retro">CARTIO Retro</option>
                    <option value="Kuro Noir">Kuro Noir</option>
                    <option value="Apex Tech">Apex Tech</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as Product['category'])}
                    className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-zinc-900 focus:outline-none focus:border-red-600"
                  >
                    <option value="Running">Running</option>
                    <option value="Streetwear">Streetwear</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Retro">Retro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 mb-1">Product Description</label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-zinc-900 focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 mb-1">Base Price ($)</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-zinc-900 focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 mb-1">Sale Price ($)</label>
                  <input
                    type="number"
                    placeholder="Leave blank if not on sale"
                    value={formSalePrice || ''}
                    onChange={(e) => setFormSalePrice(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-zinc-900 focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 mb-1">Stock Reserve</label>
                  <input
                    type="number"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-zinc-900 focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 mb-1">SKU Identifier</label>
                <input
                  type="text"
                  required
                  value={formSku}
                  onChange={(e) => setFormSku(e.target.value)}
                  className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-zinc-900 font-mono focus:outline-none focus:border-red-600"
                />
              </div>

              {/* Promotional Flags */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsFeatured}
                    onChange={(e) => setFormIsFeatured(e.target.checked)}
                    className="accent-red-600 rounded"
                  />
                  <span>Featured</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsSale}
                    onChange={(e) => setFormIsSale(e.target.checked)}
                    className="accent-red-600 rounded"
                  />
                  <span>Sale Drop</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsNewArrival}
                    onChange={(e) => setFormIsNewArrival(e.target.checked)}
                    className="accent-red-600 rounded"
                  />
                  <span>New Arrival</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsBestSeller}
                    onChange={(e) => setFormIsBestSeller(e.target.checked)}
                    className="accent-red-600 rounded"
                  />
                  <span>Best Seller</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setIsCreatingNew(false);
                  }}
                  className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-lg hover:bg-zinc-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg flex items-center gap-1.5 shadow-md shadow-red-600/20"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Product</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
