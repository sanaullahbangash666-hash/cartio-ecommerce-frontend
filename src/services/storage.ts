import {
  Product,
  Order,
  User,
  CartItem,
  ScanRecord,
  VulnerabilityItem,
  SecurityReport,
  DatasetRecord,
  KPIStats,
  InsightItem,
  TransactionItem,
  UserWallet,
  WalletTransaction,
} from '../types';

import heroSneakerImg from '../assets/images/hero_sneaker_crimson_1791477565455.jpg';
import whiteSneakerImg from '../assets/images/sneaker_spectral_white_1791477576755.jpg';
import blackSneakerImg from '../assets/images/sneaker_stealth_black_1791477586592.jpg';
import retroSneakerImg from '../assets/images/sneaker_retro_crimson_1791477595832.jpg';
import lifestyleBannerImg from '../assets/images/category_lifestyle_banner_1791477605237.jpg';
import streetwearCyberImg from '../assets/images/sneaker_streetwear_cyber_1791557446438.jpg';
import retroRunnerImg from '../assets/images/sneaker_retro_runner_1791557462890.jpg';
import newArrivalAuraImg from '../assets/images/sneaker_new_arrival_1791557479677.jpg';
import streetwearSkateImg from '../assets/images/sneaker_streetwear_skate_1791557503919.jpg';
import retroCourtVintageImg from '../assets/images/sneaker_retro_court_1791557529988.jpg';
import cartioHeroSneakerImg from '../assets/images/cartio_hero_sneaker_1791625382111.jpg';

export {
  heroSneakerImg,
  whiteSneakerImg,
  blackSneakerImg,
  retroSneakerImg,
  lifestyleBannerImg,
  streetwearCyberImg,
  retroRunnerImg,
  newArrivalAuraImg,
  streetwearSkateImg,
  retroCourtVintageImg,
  cartioHeroSneakerImg,
};

// Initial seed products
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'CARTIO Spektr Air 01',
    brand: 'CARTIO LAB',
    category: 'Running',
    description: 'Engineered with aerodynamic mesh and responsive pressurized air sole cushioning. Crafted for high-velocity streetwear performance with laser-sculpted crimson accent piping.',
    price: 240,
    salePrice: 195,
    images: [heroSneakerImg, blackSneakerImg, whiteSneakerImg],
    colors: [
      { name: 'Crimson Fire', hex: '#e11d48', image: heroSneakerImg },
      { name: 'Stealth Obsidian', hex: '#18181b', image: blackSneakerImg },
      { name: 'Triple White', hex: '#f4f4f5', image: whiteSneakerImg },
    ],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    variants: [
      { id: 'v1-1', color: 'Crimson Fire', size: 'US 8', stock: 12, sku: 'CR-SPK-01-RED-8', price: 195, image: heroSneakerImg },
      { id: 'v1-2', color: 'Crimson Fire', size: 'US 9', stock: 18, sku: 'CR-SPK-01-RED-9', price: 195, image: heroSneakerImg },
      { id: 'v1-3', color: 'Crimson Fire', size: 'US 10', stock: 24, sku: 'CR-SPK-01-RED-10', price: 195, image: heroSneakerImg },
      { id: 'v1-4', color: 'Crimson Fire', size: 'US 11', stock: 8, sku: 'CR-SPK-01-RED-11', price: 195, image: heroSneakerImg },
      { id: 'v1-5', color: 'Crimson Fire', size: 'US 12', stock: 4, sku: 'CR-SPK-01-RED-12', price: 195, image: heroSneakerImg },
      { id: 'v1-6', color: 'Stealth Obsidian', size: 'US 8', stock: 10, sku: 'CR-SPK-01-BLK-8', price: 195, image: blackSneakerImg },
      { id: 'v1-7', color: 'Stealth Obsidian', size: 'US 9', stock: 15, sku: 'CR-SPK-01-BLK-9', price: 195, image: blackSneakerImg },
      { id: 'v1-8', color: 'Stealth Obsidian', size: 'US 10', stock: 20, sku: 'CR-SPK-01-BLK-10', price: 195, image: blackSneakerImg },
      { id: 'v1-9', color: 'Stealth Obsidian', size: 'US 11', stock: 5, sku: 'CR-SPK-01-BLK-11', price: 195, image: blackSneakerImg },
      { id: 'v1-10', color: 'Stealth Obsidian', size: 'US 12', stock: 2, sku: 'CR-SPK-01-BLK-12', price: 195, image: blackSneakerImg },
      { id: 'v1-11', color: 'Triple White', size: 'US 8', stock: 14, sku: 'CR-SPK-01-WHT-8', price: 195, image: whiteSneakerImg },
      { id: 'v1-12', color: 'Triple White', size: 'US 9', stock: 16, sku: 'CR-SPK-01-WHT-9', price: 195, image: whiteSneakerImg },
      { id: 'v1-13', color: 'Triple White', size: 'US 10', stock: 9, sku: 'CR-SPK-01-WHT-10', price: 195, image: whiteSneakerImg },
      { id: 'v1-14', color: 'Triple White', size: 'US 11', stock: 7, sku: 'CR-SPK-01-WHT-11', price: 195, image: whiteSneakerImg },
      { id: 'v1-15', color: 'Triple White', size: 'US 12', stock: 0, sku: 'CR-SPK-01-WHT-12', price: 195, image: whiteSneakerImg },
    ],
    stock: 162,
    sku: 'CR-SPK-01',
    rating: 4.9,
    reviewsCount: 142,
    tags: ['Flagship', 'Air Cushion', 'Performance', 'Reflective'],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isSale: true,
    createdAt: '2026-09-01T08:00:00Z',
    updatedAt: '2026-10-01T12:00:00Z',
    specifications: {
      'Upper Material': 'Technical Engineered Mesh & Thermoplastic Overlays',
      'Midsole': 'Encapsulated Dual-Density Nitrogen Foam',
      'Outsole': 'High-Abrasion Carbon Compound Rubber',
      'Drop': '10mm',
      'Weight': '315g (Size 9)',
    },
    reviews: [
      {
        id: 'rev-1',
        userId: 'u-101',
        userName: 'Julian K.',
        rating: 5,
        title: 'Unbelievable comfort and sleek styling',
        comment: 'The crimson air bubble detail in person is magnificent. Fits true to size and turns heads instantly.',
        verifiedPurchase: true,
        createdAt: '2026-09-18T14:32:00Z',
      },
      {
        id: 'rev-2',
        userId: 'u-102',
        userName: 'Avery S.',
        rating: 5,
        title: 'Premium materials from box opening',
        comment: 'Switching colorway to Stealth Obsidian was seamless. Arrived in 2 days and the cushioning is elite.',
        verifiedPurchase: true,
        createdAt: '2026-09-29T10:15:00Z',
      },
    ],
  },
  {
    id: 'prod-02',
    name: "CARTIO Heritage High '85",
    brand: 'CARTIO Retro',
    category: 'Basketball',
    description: 'A tribute to golden-era basketball silhouettes with full-grain calfskin leather, aged off-white midsole tint, and contrast crimson collar overlays.',
    price: 275,
    images: [retroSneakerImg, blackSneakerImg],
    colors: [
      { name: 'Varsity Red / Sail', hex: '#dc2626', image: retroSneakerImg },
      { name: 'Stealth Black', hex: '#18181b', image: blackSneakerImg },
    ],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    variants: [
      { id: 'v2-1', color: 'Varsity Red / Sail', size: 'US 8', stock: 6, sku: 'CR-HRT-85-RED-8', price: 275, image: retroSneakerImg },
      { id: 'v2-2', color: 'Varsity Red / Sail', size: 'US 9', stock: 12, sku: 'CR-HRT-85-RED-9', price: 275, image: retroSneakerImg },
      { id: 'v2-3', color: 'Varsity Red / Sail', size: 'US 10', stock: 8, sku: 'CR-HRT-85-RED-10', price: 275, image: retroSneakerImg },
      { id: 'v2-4', color: 'Varsity Red / Sail', size: 'US 11', stock: 10, sku: 'CR-HRT-85-RED-11', price: 275, image: retroSneakerImg },
      { id: 'v2-5', color: 'Varsity Red / Sail', size: 'US 12', stock: 3, sku: 'CR-HRT-85-RED-12', price: 275, image: retroSneakerImg },
      { id: 'v2-6', color: 'Stealth Black', size: 'US 8', stock: 8, sku: 'CR-HRT-85-BLK-8', price: 275, image: blackSneakerImg },
      { id: 'v2-7', color: 'Stealth Black', size: 'US 9', stock: 14, sku: 'CR-HRT-85-BLK-9', price: 275, image: blackSneakerImg },
      { id: 'v2-8', color: 'Stealth Black', size: 'US 10', stock: 11, sku: 'CR-HRT-85-BLK-10', price: 275, image: blackSneakerImg },
      { id: 'v2-9', color: 'Stealth Black', size: 'US 11', stock: 5, sku: 'CR-HRT-85-BLK-11', price: 275, image: blackSneakerImg },
      { id: 'v2-10', color: 'Stealth Black', size: 'US 12', stock: 2, sku: 'CR-HRT-85-BLK-12', price: 275, image: blackSneakerImg },
    ],
    stock: 79,
    sku: 'CR-HRT-85',
    rating: 4.8,
    reviewsCount: 98,
    tags: ['Retro', 'Full Grain Leather', 'Limited Edition', 'Basketball'],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isSale: false,
    createdAt: '2026-08-15T09:00:00Z',
    updatedAt: '2026-09-20T10:00:00Z',
    specifications: {
      'Upper Material': '100% Full Grain Italian Tumbled Leather',
      'Lining': 'Breathable Cotton Twill',
      'Sole': 'Cupsole Construction with Pivot Circle Traction',
      'Closure': 'Waxed Cotton Flat Laces + Spare Red Laces',
    },
  },
  {
    id: 'prod-03',
    name: 'CARTIO Spectral Low Minimal',
    brand: 'CARTIO LAB',
    category: 'Lifestyle',
    description: 'Architectural minimalism stripped down to pure form. Features monochromatic calfskin, polished silver hardware eyelets, and an anatomical cork insole.',
    price: 210,
    salePrice: 175,
    images: [whiteSneakerImg, blackSneakerImg],
    colors: [
      { name: 'Triple Optic White', hex: '#fafafa', image: whiteSneakerImg },
      { name: 'Stealth Black', hex: '#18181b', image: blackSneakerImg },
    ],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    variants: [
      { id: 'v3-1', color: 'Triple Optic White', size: 'US 8', stock: 15, sku: 'CR-SPC-LOW-WHT-8', price: 175, image: whiteSneakerImg },
      { id: 'v3-2', color: 'Triple Optic White', size: 'US 9', stock: 22, sku: 'CR-SPC-LOW-WHT-9', price: 175, image: whiteSneakerImg },
      { id: 'v3-3', color: 'Triple Optic White', size: 'US 10', stock: 18, sku: 'CR-SPC-LOW-WHT-10', price: 175, image: whiteSneakerImg },
      { id: 'v3-4', color: 'Triple Optic White', size: 'US 11', stock: 9, sku: 'CR-SPC-LOW-WHT-11', price: 175, image: whiteSneakerImg },
      { id: 'v3-5', color: 'Triple Optic White', size: 'US 12', stock: 6, sku: 'CR-SPC-LOW-WHT-12', price: 175, image: whiteSneakerImg },
      { id: 'v3-6', color: 'Stealth Black', size: 'US 8', stock: 8, sku: 'CR-SPC-LOW-BLK-8', price: 175, image: blackSneakerImg },
      { id: 'v3-7', color: 'Stealth Black', size: 'US 9', stock: 14, sku: 'CR-SPC-LOW-BLK-9', price: 175, image: blackSneakerImg },
      { id: 'v3-8', color: 'Stealth Black', size: 'US 10', stock: 12, sku: 'CR-SPC-LOW-BLK-10', price: 175, image: blackSneakerImg },
      { id: 'v3-9', color: 'Stealth Black', size: 'US 11', stock: 4, sku: 'CR-SPC-LOW-BLK-11', price: 175, image: blackSneakerImg },
      { id: 'v3-10', color: 'Stealth Black', size: 'US 12', stock: 0, sku: 'CR-SPC-LOW-BLK-12', price: 175, image: blackSneakerImg },
    ],
    stock: 108,
    sku: 'CR-SPC-LOW',
    rating: 4.7,
    reviewsCount: 74,
    tags: ['Minimalist', 'Monochrome', 'Italian Leather', 'Everyday Luxury'],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    isSale: true,
    createdAt: '2026-08-01T11:00:00Z',
    updatedAt: '2026-09-12T14:00:00Z',
    specifications: {
      'Upper Material': 'Polished Smooth Nappa Leather',
      'Footbed': 'Removable Molded Cork with Leather Topsole',
      'Stitching': 'Tonal Reinforced Perimeter Stitching',
    },
  },
  {
    id: 'prod-04',
    name: 'CARTIO Shadow Carbon High',
    brand: 'Kuro Noir',
    category: 'Streetwear',
    description: 'Tactical brutalist high-top constructed with ballistic nylon, water-repellent suede, and real carbon fiber lateral stabilization wings for high-durability city exploration.',
    price: 310,
    images: [blackSneakerImg, heroSneakerImg],
    colors: [
      { name: 'Obsidian Black', hex: '#18181b', image: blackSneakerImg },
      { name: 'Crimson Ember', hex: '#e11d48', image: heroSneakerImg },
    ],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    variants: [
      { id: 'v4-1', color: 'Obsidian Black', size: 'US 8', stock: 5, sku: 'CR-CRB-HI-BLK-8', price: 310, image: blackSneakerImg },
      { id: 'v4-2', color: 'Obsidian Black', size: 'US 9', stock: 11, sku: 'CR-CRB-HI-BLK-9', price: 310, image: blackSneakerImg },
      { id: 'v4-3', color: 'Obsidian Black', size: 'US 10', stock: 14, sku: 'CR-CRB-HI-BLK-10', price: 310, image: blackSneakerImg },
      { id: 'v4-4', color: 'Obsidian Black', size: 'US 11', stock: 7, sku: 'CR-CRB-HI-BLK-11', price: 310, image: blackSneakerImg },
      { id: 'v4-5', color: 'Obsidian Black', size: 'US 12', stock: 3, sku: 'CR-CRB-HI-BLK-12', price: 310, image: blackSneakerImg },
      { id: 'v4-6', color: 'Crimson Ember', size: 'US 8', stock: 4, sku: 'CR-CRB-HI-RED-8', price: 310, image: heroSneakerImg },
      { id: 'v4-7', color: 'Crimson Ember', size: 'US 9', stock: 8, sku: 'CR-CRB-HI-RED-9', price: 310, image: heroSneakerImg },
      { id: 'v4-8', color: 'Crimson Ember', size: 'US 10', stock: 9, sku: 'CR-CRB-HI-RED-10', price: 310, image: heroSneakerImg },
      { id: 'v4-9', color: 'Crimson Ember', size: 'US 11', stock: 3, sku: 'CR-CRB-HI-RED-11', price: 310, image: heroSneakerImg },
      { id: 'v4-10', color: 'Crimson Ember', size: 'US 12', stock: 1, sku: 'CR-CRB-HI-RED-12', price: 310, image: heroSneakerImg },
    ],
    stock: 65,
    sku: 'CR-CRB-HI',
    rating: 4.95,
    reviewsCount: 112,
    tags: ['Tactical', 'Carbon Fiber', 'All-Weather', 'High-Top'],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isSale: false,
    createdAt: '2026-09-22T10:00:00Z',
    updatedAt: '2026-10-04T16:00:00Z',
    specifications: {
      'Upper Material': 'Ballistic CORDURA® 1000D + Pigskin Suede',
      'Reinforcement': 'Autoclaved Carbon Fiber Heel Cup',
      'Sole': 'Vibram® MegaGrip All-Terrain Tread',
    },
  },
  {
    id: 'prod-05',
    name: 'CARTIO Velocity Apex 2',
    brand: 'Apex Tech',
    category: 'Running',
    description: 'Featherlight carbon-plated road racing shoe built for personal bests. Energy rebound rocker geometry with super-critical PEBA foam core.',
    price: 260,
    salePrice: 220,
    images: [heroSneakerImg, whiteSneakerImg],
    colors: [
      { name: 'Laser Crimson', hex: '#ef4444', image: heroSneakerImg },
      { name: 'Frost White', hex: '#f8fafc', image: whiteSneakerImg },
    ],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    variants: [
      { id: 'v5-1', color: 'Laser Crimson', size: 'US 8', stock: 9, sku: 'CR-VEL-02-RED-8', price: 220, image: heroSneakerImg },
      { id: 'v5-2', color: 'Laser Crimson', size: 'US 9', stock: 14, sku: 'CR-VEL-02-RED-9', price: 220, image: heroSneakerImg },
      { id: 'v5-3', color: 'Laser Crimson', size: 'US 10', stock: 16, sku: 'CR-VEL-02-RED-10', price: 220, image: heroSneakerImg },
      { id: 'v5-4', color: 'Laser Crimson', size: 'US 11', stock: 6, sku: 'CR-VEL-02-RED-11', price: 220, image: heroSneakerImg },
      { id: 'v5-5', color: 'Laser Crimson', size: 'US 12', stock: 3, sku: 'CR-VEL-02-RED-12', price: 220, image: heroSneakerImg },
      { id: 'v5-6', color: 'Frost White', size: 'US 8', stock: 11, sku: 'CR-VEL-02-WHT-8', price: 220, image: whiteSneakerImg },
      { id: 'v5-7', color: 'Frost White', size: 'US 9', stock: 15, sku: 'CR-VEL-02-WHT-9', price: 220, image: whiteSneakerImg },
      { id: 'v5-8', color: 'Frost White', size: 'US 10', stock: 12, sku: 'CR-VEL-02-WHT-10', price: 220, image: whiteSneakerImg },
      { id: 'v5-9', color: 'Frost White', size: 'US 11', stock: 4, sku: 'CR-VEL-02-WHT-11', price: 220, image: whiteSneakerImg },
      { id: 'v5-10', color: 'Frost White', size: 'US 12', stock: 2, sku: 'CR-VEL-02-WHT-12', price: 220, image: whiteSneakerImg },
    ],
    stock: 92,
    sku: 'CR-VEL-02',
    rating: 4.85,
    reviewsCount: 86,
    tags: ['Carbon Plated', 'Marathon', 'PEBA Foam', 'Ultralight'],
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    isSale: true,
    createdAt: '2026-09-10T11:00:00Z',
    updatedAt: '2026-10-02T08:00:00Z',
    specifications: {
      'Plate': 'Full-Length S-Curve Carbon Fiber Propulsion Plate',
      'Foam': 'Supercritical PEBA 85% Energy Return',
      'Weight': '195g (Size 9)',
    },
  },
  {
    id: 'prod-06',
    name: 'CARTIO Retro Dunk Court',
    brand: 'CARTIO Retro',
    category: 'Retro',
    description: 'Iconic street silhouette with padded low collar, durable rubber traction cupsole, and vintage two-tone color blocking in varsity crimson and optic white.',
    price: 180,
    images: [retroSneakerImg, whiteSneakerImg, blackSneakerImg],
    colors: [
      { name: 'Varsity Crimson', hex: '#dc2626', image: retroSneakerImg },
      { name: 'Monochrome White', hex: '#f4f4f5', image: whiteSneakerImg },
      { name: 'Shadow Black', hex: '#18181b', image: blackSneakerImg },
    ],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    variants: [
      { id: 'v6-1', color: 'Varsity Crimson', size: 'US 8', stock: 12, sku: 'CR-DNK-CRT-RED-8', price: 180, image: retroSneakerImg },
      { id: 'v6-2', color: 'Varsity Crimson', size: 'US 9', stock: 18, sku: 'CR-DNK-CRT-RED-9', price: 180, image: retroSneakerImg },
      { id: 'v6-3', color: 'Varsity Crimson', size: 'US 10', stock: 15, sku: 'CR-DNK-CRT-RED-10', price: 180, image: retroSneakerImg },
      { id: 'v6-4', color: 'Varsity Crimson', size: 'US 11', stock: 8, sku: 'CR-DNK-CRT-RED-11', price: 180, image: retroSneakerImg },
      { id: 'v6-5', color: 'Varsity Crimson', size: 'US 12', stock: 4, sku: 'CR-DNK-CRT-RED-12', price: 180, image: retroSneakerImg },
      { id: 'v6-6', color: 'Monochrome White', size: 'US 8', stock: 10, sku: 'CR-DNK-CRT-WHT-8', price: 180, image: whiteSneakerImg },
      { id: 'v6-7', color: 'Monochrome White', size: 'US 9', stock: 14, sku: 'CR-DNK-CRT-WHT-9', price: 180, image: whiteSneakerImg },
      { id: 'v6-8', color: 'Monochrome White', size: 'US 10', stock: 16, sku: 'CR-DNK-CRT-WHT-10', price: 180, image: whiteSneakerImg },
      { id: 'v6-9', color: 'Monochrome White', size: 'US 11', stock: 5, sku: 'CR-DNK-CRT-WHT-11', price: 180, image: whiteSneakerImg },
      { id: 'v6-10', color: 'Monochrome White', size: 'US 12', stock: 2, sku: 'CR-DNK-CRT-WHT-12', price: 180, image: whiteSneakerImg },
      { id: 'v6-11', color: 'Shadow Black', size: 'US 8', stock: 8, sku: 'CR-DNK-CRT-BLK-8', price: 180, image: blackSneakerImg },
      { id: 'v6-12', color: 'Shadow Black', size: 'US 9', stock: 12, sku: 'CR-DNK-CRT-BLK-9', price: 180, image: blackSneakerImg },
      { id: 'v6-13', color: 'Shadow Black', size: 'US 10', stock: 10, sku: 'CR-DNK-CRT-BLK-10', price: 180, image: blackSneakerImg },
      { id: 'v6-14', color: 'Shadow Black', size: 'US 11', stock: 6, sku: 'CR-DNK-CRT-BLK-11', price: 180, image: blackSneakerImg },
      { id: 'v6-15', color: 'Shadow Black', size: 'US 12', stock: 1, sku: 'CR-DNK-CRT-BLK-12', price: 180, image: blackSneakerImg },
    ],
    stock: 125,
    sku: 'CR-DNK-CRT',
    rating: 4.88,
    reviewsCount: 164,
    tags: ['Court Classic', 'Heritage', 'Two-Tone', 'Best Seller'],
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    isSale: false,
    createdAt: '2026-07-28T14:00:00Z',
    updatedAt: '2026-09-18T11:00:00Z',
  },
  {
    id: 'prod-07',
    name: 'CARTIO Phantom Stride X',
    brand: 'Kuro Noir',
    category: 'Streetwear',
    description: 'Tactical brutalist silhouette featuring quick-release aluminum cobra buckle, high-tensile ripstop nylon, and pressurized crimson air unit. Engineered for urban night terrain with high-abrasion tooth tread.',
    price: 290,
    salePrice: 245,
    images: [streetwearCyberImg, blackSneakerImg],
    colors: [
      { name: 'Tactical Black / Crimson', hex: '#18181b', image: streetwearCyberImg },
      { name: 'Stealth Obsidian', hex: '#09090b', image: blackSneakerImg },
    ],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    variants: [
      { id: 'v7-1', color: 'Tactical Black / Crimson', size: 'US 8', stock: 8, sku: 'CR-PHT-X-BLK-8', price: 245, image: streetwearCyberImg },
      { id: 'v7-2', color: 'Tactical Black / Crimson', size: 'US 9', stock: 15, sku: 'CR-PHT-X-BLK-9', price: 245, image: streetwearCyberImg },
      { id: 'v7-3', color: 'Tactical Black / Crimson', size: 'US 10', stock: 12, sku: 'CR-PHT-X-BLK-10', price: 245, image: streetwearCyberImg },
      { id: 'v7-4', color: 'Tactical Black / Crimson', size: 'US 11', stock: 6, sku: 'CR-PHT-X-BLK-11', price: 245, image: streetwearCyberImg },
      { id: 'v7-5', color: 'Tactical Black / Crimson', size: 'US 12', stock: 3, sku: 'CR-PHT-X-BLK-12', price: 245, image: streetwearCyberImg },
      { id: 'v7-6', color: 'Stealth Obsidian', size: 'US 8', stock: 7, sku: 'CR-PHT-X-OBS-8', price: 245, image: blackSneakerImg },
      { id: 'v7-7', color: 'Stealth Obsidian', size: 'US 9', stock: 10, sku: 'CR-PHT-X-OBS-9', price: 245, image: blackSneakerImg },
      { id: 'v7-8', color: 'Stealth Obsidian', size: 'US 10', stock: 9, sku: 'CR-PHT-X-OBS-10', price: 245, image: blackSneakerImg },
      { id: 'v7-9', color: 'Stealth Obsidian', size: 'US 11', stock: 4, sku: 'CR-PHT-X-OBS-11', price: 245, image: blackSneakerImg },
      { id: 'v7-10', color: 'Stealth Obsidian', size: 'US 12', stock: 2, sku: 'CR-PHT-X-OBS-12', price: 245, image: blackSneakerImg },
    ],
    stock: 76,
    sku: 'CR-PHT-X',
    rating: 4.94,
    reviewsCount: 88,
    tags: ['Streetwear', 'Tactical Buckle', 'Ballistic Nylon', 'Air Capsule', 'New Arrival'],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    isSale: true,
    createdAt: '2026-10-02T10:00:00Z',
    updatedAt: '2026-10-08T14:00:00Z',
    specifications: {
      'Closure': 'Military-Grade Cobra Buckle + Speed Lace System',
      'Upper Material': '1000D Ballistic Nylon & TPU Support Framework',
      'Cushioning': 'Pressurized Quad-Chamber Crimson Air Pod',
      'Outsole': 'High-Traction Lugged Rubber Compound',
    },
    reviews: [
      {
        id: 'rev-71',
        userId: 'u-108',
        userName: 'Kenji T.',
        rating: 5,
        title: 'Insane street presence and heavy-duty feel',
        comment: 'The cobra buckle is fully functional and feels bulletproof. Cushioning is surprisingly plush for such an aggressive tactical build.',
        verifiedPurchase: true,
        createdAt: '2026-10-05T16:20:00Z',
      },
    ],
  },
  {
    id: 'prod-08',
    name: 'CARTIO Track 77 Heritage Runner',
    brand: 'CARTIO Retro',
    category: 'Retro',
    description: 'Archival 1977 marathon silhouette reimagined with unlined Italian calfskin suede, buttery cream nylon quarter panels, and authentic vintage gum rubber waffle tread.',
    price: 165,
    images: [retroRunnerImg, whiteSneakerImg],
    colors: [
      { name: 'Vintage Sail / Crimson', hex: '#dc2626', image: retroRunnerImg },
      { name: 'Optic White / Cream', hex: '#fafaf9', image: whiteSneakerImg },
    ],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    variants: [
      { id: 'v8-1', color: 'Vintage Sail / Crimson', size: 'US 8', stock: 14, sku: 'CR-TRK-77-RED-8', price: 165, image: retroRunnerImg },
      { id: 'v8-2', color: 'Vintage Sail / Crimson', size: 'US 9', stock: 20, sku: 'CR-TRK-77-RED-9', price: 165, image: retroRunnerImg },
      { id: 'v8-3', color: 'Vintage Sail / Crimson', size: 'US 10', stock: 18, sku: 'CR-TRK-77-RED-10', price: 165, image: retroRunnerImg },
      { id: 'v8-4', color: 'Vintage Sail / Crimson', size: 'US 11', stock: 9, sku: 'CR-TRK-77-RED-11', price: 165, image: retroRunnerImg },
      { id: 'v8-5', color: 'Vintage Sail / Crimson', size: 'US 12', stock: 5, sku: 'CR-TRK-77-RED-12', price: 165, image: retroRunnerImg },
      { id: 'v8-6', color: 'Optic White / Cream', size: 'US 8', stock: 11, sku: 'CR-TRK-77-WHT-8', price: 165, image: whiteSneakerImg },
      { id: 'v8-7', color: 'Optic White / Cream', size: 'US 9', stock: 16, sku: 'CR-TRK-77-WHT-9', price: 165, image: whiteSneakerImg },
      { id: 'v8-8', color: 'Optic White / Cream', size: 'US 10', stock: 14, sku: 'CR-TRK-77-WHT-10', price: 165, image: whiteSneakerImg },
      { id: 'v8-9', color: 'Optic White / Cream', size: 'US 11', stock: 6, sku: 'CR-TRK-77-WHT-11', price: 165, image: whiteSneakerImg },
      { id: 'v8-10', color: 'Optic White / Cream', size: 'US 12', stock: 3, sku: 'CR-TRK-77-WHT-12', price: 165, image: whiteSneakerImg },
    ],
    stock: 116,
    sku: 'CR-TRK-77',
    rating: 4.89,
    reviewsCount: 135,
    tags: ['Retro Classics', 'Vintage 70s', 'Waffle Sole', 'Calfskin Suede', 'Best Seller'],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isSale: false,
    createdAt: '2026-08-20T09:00:00Z',
    updatedAt: '2026-09-25T11:00:00Z',
    specifications: {
      'Upper': 'Weathered Italian Calfskin Suede & Heritage Woven Nylon',
      'Midsole': 'Dual-Layer Wedge EVA with Vintage Tint',
      'Outsole': 'Authentic Gum Rubber Waffle Stud Array',
      'Tongue': 'Raw Exposed Foam Edge with Woven Heritage Label',
    },
    reviews: [
      {
        id: 'rev-81',
        userId: 'u-109',
        userName: 'Matteo G.',
        rating: 5,
        title: 'Timeless silhouette, buttery soft materials',
        comment: 'Takes me straight back to late 70s track meets. Lightweight, stylish with denim or track pants, and the gum sole is top tier.',
        verifiedPurchase: true,
        createdAt: '2026-09-27T11:45:00Z',
      },
    ],
  },
  {
    id: 'prod-09',
    name: 'CARTIO Aura Hyper-Run 03',
    brand: 'CARTIO LAB',
    category: 'Running',
    description: 'Next-generation hyper-responsive speed trainer featuring aerodynamic gradient mesh, external thermoplastic cage stabilization, and full-length carbon propulsion shank.',
    price: 280,
    salePrice: 250,
    images: [newArrivalAuraImg, heroSneakerImg],
    colors: [
      { name: 'Aura Crimson / Charcoal', hex: '#be123c', image: newArrivalAuraImg },
      { name: 'Laser Crimson', hex: '#ef4444', image: heroSneakerImg },
    ],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    variants: [
      { id: 'v9-1', color: 'Aura Crimson / Charcoal', size: 'US 8', stock: 10, sku: 'CR-AUR-03-RED-8', price: 250, image: newArrivalAuraImg },
      { id: 'v9-2', color: 'Aura Crimson / Charcoal', size: 'US 9', stock: 16, sku: 'CR-AUR-03-RED-9', price: 250, image: newArrivalAuraImg },
      { id: 'v9-3', color: 'Aura Crimson / Charcoal', size: 'US 10', stock: 22, sku: 'CR-AUR-03-RED-10', price: 250, image: newArrivalAuraImg },
      { id: 'v9-4', color: 'Aura Crimson / Charcoal', size: 'US 11', stock: 8, sku: 'CR-AUR-03-RED-11', price: 250, image: newArrivalAuraImg },
      { id: 'v9-5', color: 'Aura Crimson / Charcoal', size: 'US 12', stock: 4, sku: 'CR-AUR-03-RED-12', price: 250, image: newArrivalAuraImg },
      { id: 'v9-6', color: 'Laser Crimson', size: 'US 8', stock: 6, sku: 'CR-AUR-03-LSR-8', price: 250, image: heroSneakerImg },
      { id: 'v9-7', color: 'Laser Crimson', size: 'US 9', stock: 11, sku: 'CR-AUR-03-LSR-9', price: 250, image: heroSneakerImg },
      { id: 'v9-8', color: 'Laser Crimson', size: 'US 10', stock: 13, sku: 'CR-AUR-03-LSR-10', price: 250, image: heroSneakerImg },
      { id: 'v9-9', color: 'Laser Crimson', size: 'US 11', stock: 5, sku: 'CR-AUR-03-LSR-11', price: 250, image: heroSneakerImg },
      { id: 'v9-10', color: 'Laser Crimson', size: 'US 12', stock: 2, sku: 'CR-AUR-03-LSR-12', price: 250, image: heroSneakerImg },
    ],
    stock: 97,
    sku: 'CR-AUR-03',
    rating: 4.96,
    reviewsCount: 62,
    tags: ['New Arrivals', 'Carbon Plated', 'Hyper-Run', 'Aero Mesh', 'Performance'],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    isSale: true,
    createdAt: '2026-10-06T12:00:00Z',
    updatedAt: '2026-10-09T08:00:00Z',
    specifications: {
      'Propulsion Plate': 'Curved 3K Weave Carbon Fiber Chassis',
      'Midsole Foam': 'Hyper-Critical PEBA Formulated with Nitrogen Infusion',
      'Upper': 'Seamless Engineered Jacquard Aero Mesh',
      'Weight': '210g (US 9)',
    },
    reviews: [
      {
        id: 'rev-91',
        userId: 'u-110',
        userName: 'Dr. Lucas B.',
        rating: 5,
        title: 'Personal record on 10k first run',
        comment: 'Energy return is phenomenal. The red gradient looks like a stealth spacecraft. Best road trainer I have ever laced up.',
        verifiedPurchase: true,
        createdAt: '2026-10-07T18:00:00Z',
      },
    ],
  },
  {
    id: 'prod-10',
    name: 'CARTIO District Lo-Fade',
    brand: 'Kuro Noir',
    category: 'Streetwear',
    description: 'Heavyweight street skate silhouette crafted from double-stitched obsidian pigskin suede and rich crimson accents, backed with extra-cushioned memory-foam tongue.',
    price: 220,
    images: [streetwearSkateImg, blackSneakerImg],
    colors: [
      { name: 'District Crimson / Black', hex: '#be123c', image: streetwearSkateImg },
      { name: 'Pure Obsidian', hex: '#18181b', image: blackSneakerImg },
    ],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    variants: [
      { id: 'v10-1', color: 'District Crimson / Black', size: 'US 8', stock: 12, sku: 'CR-DST-LO-RED-8', price: 220, image: streetwearSkateImg },
      { id: 'v10-2', color: 'District Crimson / Black', size: 'US 9', stock: 19, sku: 'CR-DST-LO-RED-9', price: 220, image: streetwearSkateImg },
      { id: 'v10-3', color: 'District Crimson / Black', size: 'US 10', stock: 17, sku: 'CR-DST-LO-RED-10', price: 220, image: streetwearSkateImg },
      { id: 'v10-4', color: 'District Crimson / Black', size: 'US 11', stock: 9, sku: 'CR-DST-LO-RED-11', price: 220, image: streetwearSkateImg },
      { id: 'v10-5', color: 'District Crimson / Black', size: 'US 12', stock: 4, sku: 'CR-DST-LO-RED-12', price: 220, image: streetwearSkateImg },
      { id: 'v10-6', color: 'Pure Obsidian', size: 'US 8', stock: 8, sku: 'CR-DST-LO-BLK-8', price: 220, image: blackSneakerImg },
      { id: 'v10-7', color: 'Pure Obsidian', size: 'US 9', stock: 14, sku: 'CR-DST-LO-BLK-9', price: 220, image: blackSneakerImg },
      { id: 'v10-8', color: 'Pure Obsidian', size: 'US 10', stock: 11, sku: 'CR-DST-LO-BLK-10', price: 220, image: blackSneakerImg },
      { id: 'v10-9', color: 'Pure Obsidian', size: 'US 11', stock: 5, sku: 'CR-DST-LO-BLK-11', price: 220, image: blackSneakerImg },
      { id: 'v10-10', color: 'Pure Obsidian', size: 'US 12', stock: 2, sku: 'CR-DST-LO-BLK-12', price: 220, image: blackSneakerImg },
    ],
    stock: 101,
    sku: 'CR-DST-LO',
    rating: 4.88,
    reviewsCount: 94,
    tags: ['Streetwear', 'Chunky Silhouette', 'Skate Heritage', 'Heavy Suede', 'New Arrival'],
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: true,
    isSale: false,
    createdAt: '2026-09-30T14:00:00Z',
    updatedAt: '2026-10-06T15:00:00Z',
    specifications: {
      'Upper': 'Dual-Density Reinforced Heavy Pigskin Suede',
      'Laces': 'Extra-Wide 14mm Woven Cotton Street Laces',
      'Cupsole': 'Shock-Absorbing Rubber with Hex-Grid Grip Pattern',
      'Collar': 'Plush High-Density Memory Foam Ankle Pods',
    },
  },
  {
    id: 'prod-11',
    name: "CARTIO Apex Court '85 High Vintage",
    brand: 'CARTIO Retro',
    category: 'Retro',
    description: 'Collector-grade high-top homage to the 1985 hardwood revolution. Distressed full-grain Italian leather, vintage yellowed cupsole, and archival varsity collar stitching.',
    price: 295,
    images: [retroCourtVintageImg, retroSneakerImg],
    colors: [
      { name: 'Archival Cream / Varsity Red', hex: '#991b1b', image: retroCourtVintageImg },
      { name: 'Varsity Red / Sail', hex: '#dc2626', image: retroSneakerImg },
    ],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    variants: [
      { id: 'v11-1', color: 'Archival Cream / Varsity Red', size: 'US 8', stock: 5, sku: 'CR-CRT-85H-VNT-8', price: 295, image: retroCourtVintageImg },
      { id: 'v11-2', color: 'Archival Cream / Varsity Red', size: 'US 9', stock: 9, sku: 'CR-CRT-85H-VNT-9', price: 295, image: retroCourtVintageImg },
      { id: 'v11-3', color: 'Archival Cream / Varsity Red', size: 'US 10', stock: 11, sku: 'CR-CRT-85H-VNT-10', price: 295, image: retroCourtVintageImg },
      { id: 'v11-4', color: 'Archival Cream / Varsity Red', size: 'US 11', stock: 4, sku: 'CR-CRT-85H-VNT-11', price: 295, image: retroCourtVintageImg },
      { id: 'v11-5', color: 'Archival Cream / Varsity Red', size: 'US 12', stock: 2, sku: 'CR-CRT-85H-VNT-12', price: 295, image: retroCourtVintageImg },
      { id: 'v11-6', color: 'Varsity Red / Sail', size: 'US 8', stock: 7, sku: 'CR-CRT-85H-VNT-RED-8', price: 295, image: retroSneakerImg },
      { id: 'v11-7', color: 'Varsity Red / Sail', size: 'US 9', stock: 10, sku: 'CR-CRT-85H-VNT-RED-9', price: 295, image: retroSneakerImg },
      { id: 'v11-8', color: 'Varsity Red / Sail', size: 'US 10', stock: 8, sku: 'CR-CRT-85H-VNT-RED-10', price: 295, image: retroSneakerImg },
      { id: 'v11-9', color: 'Varsity Red / Sail', size: 'US 11', stock: 3, sku: 'CR-CRT-85H-VNT-RED-11', price: 295, image: retroSneakerImg },
      { id: 'v11-10', color: 'Varsity Red / Sail', size: 'US 12', stock: 1, sku: 'CR-CRT-85H-VNT-RED-12', price: 295, image: retroSneakerImg },
    ],
    stock: 60,
    sku: 'CR-CRT-85H',
    rating: 4.97,
    reviewsCount: 178,
    tags: ['Retro Classics', '1985 Court', 'Distressed Leather', 'High-Top', 'Limited Edition'],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isSale: false,
    createdAt: '2026-07-15T08:00:00Z',
    updatedAt: '2026-10-04T12:00:00Z',
    specifications: {
      'Leather': 'Hand-Aged Full Grain Italian Calfskin',
      'Midsole Finish': 'Custom Pre-Aged Vintage Patina with Stitched Perimeter',
      'Height': 'High-Top 8-Eyelet Hardwood Profile',
      'Packaging': 'Collector Wood-Grain Box + Certificate of Provenance',
    },
    reviews: [
      {
        id: 'rev-111',
        userId: 'u-115',
        userName: 'Darius M.',
        rating: 5,
        title: 'Grail-status high-top',
        comment: 'The pre-aged patina on the leather and sole looks authentic, not artificial. Thick padded collar locks in the ankle. Absolute centerpiece of my collection.',
        verifiedPurchase: true,
        createdAt: '2026-09-12T14:30:00Z',
      },
    ],
  },
];

// Initial demo users
export const DEMO_USERS: User[] = [
  {
    id: 'user-customer',
    name: 'Marcus Vance',
    email: 'customer@cartio.com',
    role: 'customer',
    phone: '+1 (555) 234-8901',
    password: 'customer123',
    createdAt: '2026-01-12T10:00:00Z',
    addresses: [
      {
        id: 'addr-1',
        fullName: 'Marcus Vance',
        street: '742 Evergreen Terrace, Apt 4B',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'United States',
        isDefault: true,
      },
    ],
  },
  {
    id: 'user-admin',
    name: 'Elena Rostova',
    email: 'admin@cartio.com',
    role: 'admin',
    phone: '+1 (555) 902-4411',
    password: 'admin123',
    createdAt: '2025-11-04T08:00:00Z',
  },
  {
    id: 'user-cyber',
    name: 'Derrick Chen, CISSP',
    email: 'cyber@cartio.com',
    role: 'cybersecurity',
    phone: '+1 (555) 781-9920',
    password: 'cyber123',
    createdAt: '2025-12-01T09:30:00Z',
  },
  {
    id: 'user-analyst',
    name: 'Dr. Sarah Lin',
    email: 'analyst@cartio.com',
    role: 'data_analyst',
    phone: '+1 (555) 640-3388',
    password: 'analyst123',
    createdAt: '2026-02-14T11:20:00Z',
  },
];

// Initial orders
const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-9021',
    orderNumber: 'CR-9021-X',
    customerId: 'user-customer',
    customerName: 'Marcus Vance',
    customerEmail: 'customer@cartio.com',
    customerPhone: '+1 (555) 234-8901',
    shippingAddress: {
      id: 'addr-1',
      fullName: 'Marcus Vance',
      street: '742 Evergreen Terrace, Apt 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
    },
    items: [
      {
        productId: 'prod-01',
        productName: 'CARTIO Spektr Air 01',
        brand: 'CARTIO LAB',
        selectedColor: 'Crimson Fire',
        selectedSize: 'US 10',
        price: 195,
        quantity: 1,
        image: heroSneakerImg,
      },
      {
        productId: 'prod-03',
        productName: 'CARTIO Spectral Low Minimal',
        brand: 'CARTIO LAB',
        selectedColor: 'Triple Optic White',
        selectedSize: 'US 10',
        price: 175,
        quantity: 1,
        image: whiteSneakerImg,
      },
    ],
    subtotal: 370,
    shipping: 0,
    tax: 29.6,
    discount: 0,
    total: 399.6,
    paymentMethod: 'Test Card',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    createdAt: '2026-10-04T15:24:00Z',
    trackingNumber: '1Z9999999999999999',
    notes: 'Signature required on delivery',
  },
  {
    id: 'ord-8994',
    orderNumber: 'CR-8994-A',
    customerId: 'user-customer',
    customerName: 'Marcus Vance',
    customerEmail: 'customer@cartio.com',
    customerPhone: '+1 (555) 234-8901',
    shippingAddress: {
      id: 'addr-1',
      fullName: 'Marcus Vance',
      street: '742 Evergreen Terrace, Apt 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
    },
    items: [
      {
        productId: 'prod-02',
        productName: "CARTIO Heritage High '85",
        brand: 'CARTIO Retro',
        selectedColor: 'Varsity Red / Sail',
        selectedSize: 'US 10',
        price: 275,
        quantity: 1,
        image: retroSneakerImg,
      },
    ],
    subtotal: 275,
    shipping: 0,
    tax: 22,
    discount: 25,
    total: 272,
    paymentMethod: 'Test Card',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    createdAt: '2026-09-24T11:10:00Z',
    trackingNumber: '1Z8888888888888888',
  },
  {
    id: 'ord-9035',
    orderNumber: 'CR-9035-B',
    customerId: 'user-custom-02',
    customerName: 'Kaitlyn Ross',
    customerEmail: 'kross@example.com',
    customerPhone: '+1 (555) 431-7729',
    shippingAddress: {
      id: 'addr-2',
      fullName: 'Kaitlyn Ross',
      street: '120 Ocean Drive',
      city: 'Miami',
      state: 'FL',
      postalCode: '33139',
      country: 'United States',
    },
    items: [
      {
        productId: 'prod-04',
        productName: 'CARTIO Shadow Carbon High',
        brand: 'Kuro Noir',
        selectedColor: 'Obsidian Black',
        selectedSize: 'US 9',
        price: 310,
        quantity: 1,
        image: blackSneakerImg,
      },
    ],
    subtotal: 310,
    shipping: 0,
    tax: 24.8,
    discount: 0,
    total: 334.8,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    orderStatus: 'Processing',
    createdAt: '2026-10-07T18:40:00Z',
    trackingNumber: '1Z7777777777777777',
  },
];

// Initial Cybersecurity Scan Records (clearly designated as safe demo / authorized testing targets)
const INITIAL_SCANS: ScanRecord[] = [
  {
    id: 'scan-101',
    targetType: 'URL',
    target: 'https://cartio-store.internal',
    startTime: '2026-10-08T08:15:00Z',
    completedTime: '2026-10-08T08:18:42Z',
    status: 'Completed',
    vulnerabilitiesFound: 3,
    severityCounts: { critical: 0, high: 1, medium: 1, low: 1, informational: 0 },
    summary: 'Automated dynamic security inspection completed. Found 1 high-severity missing CSP directive and 1 medium cookie attribute anomaly.',
  },
  {
    id: 'scan-102',
    targetType: 'IP',
    target: '192.168.10.45',
    startTime: '2026-10-07T14:00:00Z',
    completedTime: '2026-10-07T14:04:12Z',
    status: 'Completed',
    vulnerabilitiesFound: 2,
    severityCounts: { critical: 0, high: 0, medium: 1, low: 1, informational: 2 },
    summary: 'Host port enumeration completed. SSH (22) and HTTPS (443) open. TLS 1.2/1.3 cipher suite evaluation passes industry baseline.',
  },
];

const INITIAL_VULNERABILITIES: VulnerabilityItem[] = [
  {
    id: 'vuln-01',
    name: 'Missing Strict Content-Security-Policy (CSP)',
    severity: 'High',
    target: 'https://cartio-store.internal/checkout',
    description: 'The HTTP response header Content-Security-Policy does not enforce object-src or frame-ancestors restrictions, opening potential risk to clickjacking or script injection.',
    evidence: 'Header missing: Content-Security-Policy: default-src self; object-src none',
    recommendation: 'Deploy strict CSP header policy via reverse proxy configuration or Express helmet middleware.',
    timestamp: '2026-10-08T08:17:10Z',
    status: 'Open',
  },
  {
    id: 'vuln-02',
    name: 'Cookie Missing SameSite=Strict on Session State',
    severity: 'Medium',
    target: 'https://cartio-store.internal/api/auth/session',
    description: 'Authentication session cookie is flagged as SameSite=Lax instead of SameSite=Strict, allowing top-level navigation state carry-over.',
    evidence: 'Set-Cookie: session_id=...; Secure; HttpOnly; SameSite=Lax',
    recommendation: 'Update cookie configuration to enforce SameSite=Strict for authenticated state endpoints.',
    timestamp: '2026-10-08T08:18:02Z',
    status: 'Open',
  },
  {
    id: 'vuln-03',
    name: 'Exposed Server Header Information Disclosure',
    severity: 'Low',
    target: 'https://cartio-store.internal/api/catalog',
    description: 'Server returns detailed runtime banner revealing underlying framework versions.',
    evidence: 'X-Powered-By: Express / Server: nginx/1.24.0',
    recommendation: 'Disable X-Powered-By in Express via app.disable("x-powered-by") and configure server_tokens off in Nginx.',
    timestamp: '2026-10-08T08:18:25Z',
    status: 'Mitigated',
  },
  {
    id: 'vuln-04',
    name: 'Subresource Integrity (SRI) Missing on 3rd-party Font CDNs',
    severity: 'Informational',
    target: 'https://cartio-store.internal/index.html',
    description: 'External font stylesheets from Google Fonts loaded without integrity cryptographic hashes.',
    evidence: '<link href="https://fonts.googleapis.com/... rel="stylesheet">',
    recommendation: 'Self-host critical typography assets or append integrity attributes when applicable.',
    timestamp: '2026-10-07T14:02:15Z',
    status: 'Open',
  },
];

// Initial Data Analyst Datasets & Transactions
const INITIAL_DATASETS: DatasetRecord[] = [
  {
    id: 'ds-q3-sales',
    name: 'CARTIO_Q3_Transactions_Raw.csv',
    rowsCount: 2450,
    columns: ['transaction_id', 'order_id', 'customer_id', 'amount', 'payment_method', 'status', 'risk_score', 'ip_country'],
    uploadedAt: '2026-10-01T09:00:00Z',
    sizeBytes: 428000,
    status: 'Cleaned',
    duplicatesFound: 14,
    missingValuesHandled: 28,
    data: [
      { transaction_id: 'TX-1001', order_id: 'CR-9021-X', customer_id: 'C-881', amount: 399.6, payment_method: 'Card', status: 'Success', risk_score: 12, ip_country: 'US' },
      { transaction_id: 'TX-1002', order_id: 'CR-9022-Y', customer_id: 'C-882', amount: 195.0, payment_method: 'Card', status: 'Success', risk_score: 8, ip_country: 'US' },
      { transaction_id: 'TX-1003', order_id: 'CR-9023-Z', customer_id: 'C-883', amount: 550.0, payment_method: 'Card', status: 'Suspicious', risk_score: 84, ip_country: 'NG' },
      { transaction_id: 'TX-1004', order_id: 'CR-9024-W', customer_id: 'C-884', amount: 275.0, payment_method: 'COD', status: 'Success', risk_score: 15, ip_country: 'CA' },
      { transaction_id: 'TX-1005', order_id: 'CR-9025-V', customer_id: 'C-885', amount: 620.0, payment_method: 'Card', status: 'Flagged', risk_score: 92, ip_country: 'RO' },
      { transaction_id: 'TX-1006', order_id: 'CR-9026-U', customer_id: 'C-886', amount: 310.0, payment_method: 'Card', status: 'Success', risk_score: 10, ip_country: 'UK' },
      { transaction_id: 'TX-1007', order_id: 'CR-9027-T', customer_id: 'C-887', amount: 175.0, payment_method: 'DemoPay', status: 'Success', risk_score: 5, ip_country: 'US' },
    ],
  },
  {
    id: 'ds-fraud-patterns',
    name: 'CARTIO_HighRisk_Telemetry_2026.json',
    rowsCount: 820,
    columns: ['session_id', 'ip_address', 'velocity_attempts', 'velocity_window_sec', 'device_fingerprint', 'flagged_reason'],
    uploadedAt: '2026-10-06T16:20:00Z',
    sizeBytes: 154000,
    status: 'Raw',
    duplicatesFound: 0,
    missingValuesHandled: 0,
    data: [
      { session_id: 'S-9921', ip_address: '185.220.101.5', velocity_attempts: 14, velocity_window_sec: 60, device_fingerprint: 'Tor Exit Node', flagged_reason: 'Card velocity attack' },
      { session_id: 'S-9922', ip_address: '194.26.29.112', velocity_attempts: 8, velocity_window_sec: 45, device_fingerprint: 'Headless Chrome', flagged_reason: 'Bot scraper' },
    ],
  },
];

const INITIAL_TRANSACTIONS: TransactionItem[] = [
  { id: 'tx-001', orderId: 'CR-9021-X', customerName: 'Marcus Vance', customerEmail: 'customer@cartio.com', amount: 399.6, paymentMethod: 'Card', status: 'Success', riskScore: 8, timestamp: '2026-10-04T15:25:00Z', ipAddress: '72.229.28.185', location: 'New York, US' },
  { id: 'tx-002', orderId: 'CR-9035-B', customerName: 'Kaitlyn Ross', customerEmail: 'kross@example.com', amount: 334.8, paymentMethod: 'COD', status: 'Success', riskScore: 14, timestamp: '2026-10-07T18:41:00Z', ipAddress: '107.140.82.9', location: 'Miami, US' },
  { id: 'tx-003', orderId: 'CR-9039-F', customerName: 'Anonymous Checkout', customerEmail: 'temp992@guerrillamail.com', amount: 890.0, paymentMethod: 'Card', status: 'Flagged', riskScore: 94, timestamp: '2026-10-08T03:12:00Z', ipAddress: '185.220.101.5', location: 'Frankfurt, DE (Tor)', },
  { id: 'tx-004', orderId: 'CR-9040-G', customerName: 'Devon Miles', customerEmail: 'devon@agency.io', amount: 480.0, paymentMethod: 'Card', status: 'Success', riskScore: 11, timestamp: '2026-10-08T07:44:00Z', ipAddress: '12.180.20.11', location: 'San Francisco, US' },
  { id: 'tx-005', orderId: 'CR-9041-H', customerName: 'Viktor S.', customerEmail: 'viktor@privatemail.ch', amount: 620.0, paymentMethod: 'Card', status: 'Suspicious', riskScore: 78, timestamp: '2026-10-08T09:10:00Z', ipAddress: '194.26.29.112', location: 'Bucharest, RO' },
];

const INITIAL_INSIGHTS: InsightItem[] = [
  {
    id: 'ins-1',
    type: 'opportunity',
    title: 'High Conversion on Crimson Colorway',
    description: 'Products featuring Crimson Fire / Varsity Red colorways exhibit a 24.8% higher add-to-cart rate than neutral monochrome variants.',
    impactScore: 91,
    metric: '+24.8% CTR',
    delta: '+4.2% vs last week',
    recommendation: 'Feature the Spektr Air 01 Crimson variant prominently in hero campaign spots and promotional banners.',
  },
  {
    id: 'ins-2',
    type: 'risk',
    title: 'Card Velocity Spikes from Data Center IPs',
    description: 'Detected 4 automated card testing sequences attempting rapid checkout on size US 10 items during off-peak hours.',
    impactScore: 86,
    metric: '4 Attacked Sessions',
    delta: 'Detected within 30 min',
    recommendation: 'Activate rate limiting on /checkout endpoint and enforce 3DS authorization for transactions scoring risk > 70.',
  },
  {
    id: 'ins-3',
    type: 'trend',
    title: 'Average Order Value Growth (+18.4%)',
    description: 'Cart cross-selling between footwear and sneaker care accessories has expanded basket sizes significantly across Q3.',
    impactScore: 84,
    metric: '$268.40 AOV',
    delta: '+$42.10 YoY',
    recommendation: 'Maintain free shipping threshold at $150 to keep single-item shoppers incentivized to bundle.',
  },
];

// Persistent state class with localStorage fallback
class StorageService {
  private productsKey = 'cartio_products';
  private ordersKey = 'cartio_orders';
  private usersKey = 'cartio_users';
  private currentUserKey = 'cartio_current_user';
  private cartKey = 'cartio_cart';
  private wishlistKey = 'cartio_wishlist';
  private scansKey = 'cartio_scans';
  private vulnsKey = 'cartio_vulns';
  private datasetsKey = 'cartio_datasets';
  private transactionsKey = 'cartio_transactions';
  private insightsKey = 'cartio_insights';
  private walletsKey = 'cartio_wallets';

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;

    const existingProdsRaw = localStorage.getItem(this.productsKey);
    if (!existingProdsRaw) {
      localStorage.setItem(this.productsKey, JSON.stringify(INITIAL_PRODUCTS));
    } else {
      try {
        const storedProds: Product[] = JSON.parse(existingProdsRaw);
        const updatedProds = [...storedProds];
        for (const seed of INITIAL_PRODUCTS) {
          const idx = updatedProds.findIndex((p) => p.id === seed.id);
          if (idx === -1) {
            updatedProds.push(seed);
          } else {
            // Update seed images and tags if outdated
            updatedProds[idx] = { ...seed, ...updatedProds[idx], images: seed.images, colors: seed.colors };
          }
        }
        localStorage.setItem(this.productsKey, JSON.stringify(updatedProds));
      } catch {
        localStorage.setItem(this.productsKey, JSON.stringify(INITIAL_PRODUCTS));
      }
    }
    if (!localStorage.getItem(this.ordersKey)) {
      localStorage.setItem(this.ordersKey, JSON.stringify(INITIAL_ORDERS));
    }
    const existingUsersRaw = localStorage.getItem(this.usersKey);
    if (!existingUsersRaw) {
      localStorage.setItem(this.usersKey, JSON.stringify(DEMO_USERS));
    } else {
      try {
        const storedUsers: User[] = JSON.parse(existingUsersRaw);
        // Ensure standard demo staff accounts have latest emails & passwords, while keeping custom customer accounts intact
        const updatedUsers = [...storedUsers];
        for (const demoUser of DEMO_USERS) {
          const idx = updatedUsers.findIndex(
            (u) => u.id === demoUser.id || u.role === demoUser.role || u.email.toLowerCase() === demoUser.email.toLowerCase()
          );
          if (idx >= 0) {
            updatedUsers[idx] = { ...updatedUsers[idx], ...demoUser };
          } else {
            updatedUsers.push(demoUser);
          }
        }
        localStorage.setItem(this.usersKey, JSON.stringify(updatedUsers));
      } catch {
        localStorage.setItem(this.usersKey, JSON.stringify(DEMO_USERS));
      }
    }
    // Keep currentUser null by default for guest flow
    // User can click "Login" next to shopping bag or select demo roles in auth modal
    if (!localStorage.getItem(this.cartKey)) {
      // Seed with initial item
      const initialCart: CartItem[] = [
        {
          id: 'cart-1',
          productId: 'prod-01',
          productName: 'CARTIO Spektr Air 01',
          brand: 'CARTIO LAB',
          selectedColor: 'Crimson Fire',
          selectedSize: 'US 10',
          price: 195,
          quantity: 1,
          image: heroSneakerImg,
          maxStock: 24,
          sku: 'CR-SPK-01-RED-10',
        },
      ];
      localStorage.setItem(this.cartKey, JSON.stringify(initialCart));
    }
    if (!localStorage.getItem(this.wishlistKey)) {
      localStorage.setItem(this.wishlistKey, JSON.stringify(['prod-02', 'prod-04']));
    }
    if (!localStorage.getItem(this.scansKey)) {
      localStorage.setItem(this.scansKey, JSON.stringify(INITIAL_SCANS));
    }
    if (!localStorage.getItem(this.vulnsKey)) {
      localStorage.setItem(this.vulnsKey, JSON.stringify(INITIAL_VULNERABILITIES));
    }
    if (!localStorage.getItem(this.datasetsKey)) {
      localStorage.setItem(this.datasetsKey, JSON.stringify(INITIAL_DATASETS));
    }
    if (!localStorage.getItem(this.transactionsKey)) {
      localStorage.setItem(this.transactionsKey, JSON.stringify(INITIAL_TRANSACTIONS));
    }
    if (!localStorage.getItem(this.insightsKey)) {
      localStorage.setItem(this.insightsKey, JSON.stringify(INITIAL_INSIGHTS));
    }
  }

  // --- PRODUCTS ---
  getProducts(): Product[] {
    try {
      const data = localStorage.getItem(this.productsKey);
      return data ? JSON.parse(data) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  }

  getProductById(id: string): Product | undefined {
    return this.getProducts().find((p) => p.id === id);
  }

  saveProduct(product: Product): Product {
    const products = this.getProducts();
    const index = products.findIndex((p) => p.id === product.id);
    if (index >= 0) {
      products[index] = { ...product, updatedAt: new Date().toISOString() };
    } else {
      products.unshift({
        ...product,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    localStorage.setItem(this.productsKey, JSON.stringify(products));
    this.notify('products');
    return product;
  }

  deleteProduct(id: string): boolean {
    const products = this.getProducts().filter((p) => p.id !== id);
    localStorage.setItem(this.productsKey, JSON.stringify(products));
    this.notify('products');
    return true;
  }

  // --- ORDERS ---
  getOrders(): Order[] {
    try {
      const data = localStorage.getItem(this.ordersKey);
      return data ? JSON.parse(data) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  }

  getOrderById(id: string): Order | undefined {
    return this.getOrders().find((o) => o.id === id);
  }

  createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'trackingNumber'>): Order {
    const orders = this.getOrders();
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `CR-${randomHex}-${Date.now().toString().slice(-3)}`,
      createdAt: new Date().toISOString(),
      trackingNumber: `1Z${Math.floor(1000000000000000 + Math.random() * 9000000000000000)}`,
    };

    orders.unshift(newOrder);
    localStorage.setItem(this.ordersKey, JSON.stringify(orders));

    // Deduct stock for each ordered item variant
    const products = this.getProducts();
    for (const item of orderData.items) {
      const prod = products.find((p) => p.id === item.productId);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.quantity);
        const variant = prod.variants.find((v) => v.color === item.selectedColor && v.size === item.selectedSize);
        if (variant) {
          variant.stock = Math.max(0, variant.stock - item.quantity);
        }
      }
    }
    localStorage.setItem(this.productsKey, JSON.stringify(products));

    // Create a transaction record for data analytics
    this.addTransaction({
      orderId: newOrder.orderNumber,
      customerName: newOrder.customerName,
      customerEmail: newOrder.customerEmail,
      amount: newOrder.total,
      paymentMethod: newOrder.paymentMethod,
      status: 'Success',
      riskScore: Math.floor(Math.random() * 25), // Safe customer transaction
      ipAddress: '172.56.21.90',
      location: `${newOrder.shippingAddress.city}, ${newOrder.shippingAddress.country}`,
    });

    this.notify('orders');
    this.notify('products');
    return newOrder;
  }

  updateOrderStatus(orderId: string, status: Order['orderStatus']): boolean {
    const orders = this.getOrders();
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      order.orderStatus = status;
      localStorage.setItem(this.ordersKey, JSON.stringify(orders));
      this.notify('orders');
      return true;
    }
    return false;
  }

  // --- CART ---
  getCart(): CartItem[] {
    try {
      const data = localStorage.getItem(this.cartKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  addToCart(item: CartItem): CartItem[] {
    const cart = this.getCart();
    const existing = cart.find(
      (c) => c.productId === item.productId && c.selectedColor === item.selectedColor && c.selectedSize === item.selectedSize
    );
    if (existing) {
      existing.quantity = Math.min(existing.maxStock, existing.quantity + item.quantity);
    } else {
      cart.push(item);
    }
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.notify('cart');
    return cart;
  }

  updateCartQuantity(cartItemId: string, quantity: number): CartItem[] {
    let cart = this.getCart();
    if (quantity <= 0) {
      cart = cart.filter((i) => i.id !== cartItemId);
    } else {
      const item = cart.find((i) => i.id === cartItemId);
      if (item) {
        item.quantity = Math.min(item.maxStock, quantity);
      }
    }
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.notify('cart');
    return cart;
  }

  removeFromCart(cartItemId: string): CartItem[] {
    const cart = this.getCart().filter((i) => i.id !== cartItemId);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.notify('cart');
    return cart;
  }

  clearCart(): void {
    localStorage.setItem(this.cartKey, JSON.stringify([]));
    this.notify('cart');
  }

  // --- WISHLIST ---
  getWishlist(): string[] {
    try {
      const data = localStorage.getItem(this.wishlistKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  toggleWishlist(productId: string): boolean {
    const wishlist = this.getWishlist();
    const idx = wishlist.indexOf(productId);
    let added = false;
    if (idx >= 0) {
      wishlist.splice(idx, 1);
    } else {
      wishlist.push(productId);
      added = true;
    }
    localStorage.setItem(this.wishlistKey, JSON.stringify(wishlist));
    this.notify('wishlist');
    return added;
  }

  // --- USERS & AUTH ---
  getCurrentUser(): User | null {
    try {
      const data = localStorage.getItem(this.currentUserKey);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.currentUserKey);
    }
    this.notify('user');
  }

  getUsers(): User[] {
    try {
      const data = localStorage.getItem(this.usersKey);
      return data ? JSON.parse(data) : DEMO_USERS;
    } catch {
      return DEMO_USERS;
    }
  }

  addUser(user: User): User {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return user;
  }

  // --- CYBERSECURITY SCANNING ---
  getScans(): ScanRecord[] {
    try {
      const data = localStorage.getItem(this.scansKey);
      return data ? JSON.parse(data) : INITIAL_SCANS;
    } catch {
      return INITIAL_SCANS;
    }
  }

  addScan(scan: ScanRecord): void {
    const scans = this.getScans();
    scans.unshift(scan);
    localStorage.setItem(this.scansKey, JSON.stringify(scans));
    this.notify('scans');
  }

  getVulnerabilities(): VulnerabilityItem[] {
    try {
      const data = localStorage.getItem(this.vulnsKey);
      return data ? JSON.parse(data) : INITIAL_VULNERABILITIES;
    } catch {
      return INITIAL_VULNERABILITIES;
    }
  }

  addVulnerabilities(items: VulnerabilityItem[]): void {
    const vulns = this.getVulnerabilities();
    vulns.unshift(...items);
    localStorage.setItem(this.vulnsKey, JSON.stringify(vulns));
    this.notify('vulns');
  }

  updateVulnerabilityStatus(id: string, status: VulnerabilityItem['status']): void {
    const vulns = this.getVulnerabilities();
    const v = vulns.find((item) => item.id === id);
    if (v) {
      v.status = status;
      localStorage.setItem(this.vulnsKey, JSON.stringify(vulns));
      this.notify('vulns');
    }
  }

  // --- DATA ANALYST & TRANSACTIONS ---
  getDatasets(): DatasetRecord[] {
    try {
      const data = localStorage.getItem(this.datasetsKey);
      return data ? JSON.parse(data) : INITIAL_DATASETS;
    } catch {
      return INITIAL_DATASETS;
    }
  }

  saveDataset(ds: DatasetRecord): void {
    const list = this.getDatasets();
    const idx = list.findIndex((d) => d.id === ds.id);
    if (idx >= 0) {
      list[idx] = ds;
    } else {
      list.unshift(ds);
    }
    localStorage.setItem(this.datasetsKey, JSON.stringify(list));
    this.notify('datasets');
  }

  getTransactions(): TransactionItem[] {
    try {
      const data = localStorage.getItem(this.transactionsKey);
      return data ? JSON.parse(data) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  }

  addTransaction(tx: Omit<TransactionItem, 'id' | 'timestamp'>): TransactionItem {
    const list = this.getTransactions();
    const newTx: TransactionItem = {
      ...tx,
      id: `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
    };
    list.unshift(newTx);
    localStorage.setItem(this.transactionsKey, JSON.stringify(list));
    this.notify('transactions');
    return newTx;
  }

  getInsights(): InsightItem[] {
    try {
      const data = localStorage.getItem(this.insightsKey);
      return data ? JSON.parse(data) : INITIAL_INSIGHTS;
    } catch {
      return INITIAL_INSIGHTS;
    }
  }

  // --- DIGITAL WALLET (CARTIO PAY WALLET) ---
  private getDefaultWallet(userId: string): UserWallet {
    return {
      userId,
      balance: 450.00, // Generous starting balance so users can test ordering right away
      currency: 'USD',
      walletNumber: `CW-${userId.replace(/[^a-zA-Z0-9]/g, '').slice(-6).toUpperCase() || '772910'}-VIP`,
      tier: 'Gold VIP',
      cashbackRate: 0.03, // 3% cashback on shoe purchases
      pendingCashback: 18.50,
      isLocked: false,
      transactions: [
        {
          id: `wtx-${Date.now() - 86400000 * 3}`,
          userId,
          type: 'deposit',
          amount: 500.00,
          balanceAfter: 500.00,
          status: 'completed',
          description: 'Initial Wallet Deposit via Bank ACH',
          bankAccountLast4: '4892',
          createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        },
        {
          id: `wtx-${Date.now() - 86400000 * 2}`,
          userId,
          type: 'cashback',
          amount: 15.00,
          balanceAfter: 515.00,
          status: 'completed',
          description: 'VIP Sneakerhead Welcome Bonus',
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        },
        {
          id: `wtx-${Date.now() - 86400000}`,
          userId,
          type: 'order_payment',
          amount: 65.00,
          balanceAfter: 450.00,
          status: 'completed',
          description: 'Payment for CARTIO Care Kit',
          referenceId: 'ORD-7819',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
      ],
      linkedBankAccounts: [
        {
          id: 'bank-1',
          bankName: 'Chase Premier Checking',
          accountNumberMasked: '•••• •••• 4892',
          routingMasked: '••••0210',
        },
        {
          id: 'bank-2',
          bankName: 'Bank of America Advantage',
          accountNumberMasked: '•••• •••• 9104',
          routingMasked: '••••1120',
        },
      ],
    };
  }

  getWallet(userId?: string): UserWallet {
    const effectiveUserId = userId || this.getCurrentUser()?.id || 'user-customer';
    try {
      const raw = localStorage.getItem(this.walletsKey);
      const wallets: Record<string, UserWallet> = raw ? JSON.parse(raw) : {};
      if (wallets[effectiveUserId]) {
        return wallets[effectiveUserId];
      }
      const defWallet = this.getDefaultWallet(effectiveUserId);
      wallets[effectiveUserId] = defWallet;
      localStorage.setItem(this.walletsKey, JSON.stringify(wallets));
      return defWallet;
    } catch {
      return this.getDefaultWallet(effectiveUserId);
    }
  }

  saveWallet(wallet: UserWallet): void {
    try {
      const raw = localStorage.getItem(this.walletsKey);
      const wallets: Record<string, UserWallet> = raw ? JSON.parse(raw) : {};
      wallets[wallet.userId] = wallet;
      localStorage.setItem(this.walletsKey, JSON.stringify(wallets));
      this.notify('wallets');
    } catch (e) {
      console.error('Failed to save wallet', e);
    }
  }

  depositToWallet(amount: number, methodDesc: string = 'Bank ACH'): { success: boolean; wallet: UserWallet; message: string } {
    if (amount <= 0) {
      return { success: false, wallet: this.getWallet(), message: 'Deposit amount must be greater than $0' };
    }
    const wallet = this.getWallet();
    const newBal = Math.round((wallet.balance + amount) * 100) / 100;
    const tx: WalletTransaction = {
      id: `wtx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId: wallet.userId,
      type: 'deposit',
      amount,
      balanceAfter: newBal,
      status: 'completed',
      description: `Funds Deposit (${methodDesc})`,
      createdAt: new Date().toISOString(),
    };
    wallet.balance = newBal;
    wallet.transactions.unshift(tx);
    this.saveWallet(wallet);
    return { success: true, wallet, message: `Successfully deposited $${amount.toFixed(2)} to CARTIO Wallet.` };
  }

  withdrawFromWallet(amount: number, bankLast4: string = '4892'): { success: boolean; wallet: UserWallet; message: string } {
    const wallet = this.getWallet();
    if (amount <= 0) {
      return { success: false, wallet, message: 'Withdrawal amount must be greater than $0' };
    }
    if (wallet.balance < amount) {
      return { success: false, wallet, message: `Insufficient wallet funds. Current balance: $${wallet.balance.toFixed(2)}` };
    }
    const newBal = Math.round((wallet.balance - amount) * 100) / 100;
    const tx: WalletTransaction = {
      id: `wtx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId: wallet.userId,
      type: 'withdraw',
      amount,
      balanceAfter: newBal,
      status: 'completed',
      description: `Withdrawal to Bank Account ending in ${bankLast4}`,
      bankAccountLast4: bankLast4,
      createdAt: new Date().toISOString(),
    };
    wallet.balance = newBal;
    wallet.transactions.unshift(tx);
    this.saveWallet(wallet);
    return { success: true, wallet, message: `Successfully withdrew $${amount.toFixed(2)} to your bank account.` };
  }

  transferMoney(
    recipientEmail: string,
    recipientName: string,
    amount: number,
    note?: string
  ): { success: boolean; wallet: UserWallet; message: string } {
    const wallet = this.getWallet();
    const cleanEmail = recipientEmail.trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, wallet, message: 'Recipient email is required.' };
    }
    if (amount <= 0) {
      return { success: false, wallet, message: 'Transfer amount must be greater than $0' };
    }
    if (wallet.balance < amount) {
      return { success: false, wallet, message: `Insufficient balance ($${wallet.balance.toFixed(2)}) for this transfer of $${amount.toFixed(2)}.` };
    }

    const newBal = Math.round((wallet.balance - amount) * 100) / 100;
    const senderUser = this.getCurrentUser();

    // 1. Debit sender
    const senderTx: WalletTransaction = {
      id: `wtx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId: wallet.userId,
      type: 'transfer_sent',
      amount,
      balanceAfter: newBal,
      status: 'completed',
      description: `Transfer to ${recipientName || cleanEmail}${note ? ` ("${note}")` : ''}`,
      recipientEmail: cleanEmail,
      recipientName: recipientName || cleanEmail,
      createdAt: new Date().toISOString(),
    };
    wallet.balance = newBal;
    wallet.transactions.unshift(senderTx);
    this.saveWallet(wallet);

    // 2. If recipient is a known user in system, credit their wallet automatically!
    try {
      const users = this.getUsers();
      const targetUser = users.find((u) => u.email.toLowerCase() === cleanEmail);
      if (targetUser) {
        const recipientWallet = this.getWallet(targetUser.id);
        const recipientBal = Math.round((recipientWallet.balance + amount) * 100) / 100;
        const recipTx: WalletTransaction = {
          id: `wtx-rec-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          userId: targetUser.id,
          type: 'transfer_received',
          amount,
          balanceAfter: recipientBal,
          status: 'completed',
          description: `Transfer received from ${senderUser?.name || 'Customer'}${note ? ` ("${note}")` : ''}`,
          senderEmail: senderUser?.email || 'customer@cartio.com',
          senderName: senderUser?.name || 'Customer',
          createdAt: new Date().toISOString(),
        };
        recipientWallet.balance = recipientBal;
        recipientWallet.transactions.unshift(recipTx);
        this.saveWallet(recipientWallet);
      }
    } catch (e) {
      console.warn('Could not auto-credit recipient wallet:', e);
    }

    return {
      success: true,
      wallet,
      message: `Successfully transferred $${amount.toFixed(2)} to ${recipientName || cleanEmail}.`,
    };
  }

  payOrderWithWallet(orderTotal: number, orderNumber: string): { success: boolean; wallet: UserWallet; message: string } {
    const wallet = this.getWallet();
    if (wallet.balance < orderTotal) {
      return {
        success: false,
        wallet,
        message: `Insufficient wallet balance ($${wallet.balance.toFixed(2)}) for order total of $${orderTotal.toFixed(2)}. Please deposit funds first.`,
      };
    }
    const newBal = Math.round((wallet.balance - orderTotal) * 100) / 100;
    const cashbackEarned = Math.round(orderTotal * wallet.cashbackRate * 100) / 100;

    const tx: WalletTransaction = {
      id: `wtx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId: wallet.userId,
      type: 'order_payment',
      amount: orderTotal,
      balanceAfter: newBal,
      status: 'completed',
      description: `Payment for Shoe Order #${orderNumber}`,
      referenceId: orderNumber,
      createdAt: new Date().toISOString(),
    };
    wallet.balance = newBal;
    wallet.transactions.unshift(tx);

    // Apply instantaneous 3% cashback bonus to wallet
    if (cashbackEarned > 0) {
      const postCashbackBal = Math.round((wallet.balance + cashbackEarned) * 100) / 100;
      const cbTx: WalletTransaction = {
        id: `wtx-cb-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        userId: wallet.userId,
        type: 'cashback',
        amount: cashbackEarned,
        balanceAfter: postCashbackBal,
        status: 'completed',
        description: `3% VIP Cashback Reward on #${orderNumber}`,
        referenceId: orderNumber,
        createdAt: new Date().toISOString(),
      };
      wallet.balance = postCashbackBal;
      wallet.transactions.unshift(cbTx);
    }

    this.saveWallet(wallet);
    return {
      success: true,
      wallet,
      message: `Payment of $${orderTotal.toFixed(2)} completed with CARTIO Wallet (+ $${cashbackEarned.toFixed(2)} cashback earned!).`,
    };
  }

  // Simple event emitter for reactive React re-renders
  private listeners: Array<() => void> = [];

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify(_key: string) {
    this.listeners.forEach((l) => l());
  }

  // Reset to default demo data helper
  resetToDefaults(): void {
    localStorage.setItem(this.productsKey, JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem(this.ordersKey, JSON.stringify(INITIAL_ORDERS));
    localStorage.setItem(this.usersKey, JSON.stringify(DEMO_USERS));
    localStorage.setItem(this.scansKey, JSON.stringify(INITIAL_SCANS));
    localStorage.setItem(this.vulnsKey, JSON.stringify(INITIAL_VULNERABILITIES));
    localStorage.setItem(this.datasetsKey, JSON.stringify(INITIAL_DATASETS));
    localStorage.setItem(this.transactionsKey, JSON.stringify(INITIAL_TRANSACTIONS));
    localStorage.setItem(this.insightsKey, JSON.stringify(INITIAL_INSIGHTS));
    this.notify('all');
  }
}

export const storage = new StorageService();
