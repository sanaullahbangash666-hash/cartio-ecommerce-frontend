import React, { useState, useMemo, useEffect } from 'react';
import { Filter, SlidersHorizontal, Search, RotateCcw, X, Sparkles, Check, Flame, Tag } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';

interface ShopPageProps {
  products: Product[];
  wishlist: string[];
  initialCategory?: string;
  initialBrand?: string;
  initialQuery?: string;
  initialFilter?: string;
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (productId: string) => void;
  onQuickAdd: (product: Product, colorName: string, size: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  wishlist,
  initialCategory,
  initialBrand,
  initialQuery,
  initialFilter,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory === 'Retro' ? 'Retro Classics' : initialCategory || 'All'
  );
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand || 'All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(350);
  const [onlySale, setOnlySale] = useState<boolean>(initialFilter === 'sale');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>(
    initialFilter === 'best' ? 'best_seller' : initialFilter === 'new' ? 'newest' : 'featured'
  );
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Quick View Modal State
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Synchronize when parent navigation params change
  useEffect(() => {
    if (initialCategory !== undefined) {
      setSelectedCategory(initialCategory === 'Retro' ? 'Retro Classics' : initialCategory || 'All');
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialBrand !== undefined) {
      setSelectedBrand(initialBrand || 'All');
    }
  }, [initialBrand]);

  useEffect(() => {
    if (initialQuery !== undefined) {
      setSearchQuery(initialQuery || '');
    }
  }, [initialQuery]);

  useEffect(() => {
    if (initialFilter === 'sale') {
      setOnlySale(true);
    } else if (initialFilter === 'best') {
      setSortBy('best_seller');
    } else if (initialFilter === 'new') {
      setSortBy('newest');
    }
  }, [initialFilter]);

  // Available filter options
  const categories = ['All', 'Streetwear', 'Retro Classics', 'New Arrivals', 'Running', 'Basketball', 'Lifestyle'];
  const brands = ['All', 'CARTIO LAB', 'CARTIO Retro', 'Kuro Noir', 'Apex Tech'];
  const colors = ['All', 'Crimson', 'Black', 'White', 'Sail'];
  const sizes = ['All', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'];

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSelectedColor('All');
    setSelectedSize('All');
    setMaxPrice(350);
    setOnlySale(false);
    setOnlyInStock(false);
    setSortBy('featured');
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category / Collection
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Retro Classics' || selectedCategory === 'Retro') {
        result = result.filter(
          (p) => p.category === 'Retro' || p.tags.some((t) => t.toLowerCase().includes('retro'))
        );
      } else if (selectedCategory === 'Streetwear') {
        result = result.filter(
          (p) => p.category === 'Streetwear' || p.tags.some((t) => t.toLowerCase().includes('streetwear'))
        );
      } else if (selectedCategory === 'New Arrivals') {
        result = result.filter((p) => p.isNewArrival);
      } else {
        result = result.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
      }
    }

    // Brand
    if (selectedBrand !== 'All') {
      result = result.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    // Color
    if (selectedColor !== 'All') {
      result = result.filter((p) =>
        p.colors.some((c) => c.name.toLowerCase().includes(selectedColor.toLowerCase()))
      );
    }

    // Size
    if (selectedSize !== 'All') {
      result = result.filter((p) => p.sizes.includes(selectedSize));
    }

    // Price
    result = result.filter((p) => {
      const currentPrice = p.salePrice || p.price;
      return currentPrice <= maxPrice;
    });

    // Sale filter
    if (onlySale) {
      result = result.filter((p) => p.isSale);
    }

    // In stock filter
    if (onlyInStock) {
      result = result.filter((p) => p.stock > 0);
    }

    // Sorting
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price_desc':
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'best_seller':
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategory, selectedBrand, selectedColor, selectedSize, maxPrice, onlySale, onlyInStock, sortBy]);

  // Counts for top quick filter pills
  const totalCount = products.length;
  const streetwearCount = products.filter(
    (p) => p.category === 'Streetwear' || p.tags.some((t) => t.toLowerCase().includes('streetwear'))
  ).length;
  const retroCount = products.filter(
    (p) => p.category === 'Retro' || p.tags.some((t) => t.toLowerCase().includes('retro'))
  ).length;
  const newArrivalsCount = products.filter((p) => p.isNewArrival).length;
  const runningCount = products.filter((p) => p.category === 'Running').length;
  const saleCount = products.filter((p) => p.isSale).length;

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedBrand !== 'All' ||
    selectedColor !== 'All' ||
    selectedSize !== 'All' ||
    maxPrice < 350 ||
    onlySale ||
    onlyInStock;

  return (
    <div className="min-h-screen bg-white text-zinc-900 py-8 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onToggleWishlist={onToggleWishlist}
        onSelectProduct={onSelectProduct}
        onAddToCart={(item) => onQuickAdd(quickViewProduct!, item.selectedColor, item.selectedSize)}
      />

      {/* Top Header */}
      <div className="mb-6 border-b border-zinc-200/80 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-red-600">
                Official Atelier Footwear
              </span>
              <span className="text-zinc-300">·</span>
              <span className="text-xs text-zinc-500 font-medium">HCI Verified Catalog</span>
            </div>
            <h1 className="font-display text-3xl font-black text-zinc-950">
              The Footwear Catalog
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Showing <span className="font-bold text-zinc-900 font-mono-numbers">{filteredProducts.length}</span> of{' '}
              <span className="font-bold text-zinc-900 font-mono-numbers">{totalCount}</span> curated silhouettes
            </p>
          </div>

          {/* Search + Mobile Filter Trigger + Sort */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search models, tags, soles..."
                className="w-full bg-white border border-zinc-300 rounded-xl pl-9 pr-8 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-zinc-700 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-3.5 py-2 bg-zinc-100 border border-zinc-300 rounded-xl text-xs font-semibold text-zinc-900 flex items-center gap-2 hover:bg-zinc-200 cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-red-600" />
              )}
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-zinc-300 rounded-xl px-3.5 py-2 text-xs text-zinc-900 focus:outline-none focus:border-red-600 font-medium shadow-xs cursor-pointer"
            >
              <option value="featured">Featured Drops</option>
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="best_seller">Best Selling</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* HCI Quick Category & Collection Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-zinc-950 text-white shadow-xs'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950'
            }`}
          >
            <span>All Footwear</span>
            <span className="text-[10px] opacity-70 font-mono-numbers">({totalCount})</span>
          </button>

          <button
            onClick={() => setSelectedCategory('Streetwear')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'Streetwear'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Streetwear</span>
            <span className="text-[10px] opacity-70 font-mono-numbers">({streetwearCount})</span>
          </button>

          <button
            onClick={() => setSelectedCategory('Retro Classics')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'Retro Classics' || selectedCategory === 'Retro'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950'
            }`}
          >
            <span>Retro Classics</span>
            <span className="text-[10px] opacity-70 font-mono-numbers">({retroCount})</span>
          </button>

          <button
            onClick={() => setSelectedCategory('New Arrivals')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'New Arrivals'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>New Arrivals</span>
            <span className="text-[10px] opacity-70 font-mono-numbers">({newArrivalsCount})</span>
          </button>

          <button
            onClick={() => setSelectedCategory('Running')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'Running'
                ? 'bg-zinc-950 text-white shadow-xs'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950'
            }`}
          >
            <span>Performance</span>
            <span className="text-[10px] opacity-70 font-mono-numbers">({runningCount})</span>
          </button>

          <button
            onClick={() => setOnlySale(!onlySale)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              onlySale
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/30'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950'
            }`}
          >
            <Tag className="w-3.5 h-3.5 text-emerald-600" />
            <span>On Sale</span>
            <span className="text-[10px] opacity-70 font-mono-numbers">({saleCount})</span>
          </button>
        </div>

        {/* Active Filter Chips Bar (HCI Recognition & Control) */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-3 mt-3 border-t border-zinc-100 text-xs">
            <span className="text-zinc-400 font-medium text-[11px]">Active Filters:</span>

            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-800 text-[11px] font-semibold border border-zinc-200">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-red-600 ml-0.5 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-[11px] font-semibold border border-red-200">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('All')} className="hover:text-red-900 ml-0.5 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedBrand !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-800 text-[11px] font-semibold border border-zinc-200">
                Brand: {selectedBrand}
                <button onClick={() => setSelectedBrand('All')} className="hover:text-red-600 ml-0.5 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedColor !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-800 text-[11px] font-semibold border border-zinc-200">
                Color: {selectedColor}
                <button onClick={() => setSelectedColor('All')} className="hover:text-red-600 ml-0.5 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedSize !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-800 text-[11px] font-semibold border border-zinc-200">
                Size: {selectedSize}
                <button onClick={() => setSelectedSize('All')} className="hover:text-red-600 ml-0.5 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {onlySale && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200">
                Promotional Sale
                <button onClick={() => setOnlySale(false)} className="hover:text-emerald-950 ml-0.5 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {onlyInStock && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-800 text-[11px] font-semibold border border-zinc-200">
                In Stock Only
                <button onClick={() => setOnlyInStock(false)} className="hover:text-red-600 ml-0.5 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {maxPrice < 350 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-800 text-[11px] font-semibold border border-zinc-200">
                Under ${maxPrice}
                <button onClick={() => setMaxPrice(350)} className="hover:text-red-600 ml-0.5 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={resetFilters}
              className="text-[11px] font-bold text-red-600 hover:text-red-700 underline ml-1 cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Main Layout: Filters Sidebar + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 bg-white border border-zinc-200/80 rounded-2xl p-5 h-fit shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-red-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 font-display">
                Refine Selection
              </h3>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-zinc-500 hover:text-red-600 flex items-center gap-1 font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[11px] uppercase font-bold tracking-wider text-zinc-500 mb-2">
              Categories & Collections
            </h4>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-red-600 text-white font-bold shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="pt-4 border-t border-zinc-200/80">
            <h4 className="text-[11px] uppercase font-bold tracking-wider text-zinc-500 mb-2">
              Atelier Brand
            </h4>
            <div className="space-y-1">
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                    selectedBrand === b
                      ? 'bg-zinc-950 text-white font-bold'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                  }`}
                >
                  <span>{b}</span>
                  {selectedBrand === b && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="pt-4 border-t border-zinc-200/80">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-[11px] uppercase font-bold tracking-wider text-zinc-500">
                Shoe Size (US)
              </h4>
              {selectedSize !== 'All' && (
                <button onClick={() => setSelectedSize('All')} className="text-[10px] text-zinc-400 hover:text-red-600 cursor-pointer">
                  Reset
                </button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`py-2 text-center rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                    selectedSize === s
                      ? 'border-red-600 bg-red-600 text-white font-bold shadow-xs'
                      : 'border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="pt-4 border-t border-zinc-200/80">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-[11px] uppercase font-bold tracking-wider text-zinc-500">
                Color Palette
              </h4>
              {selectedColor !== 'All' && (
                <button onClick={() => setSelectedColor('All')} className="text-[10px] text-zinc-400 hover:text-red-600 cursor-pointer">
                  Reset
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                    selectedColor === c
                      ? 'border-red-600 bg-red-50 text-red-700 font-bold'
                      : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Slider */}
          <div className="pt-4 border-t border-zinc-200/80">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-[11px] uppercase font-bold tracking-wider text-zinc-500">
                Max Price
              </h4>
              <span className="text-xs font-bold text-zinc-950 font-mono-numbers">
                ${maxPrice}
              </span>
            </div>
            <input
              type="range"
              min="150"
              max="350"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-red-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1">
              <span>$150</span>
              <span>$350</span>
            </div>
          </div>

          {/* Quick Toggle Checks */}
          <div className="pt-4 border-t border-zinc-200/80 space-y-2.5">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs text-zinc-700 select-none">
              <input
                type="checkbox"
                checked={onlySale}
                onChange={(e) => setOnlySale(e.target.checked)}
                className="rounded text-red-600 focus:ring-red-600 w-4 h-4 accent-red-600"
              />
              <span className="font-medium">Special Offers / Sale Only</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer text-xs text-zinc-700 select-none">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded text-red-600 focus:ring-red-600 w-4 h-4 accent-red-600"
              />
              <span className="font-medium">In Stock Only (Dispatches in 24h)</span>
            </label>
          </div>
        </aside>

        {/* Mobile Filter Modal */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-xs lg:hidden">
            <div className="w-80 bg-white p-6 h-full overflow-y-auto space-y-6 text-zinc-900 shadow-2xl">
              <div className="flex justify-between items-center pb-3 border-b border-zinc-200">
                <h3 className="text-sm font-bold text-zinc-950 uppercase font-display">
                  Refine Silhouettes
                </h3>
                <button onClick={() => setMobileFilterOpen(false)} aria-label="Close filters">
                  <X className="w-5 h-5 text-zinc-500" />
                </button>
              </div>

              <div>
                <h4 className="text-xs font-bold text-zinc-500 mb-2 uppercase">Category</h4>
                <div className="space-y-1">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCategory(c)}
                      className={`block w-full text-left py-2 px-3 rounded-lg text-xs ${
                        selectedCategory === c ? 'bg-red-600 text-white font-bold' : 'text-zinc-600'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-red-600 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
              >
                Show {filteredProducts.length} Results
              </button>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-12 text-center space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-zinc-200 flex items-center justify-center mx-auto text-zinc-500">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-lg font-bold text-zinc-900 font-display">
                No sneakers matched your filter criteria
              </p>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed">
                We couldn't find any footwear silhouettes matching your active search and filters. Try adjusting price range or clearing some filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors shadow-md shadow-red-600/30 cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <div key={p.id} className="relative group/card">
                  <ProductCard
                    product={p}
                    isWishlisted={wishlist.includes(p.id)}
                    onToggleWishlist={onToggleWishlist}
                    onSelectProduct={onSelectProduct}
                    onQuickAdd={onQuickAdd}
                  />
                  {/* Quick View Button on Card */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickViewProduct(p);
                      setIsQuickViewOpen(true);
                    }}
                    className="absolute top-3 left-3 opacity-0 group-hover/card:opacity-100 transition-opacity z-20 px-2.5 py-1 bg-white/95 backdrop-blur-md border border-zinc-200 hover:border-zinc-400 rounded-md text-[10px] font-bold text-zinc-800 shadow-sm cursor-pointer"
                    title="Quick preview without leaving page"
                  >
                    Quick View
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
