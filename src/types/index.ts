export type Role = 'customer' | 'admin' | 'cybersecurity' | 'data_analyst';

export interface Address {
  id: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  avatar?: string;
  password?: string;
  createdAt: string;
  addresses?: Address[];
}

export interface ColorOption {
  name: string;
  hex: string;
  image: string;
}

export interface ProductVariant {
  id: string;
  color: string;
  size: string;
  stock: number;
  sku: string;
  price?: number;
  image?: string;
}

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Sneakers' | 'Running' | 'Basketball' | 'Streetwear' | 'Lifestyle' | 'Retro';
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  colors: ColorOption[];
  sizes: string[];
  variants: ProductVariant[];
  stock: number;
  sku: string;
  rating: number;
  reviewsCount: number;
  reviews?: ProductReview[];
  tags: string[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isSale?: boolean;
  createdAt: string;
  updatedAt: string;
  specifications?: Record<string, string>;
}

export interface CartItem {
  id: string;
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
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  brand: string;
  selectedColor: string;
  selectedSize: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: 'Test Card' | 'Cash on Delivery' | 'Demo Pay' | 'CARTIO Wallet';
  paymentStatus: 'Paid' | 'Pending';
  orderStatus: OrderStatus;
  createdAt: string;
  trackingNumber: string;
  notes?: string;
}

// Cybersecurity types
export type VulnerabilitySeverity = 'Critical' | 'High' | 'Medium' | 'Low' | 'Informational';

export interface VulnerabilityItem {
  id: string;
  name: string;
  severity: VulnerabilitySeverity;
  target: string;
  description: string;
  evidence: string;
  recommendation: string;
  timestamp: string;
  status: 'Open' | 'Mitigated' | 'False Positive';
}

export interface ScanRecord {
  id: string;
  targetType: 'URL' | 'IP';
  target: string;
  startTime: string;
  completedTime?: string;
  status: 'Completed' | 'Running' | 'Failed' | 'Stopped';
  vulnerabilitiesFound: number;
  severityCounts: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    informational: number;
  };
  summary: string;
}

export interface SecurityReport {
  id: string;
  title: string;
  target: string;
  generatedAt: string;
  status: 'Verified' | 'Draft';
  totalVulnerabilities: number;
  items: VulnerabilityItem[];
  executiveSummary: string;
}

// Nmap Types
export interface NmapPort {
  port: number;
  protocol: 'tcp' | 'udp';
  state: 'open' | 'filtered' | 'closed';
  service: string;
  version: string;
  risk: 'low' | 'medium' | 'high' | 'critical';
}

export interface NmapScanResult {
  target: string;
  command: string;
  status: 'completed' | 'scanning' | 'failed';
  latency: string;
  osGuess: string;
  macAddress?: string;
  ports: NmapPort[];
  rawLog: string[];
  scannedAt: string;
}

// Metasploit Types
export interface MetasploitModule {
  id: string;
  name: string;
  type: 'exploit' | 'auxiliary' | 'post';
  path: string;
  rank: 'Excellent' | 'Great' | 'Good' | 'Normal';
  description: string;
  cve?: string;
  defaultPort: number;
  author: string;
  safeCheck: boolean;
}

export interface MetasploitExecutionLog {
  timestamp: string;
  text: string;
  type: 'info' | 'success' | 'warn' | 'error';
}

// Burp Suite Types
export interface BurpInterceptItem {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  host: string;
  path: string;
  statusCode: number;
  rawHeaders: string;
  requestBody: string;
  responseHeaders: string;
  responseBody: string;
  contentType: string;
  timestamp: string;
  intercepted: boolean;
}

// IDS (Intrusion Detection System) Types
export interface IdsAlert {
  id: string;
  timestamp: string;
  ruleSid: number;
  category: string;
  signature: string;
  sourceIp: string;
  destIp: string;
  sourcePort: number;
  destPort: number;
  protocol: 'TCP' | 'UDP' | 'ICMP' | 'HTTP' | 'TLS';
  severity: VulnerabilitySeverity;
  payloadHex: string;
  payloadAscii: string;
  status: 'New' | 'Investigating' | 'Dismissed' | 'Escalated';
}

// IPS (Intrusion Prevention System) Types
export interface IpsRule {
  id: string;
  ip: string;
  reason: string;
  blockedAt: string;
  duration: '1 Hour' | '24 Hours' | '7 Days' | 'Permanent';
  status: 'Active' | 'Revoked' | 'Expired';
  droppedPackets: number;
  threatType: string;
}

// Data Analyst types
export interface DatasetRecord {
  id: string;
  name: string;
  rowsCount: number;
  columns: string[];
  uploadedAt: string;
  sizeBytes: number;
  status: 'Raw' | 'Cleaned' | 'Processing';
  data: Record<string, any>[];
  duplicatesFound?: number;
  missingValuesHandled?: number;
}

export interface KPIStats {
  totalRevenue: number;
  totalOrders: number;
  totalTransactions: number;
  averageOrderValue: number;
  conversionRate: number;
  fraudRate: number;
  successfulTransactions: number;
  failedTransactions: number;
  revenueGrowthPct: number;
  fraudIncidents: number;
}

export interface InsightItem {
  id: string;
  type: 'trend' | 'risk' | 'opportunity' | 'anomaly';
  title: string;
  description: string;
  impactScore: number;
  metric: string;
  delta: string;
  recommendation: string;
}

export interface TransactionItem {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  paymentMethod: string;
  status: 'Success' | 'Failed' | 'Suspicious' | 'Flagged';
  riskScore: number;
  timestamp: string;
  ipAddress: string;
  location: string;
}

export type AnalystTab =
  | 'raw data comming from simulator'
  | 'extract'
  | 'validate'
  | 'clean transform'
  | 'aggregate'
  | 'calculate kpis'
  | 'analysze'
  | 'visual'
  | 'generate insights'
  | 'AI Q&A about profit calculation etc';

export interface ProfitModelConfig {
  cogsPercentage: number;
  fulfillmentCostPerOrder: number;
  paymentGatewayFeePct: number;
  marketingRoas: number;
  returnRefundRatePct: number;
  warehouseFixedMonthly: number;
}

// Digital Wallet Types
export type WalletTxType = 'deposit' | 'order_payment' | 'withdraw' | 'transfer_sent' | 'transfer_received' | 'cashback';
export type WalletTxStatus = 'completed' | 'pending' | 'failed';

export interface WalletTransaction {
  id: string;
  userId: string;
  type: WalletTxType;
  amount: number;
  balanceAfter: number;
  status: WalletTxStatus;
  description: string;
  referenceId?: string; // Order ID or Transfer receipt
  recipientEmail?: string;
  recipientName?: string;
  senderEmail?: string;
  senderName?: string;
  bankAccountLast4?: string;
  createdAt: string;
}

export interface UserWallet {
  userId: string;
  balance: number;
  currency: string;
  walletNumber: string;
  tier: 'Standard' | 'Gold VIP' | 'Black Diamond';
  cashbackRate: number; // e.g. 0.03 for 3%
  pendingCashback: number;
  isLocked: boolean;
  transactions: WalletTransaction[];
  linkedBankAccounts?: {
    id: string;
    bankName: string;
    accountNumberMasked: string;
    routingMasked: string;
  }[];
}

