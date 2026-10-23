/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { CartDrawer } from './components/CartDrawer';
import { CustomerSupportWidget } from './components/CustomerSupportWidget';
import { SizeGuideModal } from './components/SizeGuideModal';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { CustomerDashboard } from './pages/dashboards/CustomerDashboard';
import { AdminDashboard } from './pages/dashboards/AdminDashboard';
import { CybersecurityDashboard } from './pages/dashboards/CybersecurityDashboard';
import { DataAnalystDashboard } from './pages/dashboards/DataAnalystDashboard';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

import { storage } from './services/storage';
import { authService } from './services/authService';
import { Product, Order, User, CartItem, Role, VulnerabilityItem, ScanRecord } from './types';
import { ShieldAlert, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [activeView, setActiveView] = useState<string>('home');
  const [viewParams, setViewParams] = useState<any>({});
  const [selectedProductId, setSelectedProductId] = useState<string>('prod-01');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);

  // Modals & Drawers
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialEmail, setAuthModalInitialEmail] = useState<string>('');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isGlobalSizeGuideOpen, setIsGlobalSizeGuideOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Core Data States
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [vulnerabilities, setVulnerabilities] = useState<VulnerabilityItem[]>([]);

  // Initial load & subscribe to storage updates
  useEffect(() => {
    refreshAllData();

    const unsubscribe = storage.subscribe(() => {
      refreshAllData();
    });

    return () => unsubscribe();
  }, []);

  const refreshAllData = () => {
    setCurrentUser(authService.getCurrentUser());
    setProducts(storage.getProducts());
    setOrders(storage.getOrders());
    setCart(storage.getCart());
    setWishlist(storage.getWishlist());
    setScans(storage.getScans());
    setVulnerabilities(storage.getVulnerabilities());
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleNavigate = (view: string, params: any = {}) => {
    setActiveView(view);
    setViewParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setActiveView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleWishlist = (productId: string) => {
    const isAdded = storage.toggleWishlist(productId);
    showToast(isAdded ? 'Added to wishlist' : 'Removed from wishlist');
    setWishlist(storage.getWishlist());
  };

  const handleAddToCart = (item: {
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
  }) => {
    const cartItemId = `${item.productId}-${item.selectedColor}-${item.selectedSize}`;
    storage.addToCart({
      id: cartItemId,
      ...item,
    });
    setCart(storage.getCart());
    setIsCartDrawerOpen(true);
    showToast(`Added ${item.productName} (${item.selectedColor}) to bag`);
  };

  const handleBuyNow = (item: {
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
  }) => {
    const cartItemId = `${item.productId}-${item.selectedColor}-${item.selectedSize}`;
    storage.addToCart({
      id: cartItemId,
      ...item,
    });
    setCart(storage.getCart());
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickAdd = (product: Product, colorName: string, size: string) => {
    const colorObj = product.colors.find((c) => c.name === colorName) || product.colors[0];
    const variantObj = product.variants.find((v) => v.color === colorName && v.size === size);
    const stock = variantObj?.stock || product.stock;

    if (stock <= 0) {
      showToast('This size variant is currently out of stock.');
      return;
    }

    handleAddToCart({
      productId: product.id,
      productName: product.name,
      brand: product.brand,
      selectedColor: colorName,
      selectedSize: size,
      price: product.salePrice || product.price,
      quantity: 1,
      image: colorObj.image,
      maxStock: stock,
      sku: variantObj?.sku || `${product.sku}-${colorName}-${size}`,
    });
  };

  const handleUpdateCartQuantity = (id: string, qty: number) => {
    storage.updateCartQuantity(id, qty);
    setCart(storage.getCart());
  };

  const handleRemoveFromCart = (id: string) => {
    storage.removeFromCart(id);
    setCart(storage.getCart());
    showToast('Item removed from shopping bag');
  };

  const handleClearCart = () => {
    storage.clearCart();
    setCart([]);
    showToast('Bag cleared');
  };

  const handleSwitchDemoRole = (role: Role) => {
    const users = storage.getUsers();
    const targetUser = users.find((u) => u.role === role);

    if (targetUser) {
      authService.setCurrentUser(targetUser);
      setCurrentUser(targetUser);
      if (role === 'cybersecurity') {
        setActiveView('cyber-dashboard');
      } else if (role === 'admin') {
        setActiveView('admin-dashboard');
      } else if (role === 'data_analyst') {
        setActiveView('analyst-dashboard');
      } else {
        setActiveView('home');
      }
      showToast(`Switched persona to ${targetUser.name} (${role.replace('_', ' ')})`);
    } else {
      let targetEmail = 'customer@cartio.com';
      if (role === 'admin') targetEmail = 'admin@cartio.com';
      else if (role === 'cybersecurity') targetEmail = 'cyber@cartio.com';
      else if (role === 'data_analyst') targetEmail = 'analyst@cartio.com';
      setAuthModalInitialEmail(targetEmail);
      setIsAuthModalOpen(true);
    }
  };

  const handleOpenAuth = (prefillEmail?: unknown) => {
    const emailStr = typeof prefillEmail === 'string' ? prefillEmail : '';
    setAuthModalInitialEmail(emailStr);
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    showToast('Signed out of CARTIO account');
    setActiveView('home');
  };

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  // Role Access Checker
  const isAuthorized = (requiredRole: Role) => {
    return authService.canAccess(currentUser, requiredRole);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-zinc-800 text-white text-xs font-medium px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Primary Navigation */}
      <Navbar
        currentUser={currentUser}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        wishlistCount={wishlist.length}
        activeView={activeView}
        onNavigate={handleNavigate}
        onOpenCart={() => setIsCartDrawerOpen(true)}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onSwitchDemoRole={handleSwitchDemoRole}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {/* VIEW 1: HOME */}
        {activeView === 'home' && (
          <HomePage
            products={products}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={handleSelectProduct}
            onQuickAdd={handleQuickAdd}
            onNavigate={handleNavigate}
          />
        )}

        {/* VIEW 2: SHOP / CATALOG */}
        {activeView === 'shop' && (
          <ShopPage
            products={products}
            wishlist={wishlist}
            initialCategory={viewParams.category}
            initialBrand={viewParams.brand}
            initialQuery={viewParams.query}
            initialFilter={viewParams.filter}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={handleSelectProduct}
            onQuickAdd={handleQuickAdd}
          />
        )}

        {/* VIEW 3: PRODUCT DETAILS */}
        {activeView === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            allProducts={products}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {/* VIEW 4: CART */}
        {activeView === 'cart' && (
          <CartPage
            cart={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onProceedToCheckout={(discount) => {
              setAppliedDiscount(discount);
              setActiveView('checkout');
            }}
            onContinueShopping={() => setActiveView('shop')}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {/* VIEW 5: CHECKOUT */}
        {activeView === 'checkout' && (
          <CheckoutPage
            cart={cart}
            currentUser={currentUser}
            appliedDiscount={appliedDiscount}
            onOrderSuccess={(order) => {
              setConfirmedOrder(order);
              setActiveView('order-confirmation');
            }}
            onBackToCart={() => setActiveView('cart')}
            onNavigateToWallet={() => handleNavigate('customer-dashboard', { tab: 'wallet' })}
          />
        )}

        {/* VIEW 6: ORDER CONFIRMATION */}
        {activeView === 'order-confirmation' && confirmedOrder && (
          <OrderConfirmationPage order={confirmedOrder} onNavigate={handleNavigate} />
        )}

        {/* VIEW 7: CUSTOMER DASHBOARD */}
        {activeView === 'customer-dashboard' && (
          <CustomerDashboard
            currentUser={currentUser}
            orders={orders}
            products={products}
            wishlist={wishlist}
            initialTab={viewParams.tab || 'overview'}
            onLogout={handleLogout}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {/* VIEW 8: ADMIN DASHBOARD (ROLE-PROTECTED) */}
        {activeView === 'admin-dashboard' && (
          isAuthorized('admin') ? (
            <AdminDashboard products={products} orders={orders} onRefreshData={refreshAllData} />
          ) : (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto">
              <ShieldAlert className="w-12 h-12 text-red-500 mb-4" />
              <h2 className="text-xl font-bold text-zinc-900 mb-2">Restricted Merchant Console</h2>
              <p className="text-xs text-zinc-600 mb-6">
                Your current account ({currentUser?.email || 'Guest'}) does not have administrator privileges.
              </p>
              <button
                onClick={() => handleSwitchDemoRole('admin')}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer"
              >
                Sign In with Admin Credentials
              </button>
            </div>
          )
        )}

        {/* VIEW 9: CYBERSECURITY SCANNER (ROLE-PROTECTED) */}
        {activeView === 'cyber-dashboard' && (
          isAuthorized('cybersecurity') ? (
            <CybersecurityDashboard
              scans={scans}
              vulnerabilities={vulnerabilities}
              onRefreshData={refreshAllData}
            />
          ) : (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto">
              <ShieldAlert className="w-12 h-12 text-emerald-600 mb-4" />
              <h2 className="text-xl font-bold text-zinc-900 mb-2">Authorized Security Testing Clearance Required</h2>
              <p className="text-xs text-zinc-600 mb-6">
                Vulnerability testing consoles require an authenticated cybersecurity analyst role.
              </p>
              <button
                onClick={() => handleSwitchDemoRole('cybersecurity')}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer"
              >
                Sign In with Cybersecurity Credentials
              </button>
            </div>
          )
        )}

        {/* VIEW 10: DATA ANALYST DASHBOARD (ROLE-PROTECTED) */}
        {activeView === 'analyst-dashboard' && (
          isAuthorized('data_analyst') ? (
            <DataAnalystDashboard onRefreshData={refreshAllData} />
          ) : (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto">
              <ShieldAlert className="w-12 h-12 text-amber-600 mb-4" />
              <h2 className="text-xl font-bold text-zinc-900 mb-2">Data Analyst Clearance Required</h2>
              <p className="text-xs text-zinc-600 mb-6">
                Telemetry, dataset processing, and KPI insights are restricted to the data analyst role.
              </p>
              <button
                onClick={() => handleSwitchDemoRole('data_analyst')}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer"
              >
                Sign In with Data Analyst Credentials
              </button>
            </div>
          )
        )}

        {/* INFORMATIONAL PAGES */}
        {activeView === 'about' && <AboutPage />}
        {activeView === 'contact' && <ContactPage />}
        {activeView === 'privacy' && <PrivacyPage />}
        {activeView === 'terms' && <TermsPage />}
      </main>

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        cart={cart}
        onClose={() => setIsCartDrawerOpen(false)}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCheckout={() => {
          setIsCartDrawerOpen(false);
          setActiveView('checkout');
        }}
        onViewProduct={handleSelectProduct}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialEmail={authModalInitialEmail}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setCurrentUser(authService.getCurrentUser());
          showToast('Authentication confirmed');
        }}
      />

      {/* Global Concierge & Support Widget */}
      <CustomerSupportWidget
        onOpenSizeGuide={() => setIsGlobalSizeGuideOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Global Size Guide Modal */}
      <SizeGuideModal
        isOpen={isGlobalSizeGuideOpen}
        onClose={() => setIsGlobalSizeGuideOpen(false)}
      />

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
