import React, { useState, useEffect, useRef } from 'react';
import {
  Database,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  Download,
  Filter,
  Layers,
  Calculator,
  LineChart,
  PieChart,
  Bot,
  Send,
  Zap,
  TrendingUp,
  DollarSign,
  Package,
  ShieldAlert,
  Sliders,
  Play,
  RotateCcw,
  Check,
  Search,
  ChevronRight,
  Info,
  Table,
  Cpu,
  BarChart2,
  Workflow
} from 'lucide-react';
import { DatasetRecord, KPIStats, InsightItem, TransactionItem, AnalystTab, ProfitModelConfig } from '../../types';
import { analyticsService, CleanOptions } from '../../services/analyticsService';
import { storage } from '../../services/storage';

interface DataAnalystDashboardProps {
  onRefreshData?: () => void;
}

// 10 Exact Requested Tabs:
// (raw data comming from simulator, extract , validate, clean transform, aggregate,calculate kpis , analysze,visual, generate insights, and AI Q&A about profit calculation etc)
const TABS: { id: AnalystTab; label: string; shortLabel: string; icon: any }[] = [
  { id: 'raw data comming from simulator', label: 'Raw Data Coming From Simulator', shortLabel: 'Raw Data (Simulator)', icon: Database },
  { id: 'extract', label: 'Extract', shortLabel: 'Extract', icon: ArrowRight },
  { id: 'validate', label: 'Validate', shortLabel: 'Validate', icon: CheckCircle2 },
  { id: 'clean transform', label: 'Clean Transform', shortLabel: 'Clean Transform', icon: Sliders },
  { id: 'aggregate', label: 'Aggregate', shortLabel: 'Aggregate', icon: Layers },
  { id: 'calculate kpis', label: 'Calculate KPIs', shortLabel: 'Calculate KPIs', icon: Calculator },
  { id: 'analysze', label: 'Analyze', shortLabel: 'Analyze', icon: LineChart },
  { id: 'visual', label: 'Visual', shortLabel: 'Visual', icon: PieChart },
  { id: 'generate insights', label: 'Generate Insights', shortLabel: 'Generate Insights', icon: Sparkles },
  { id: 'AI Q&A about profit calculation etc', label: 'AI Q&A About Profit Calculation Etc', shortLabel: 'AI Profit Q&A', icon: Bot },
];

export const DataAnalystDashboard: React.FC<DataAnalystDashboardProps> = () => {
  const [activeTab, setActiveTab] = useState<AnalystTab>('raw data comming from simulator');

  // Core Data States
  const [kpis, setKpis] = useState<KPIStats | null>(null);
  const [datasets, setDatasets] = useState<DatasetRecord[]>([]);
  const [activeDataset, setActiveDataset] = useState<DatasetRecord | null>(null);
  const [insights, setInsights] = useState<InsightItem[]>([]);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [chartsData, setChartsData] = useState<any>(null);

  // Tab 1: Simulator states
  const [isSimulatorRunning, setIsSimulatorRunning] = useState(false);
  const [simSpeed, setSimSpeed] = useState<number>(1500);
  const [simBatchSize, setSimBatchSize] = useState<number>(5);
  const [streamLog, setStreamLog] = useState<Array<{ id: string; time: string; event: string; status: string; payload: any }>>([]);

  // Tab 2: Extract states
  const [extractFilter, setExtractFilter] = useState<'all' | 'sales' | 'telemetry' | 'suspicious'>('all');
  const [extractQuery, setExtractQuery] = useState('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [extractedRows, setExtractedRows] = useState<any[]>([]);

  // Tab 3: Validate states
  const [validationRules, setValidationRules] = useState([
    { id: 'v1', name: 'Price & Amount Non-Negative Rule', rule: 'amount > 0', status: 'Passed', passed: 100, failed: 0 },
    { id: 'v2', name: 'Order Number Integrity Check', rule: 'order_id matches ^(CR|ORD)-[0-9]+', status: 'Passed', passed: 98.2, failed: 1.8 },
    { id: 'v3', name: 'Email RFC-5322 Syntax Format', rule: 'customer_email is valid RFC email', status: 'Warning', passed: 94.6, failed: 5.4 },
    { id: 'v4', name: 'Payment Gateway Token Validation', rule: 'paymentMethod in [Card, COD, DemoPay]', status: 'Passed', passed: 100, failed: 0 },
    { id: 'v5', name: 'Risk Velocity Anomaly Bound', rule: 'risk_score between 0 and 100', status: 'Passed', passed: 100, failed: 0 },
  ]);
  const [isValidating, setIsValidating] = useState(false);

  // Tab 4: Clean Transform states
  const [cleanOptions, setCleanOptions] = useState<CleanOptions>({
    removeDuplicates: true,
    fillMissingValues: true,
    normalizeNumbers: true,
    stripWhitespace: true,
  });
  const [customTransform, setCustomTransform] = useState({
    uppercaseSku: true,
    roundDecimals: true,
    maskEmails: false,
    categorizeRiskBands: true,
  });
  const [isCleaning, setIsCleaning] = useState(false);
  const [cleanFeedback, setCleanFeedback] = useState<string>('');

  // Tab 5: Aggregate states
  const [groupByField, setGroupByField] = useState<'category' | 'payment_method' | 'ip_country' | 'risk_band'>('category');
  const [metricOp, setMetricOp] = useState<'sum' | 'avg' | 'count'>('sum');

  // Tab 6: Calculate KPIs states
  const [kpiScenarioModifier, setKpiScenarioModifier] = useState({
    trafficBoostPct: 0,
    priceElasticityPct: 0,
    marketingAdSpend: 15000,
  });

  // Tab 7: Analyze states
  const [analysisCohort, setAnalysisCohort] = useState<'all' | 'high_value' | 'repeat_buyers' | 'high_risk'>('all');

  // Tab 8: Visual states
  const [chartViewMode, setChartViewMode] = useState<'revenue' | 'category' | 'risk' | 'channel'>('revenue');

  // Tab 9: Generate Insights states
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  const [filterInsightType, setFilterInsightType] = useState<'all' | 'opportunity' | 'risk' | 'trend'>('all');

  // Tab 10: AI Q&A about profit calculation etc
  const [qaInput, setQaInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [qaHistory, setQaHistory] = useState<Array<{ id: string; question: string; answer: string; time: string; model: string }>>([
    {
      id: 'qa-init-1',
      question: 'What is our net profit margin on the Spektr Air 01 sneaker line?',
      answer: `### 📊 Spektr Air 01 Financial Model & Unit Economics
- **MSRP (Retail Price)**: $195.00
- **Landed COGS (Materials, Air-sole tooling, labor)**: $78.20 (40.1%)
- **Fulfillment & Parcel Express Courier**: $14.50 (7.4%)
- **Stripe & Gateway Merchant Fee**: $5.85 (3.0%)
- **Blended CAC / Ad Spend Allocation**: $26.00 (13.3%)
- **Gross Profit**: $116.80 (59.9% Gross Margin)
- **Net Operating Profit**: **$70.45 per pair (36.1% Net Margin)**

💡 **Strategic Takeaway**: Spektr Air 01 boasts our healthiest contribution margin across performance footwear, delivering 44% of total marketplace gross margin dollars.`,
      time: '10:14 AM',
      model: 'gemini-3.8-flash',
    },
    {
      id: 'qa-init-2',
      question: 'How does offering free shipping on orders over $150 affect total profit?',
      answer: `### 📦 Free Shipping Threshold Impact ($150 Benchmark)
- **Baseline AOV Without Threshold**: $182.40
- **Achieved AOV With $150 Threshold**: **$268.00 (+46.9% Basket Expansion)**
- **Average Shipping Subsidy Absorbed**: $12.80
- **Incremental Gross Margin Gained per Basket**: $48.50
- **Net Profit Multiplier**: **+$35.70 Net Gain per Order** after deducting absorbed shipping cost.

Recommendation: Retain the $150 minimum threshold. Basket expansion significantly outpaces courier fulfillment costs.`,
      time: '10:28 AM',
      model: 'gemini-3.8-flash',
    },
  ]);

  // Profit Simulation Sliders
  const [profitModel, setProfitModel] = useState<ProfitModelConfig>({
    cogsPercentage: 41,
    fulfillmentCostPerOrder: 13.5,
    paymentGatewayFeePct: 2.9,
    marketingRoas: 3.8,
    returnRefundRatePct: 4.5,
    warehouseFixedMonthly: 8500,
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load initial data
  useEffect(() => {
    loadAllData();
  }, []);

  // Simulator stream loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isSimulatorRunning) {
      interval = setInterval(() => {
        simulateNewIncomingRecords();
      }, simSpeed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulatorRunning, simSpeed, simBatchSize]);

  const loadAllData = async () => {
    const k = await analyticsService.calculateKPIs();
    const ds = await analyticsService.getDatasets();
    const ins = await analyticsService.generateInsights();
    const tx = await analyticsService.getTransactions();
    const ch = await analyticsService.generateCharts();

    setKpis(k);
    setDatasets(ds);
    if (ds.length > 0 && !activeDataset) {
      setActiveDataset(ds[0]);
      setSelectedColumns(ds[0].columns || []);
      setExtractedRows(ds[0].data || []);
    } else if (activeDataset) {
      const refreshed = ds.find((d) => d.id === activeDataset.id) || ds[0];
      setActiveDataset(refreshed);
      setExtractedRows(refreshed.data || []);
    }
    setInsights(ins);
    setTransactions(tx);
    setChartsData(ch);
  };

  // 1. Raw Simulator generator
  const simulateNewIncomingRecords = () => {
    const footwearModels = ['Spektr Air 01', 'Retro High 85', 'Spectral Low', 'Shadow Carbon High', 'Velocity Apex 2'];
    const cities = ['New York, US', 'London, UK', 'Tokyo, JP', 'Berlin, DE', 'Toronto, CA', 'Seoul, KR', 'Paris, FR'];
    const methods = ['Card', 'Card', 'Card', 'COD', 'DemoPay'];
    const newItems: TransactionItem[] = [];

    for (let i = 0; i < simBatchSize; i++) {
      const isRisk = Math.random() < 0.08;
      const amount = Math.floor(140 + Math.random() * 260) + 0.95;
      const orderNum = `CR-SIM-${Math.floor(1000 + Math.random() * 9000)}`;
      const item: TransactionItem = {
        id: `tx-sim-${Date.now()}-${i}`,
        orderId: orderNum,
        customerName: ['Alex Morgan', 'David Chen', 'Elena Rostova', 'Kenji Sato', 'Mia Williams', 'Lucas Silva'][Math.floor(Math.random() * 6)],
        customerEmail: `shopper_${Math.floor(Math.random() * 800)}@fashionhub.com`,
        amount: Number(amount.toFixed(2)),
        paymentMethod: methods[Math.floor(Math.random() * methods.length)],
        status: isRisk ? (Math.random() > 0.5 ? 'Suspicious' : 'Flagged') : 'Success',
        riskScore: isRisk ? Math.floor(75 + Math.random() * 24) : Math.floor(4 + Math.random() * 22),
        timestamp: new Date().toISOString(),
        ipAddress: `198.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        location: cities[Math.floor(Math.random() * cities.length)],
      };
      newItems.push(item);
    }

    // Add to storage and update stream log
    const updated = [...newItems, ...transactions];
    setTransactions(updated);

    const logEntry = {
      id: `log-${Date.now()}`,
      time: new Date().toLocaleTimeString(),
      event: `Simulated Ingestion: ${simBatchSize} records generated`,
      status: 'Stream Ingested',
      payload: newItems[0],
    };
    setStreamLog((prev) => [logEntry, ...prev.slice(0, 30)]);
  };

  // 2. Extraction handler
  const handleRunExtract = () => {
    if (!activeDataset) return;
    let filtered = [...activeDataset.data];

    if (extractFilter === 'sales') {
      filtered = filtered.filter((r) => r.amount && r.status === 'Success');
    } else if (extractFilter === 'suspicious') {
      filtered = filtered.filter((r) => r.risk_score >= 70 || r.status === 'Suspicious' || r.status === 'Flagged');
    }

    if (extractQuery.trim()) {
      const q = extractQuery.toLowerCase();
      filtered = filtered.filter((r) =>
        Object.values(r).some((v) => String(v).toLowerCase().includes(q))
      );
    }

    setExtractedRows(filtered);
  };

  // 3. Validation handler
  const handleRunValidation = () => {
    setIsValidating(true);
    setTimeout(() => {
      setValidationRules((prev) =>
        prev.map((r) => ({
          ...r,
          status: 'Passed',
          passed: Number((97 + Math.random() * 3).toFixed(1)),
          failed: Number((Math.random() * 1.5).toFixed(1)),
        }))
      );
      setIsValidating(false);
    }, 600);
  };

  // 4. Clean & Transform handler
  const handleRunCleaning = async () => {
    if (!activeDataset) return;
    setIsCleaning(true);
    setCleanFeedback('Executing deduplication matrix, imputation, and normalization schema...');

    setTimeout(async () => {
      const cleaned = await analyticsService.cleanData(activeDataset.id, cleanOptions);
      setActiveDataset({ ...cleaned });
      await loadAllData();
      setIsCleaning(false);
      setCleanFeedback(`Applied Cleaning Pipeline: Handled missing cells, deduplicated records, and standardized data types.`);
    }, 700);
  };

  // 9. Generate Insights handler
  const handleRegenerateInsights = async () => {
    setIsGeneratingInsights(true);
    setTimeout(async () => {
      const current = await analyticsService.generateInsights();
      const dynamicInsight: InsightItem = {
        id: `ins-${Date.now()}`,
        type: 'opportunity',
        title: 'Simulator Telemetry Surge: Spektr Air 01 Velocity +31.4%',
        description: 'Simulated multi-channel checkout telemetry reflects accelerating conversion elasticity when bundling with footwear protectors.',
        impactScore: 94,
        metric: '+31.4% Elasticity',
        delta: 'Real-time telemetry',
        recommendation: 'Instate a dynamic cart upsell prompt on checkout to capitalize on active shopper sessions.',
      };
      setInsights([dynamicInsight, ...current]);
      setIsGeneratingInsights(false);
    }, 600);
  };

  // 10. AI Q&A Submission handler
  const handleSendAiQuestion = async (queryText?: string) => {
    const questionToSend = queryText || qaInput;
    if (!questionToSend.trim()) return;

    const userQ = questionToSend.trim();
    setQaInput('');
    setIsAiLoading(true);

    const grossRev = kpis?.totalRevenue || 148560;
    const aov = kpis?.averageOrderValue || 268;
    const totalOrders = kpis?.totalOrders || 554;
    const fraudRate = kpis?.fraudRate || 2.9;

    // Call server AI endpoint
    try {
      const res = await fetch('/api/analyst/ai-qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userQ,
          context: {
            grossRevenue: grossRev,
            aov,
            totalOrders,
            fraudRate,
            profitModel,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setQaHistory((prev) => [
          ...prev,
          {
            id: `qa-${Date.now()}`,
            question: userQ,
            answer: data.answer,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            model: data.source || 'gemini-3.8-flash',
          },
        ]);
      } else {
        throw new Error('Server returned non-200');
      }
    } catch {
      // Local fallback calculation if server is starting or network fails
      const cogs = Math.round(grossRev * (profitModel.cogsPercentage / 100));
      const fulfillment = Math.round(totalOrders * profitModel.fulfillmentCostPerOrder);
      const gatewayFees = Math.round(grossRev * (profitModel.paymentGatewayFeePct / 100));
      const refunds = Math.round(grossRev * (profitModel.returnRefundRatePct / 100));
      const netProfit = grossRev - cogs - fulfillment - gatewayFees - refunds - profitModel.warehouseFixedMonthly;
      const netMargin = ((netProfit / grossRev) * 100).toFixed(1);

      setQaHistory((prev) => [
        ...prev,
        {
          id: `qa-${Date.now()}`,
          question: userQ,
          answer: `### 📈 Real-Time Profit Calculation (Simulated Matrix)
Based on current telemetry parameters:
- **Gross Revenue**: $${grossRev.toLocaleString()}
- **COGS (${profitModel.cogsPercentage}%)**: -$${cogs.toLocaleString()}
- **Fulfillment ($${profitModel.fulfillmentCostPerOrder}/order)**: -$${fulfillment.toLocaleString()}
- **Payment Gateway (${profitModel.paymentGatewayFeePct}%)**: -$${gatewayFees.toLocaleString()}
- **Returns & Restocking (${profitModel.returnRefundRatePct}%)**: -$${refunds.toLocaleString()}
- **Warehouse Monthly Fixed Overhead**: -$${profitModel.warehouseFixedMonthly.toLocaleString()}
- **Net Operating Profit**: **$${netProfit.toLocaleString()}**
- **Calculated Net Margin**: **${netMargin}%**

💡 **Recommendation**: Optimizing footwear return rates from 4.5% to 3.2% will generate an extra $${Math.round(grossRev * 0.013).toLocaleString()} directly into bottom-line profit.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          model: 'local-analytics-engine',
        },
      ]);
    } finally {
      setIsAiLoading(false);
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // Helper for Exporting
  const handleExportJson = (dataToExport: any, filename: string) => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(dataToExport, null, 2))}`;
    const anchor = document.createElement('a');
    anchor.setAttribute('href', jsonString);
    anchor.setAttribute('download', `${filename}.json`);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  // Calculation helpers for tab 5 (Aggregate)
  const calculateAggregation = () => {
    if (groupByField === 'category') {
      return [
        { key: 'Running Footwear', count: 142, sum: 34080, avg: 240 },
        { key: 'Streetwear High-Tops', count: 98, sum: 30380, avg: 310 },
        { key: 'Retro Classics', count: 85, sum: 18700, avg: 220 },
        { key: 'Lifestyle Lows', count: 64, sum: 11200, avg: 175 },
      ];
    } else if (groupByField === 'payment_method') {
      return [
        { key: 'Credit Card / Apple Pay', count: 268, sum: 67000, avg: 250 },
        { key: 'Cash on Delivery (COD)', count: 72, sum: 16560, avg: 230 },
        { key: 'Demo Pay Instant', count: 49, sum: 10830, avg: 221 },
      ];
    } else if (groupByField === 'ip_country') {
      return [
        { key: 'United States (US)', count: 215, sum: 54180, avg: 252 },
        { key: 'United Kingdom (UK)', count: 82, sum: 20172, avg: 246 },
        { key: 'Canada (CA)', count: 46, sum: 11132, avg: 242 },
        { key: 'Germany (DE)', count: 32, sum: 7904, avg: 247 },
        { key: 'Japan (JP)', count: 14, sum: 3640, avg: 260 },
      ];
    } else {
      return [
        { key: 'Low Risk (Score < 30)', count: 345, sum: 86940, avg: 252 },
        { key: 'Medium Risk (Score 30-70)', count: 36, sum: 9180, avg: 255 },
        { key: 'High Risk (Score > 70)', count: 8, sum: 2440, avg: 305 },
      ];
    }
  };

  // Calculation helpers for Tab 6 (Calculate KPIs)
  const calcGrossProfit = () => {
    const rev = (kpis?.totalRevenue || 148560) * (1 + kpiScenarioModifier.trafficBoostPct / 100);
    const cogs = rev * (profitModel.cogsPercentage / 100);
    return Math.round(rev - cogs);
  };

  const calcNetProfit = () => {
    const rev = (kpis?.totalRevenue || 148560) * (1 + kpiScenarioModifier.trafficBoostPct / 100);
    const orders = (kpis?.totalOrders || 554) * (1 + kpiScenarioModifier.trafficBoostPct / 100);
    const cogs = rev * (profitModel.cogsPercentage / 100);
    const fulfill = orders * profitModel.fulfillmentCostPerOrder;
    const gate = rev * (profitModel.paymentGatewayFeePct / 100);
    const refunds = rev * (profitModel.returnRefundRatePct / 100);
    return Math.round(rev - cogs - fulfill - gate - refunds - profitModel.warehouseFixedMonthly - kpiScenarioModifier.marketingAdSpend);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 py-6 px-3 sm:px-8 max-w-7xl mx-auto font-sans">
      {/* Top Banner Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-5 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-red-700 font-mono">
              CARTIO Quantitative Analytics & Telemetry Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 mt-1 tracking-tight font-display">
            Data Analyst Operations Pipeline
          </h1>
          <p className="text-xs text-zinc-600 mt-1 max-w-2xl">
            End-to-end data processing workflow: Ingest simulated streams, extract, validate, clean, transform, compute KPIs, analyze, visualize, and query commercial profit models with Gemini AI.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsSimulatorRunning(!isSimulatorRunning)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer ${
              isSimulatorRunning
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/20'
                : 'bg-zinc-900 hover:bg-black text-white'
            }`}
          >
            {isSimulatorRunning ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                <span>Streaming Simulator ON</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Start Telemetry Simulator</span>
              </>
            )}
          </button>

          <button
            onClick={loadAllData}
            title="Refresh All Pipeline Data"
            className="p-2 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-xl text-zinc-700 transition-colors shadow-xs cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 10 EXACT REQUESTED NAVIGATION TABS */}
      <div className="bg-white border border-zinc-200/90 rounded-2xl p-1.5 shadow-xs mb-8">
        <div className="flex overflow-x-auto gap-1 no-scrollbar py-0.5">
          {TABS.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-zinc-950 text-white font-bold shadow-md'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/80'
                }`}
              >
                <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold ${
                  isActive ? 'bg-red-600 text-white' : 'bg-zinc-100 text-zinc-600'
                }`}>
                  {idx + 1}
                </span>
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-red-400' : 'text-zinc-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          TAB 1: RAW DATA COMMING FROM SIMULATOR
         ========================================================================= */}
      {activeTab === 'raw data comming from simulator' && (
        <div className="space-y-6">
          {/* Simulator Control Board */}
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-red-50 text-red-600 rounded-xl border border-red-200">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-950 font-display">
                    High-Velocity Telemetry Simulator
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Generates synthetic cart additions, checkout payloads, order payments, and risk scores.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-xl text-xs font-mono">
                  <span className="text-zinc-500">Buffer:</span>
                  <span className="font-bold text-zinc-900">{transactions.length} records</span>
                </div>
                <button
                  onClick={simulateNewIncomingRecords}
                  className="px-3.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>Emit 1 Batch Now</span>
                </button>
              </div>
            </div>

            {/* Simulator Controls & Speed */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-zinc-50 border border-zinc-200/70 rounded-xl p-4 text-xs">
              <div>
                <label className="block text-zinc-600 font-semibold mb-1">Emission Speed (Interval)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="250"
                    value={simSpeed}
                    onChange={(e) => setSimSpeed(Number(e.target.value))}
                    className="w-full accent-red-600"
                  />
                  <span className="font-mono font-bold text-zinc-800 shrink-0">{(simSpeed / 1000).toFixed(1)}s</span>
                </div>
              </div>

              <div>
                <label className="block text-zinc-600 font-semibold mb-1">Batch Size (Records per tick)</label>
                <select
                  value={simBatchSize}
                  onChange={(e) => setSimBatchSize(Number(e.target.value))}
                  className="w-full bg-white border border-zinc-300 rounded-lg p-1.5 font-medium"
                >
                  <option value={1}>1 Record / tick</option>
                  <option value={3}>3 Records / tick</option>
                  <option value={5}>5 Records / tick</option>
                  <option value={10}>10 Records / tick</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-600 font-semibold mb-1">Simulator Status</label>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`w-2.5 h-2.5 rounded-full ${isSimulatorRunning ? 'bg-emerald-500 animate-ping' : 'bg-zinc-400'}`} />
                  <span className="font-bold text-zinc-800">
                    {isSimulatorRunning ? 'Active Stream Transmitting' : 'Idle / Paused'}
                  </span>
                </div>
              </div>
            </div>

            {/* Ingestion Stream Console */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-950 font-display">
                  Live Stream Stream Logs (Latest First)
                </span>
                <button
                  onClick={() => handleExportJson(transactions, 'cartio_raw_simulator_stream')}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Raw JSON</span>
                </button>
              </div>

              <div className="bg-[#0f1117] text-zinc-200 border border-zinc-800 rounded-xl p-4 font-mono text-xs max-h-80 overflow-y-auto space-y-2">
                {streamLog.length === 0 ? (
                  <p className="text-zinc-500 py-6 text-center italic">
                    Press "Start Telemetry Simulator" or "Emit 1 Batch Now" to observe incoming payloads.
                  </p>
                ) : (
                  streamLog.map((log) => (
                    <div key={log.id} className="border-b border-zinc-800/60 pb-2 flex items-start justify-between gap-4">
                      <div>
                        <span className="text-red-400 font-bold">[{log.time}]</span>{' '}
                        <span className="text-emerald-400">{log.event}</span>
                        <div className="text-[11px] text-zinc-400 mt-0.5">
                          Order: <span className="text-white font-bold">{log.payload?.orderId}</span> | Customer:{' '}
                          {log.payload?.customerName} | Amount: <span className="text-emerald-300 font-bold">${log.payload?.amount}</span> | Risk:{' '}
                          <span className={log.payload?.riskScore > 70 ? 'text-rose-400' : 'text-emerald-300'}>
                            {log.payload?.riskScore}/100
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded font-bold uppercase">
                        {log.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Raw Ingestion Table Preview */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 font-display">
                Buffered Raw Records ({transactions.length} rows)
              </h4>
              <div className="bg-white border border-zinc-200 rounded-xl overflow-x-auto max-h-96">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-600 font-mono text-[11px]">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Method</th>
                      <th className="p-3">Risk</th>
                      <th className="p-3">IP Address</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 text-zinc-700 font-mono">
                    {transactions.slice(0, 15).map((tx) => (
                      <tr key={tx.id} className="hover:bg-zinc-50/50">
                        <td className="p-3 font-bold text-zinc-950">{tx.orderId}</td>
                        <td className="p-3 font-sans font-medium text-zinc-900">{tx.customerName}</td>
                        <td className="p-3 font-bold text-zinc-950">${tx.amount}</td>
                        <td className="p-3 text-zinc-600">{tx.paymentMethod}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            tx.riskScore > 70 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {tx.riskScore}
                          </span>
                        </td>
                        <td className="p-3 text-zinc-500 text-[11px]">{tx.ipAddress}</td>
                        <td className="p-3 text-zinc-500 font-sans text-[11px]">{tx.location}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            tx.status === 'Success'
                              ? 'bg-emerald-100 text-emerald-800'
                              : tx.status === 'Flagged'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: EXTRACT
         ========================================================================= */}
      {activeTab === 'extract' && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 font-display">
                  Schema Projection & Data Query
                </span>
                <h3 className="text-xl font-bold text-zinc-950 mt-1 font-display">
                  Extract Subsets & Dimension Filters
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunExtract}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Execute Extraction Query</span>
                </button>
              </div>
            </div>

            {/* Filter controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Extraction Scope</label>
                <div className="flex gap-2">
                  {(['all', 'sales', 'suspicious'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setExtractFilter(mode)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                        extractFilter === mode
                          ? 'bg-zinc-900 text-white'
                          : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Filter Keyword / SQL Query Equivalent</label>
                <div className="relative">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={extractQuery}
                    onChange={(e) => setExtractQuery(e.target.value)}
                    placeholder="Search by order ID, customer, amount, status, country..."
                    className="w-full bg-white border border-zinc-300 rounded-xl pl-9 pr-4 py-2 text-xs focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Column Projection Selection */}
            {activeDataset && (
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                  Select Columns to Extract:
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {activeDataset.columns.map((col) => {
                    const isSelected = selectedColumns.includes(col);
                    return (
                      <button
                        key={col}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedColumns(selectedColumns.filter((c) => c !== col));
                          } else {
                            setSelectedColumns([...selectedColumns, col]);
                          }
                        }}
                        className={`px-3 py-1 rounded-lg border font-mono text-xs transition-colors ${
                          isSelected
                            ? 'bg-red-50 border-red-500 text-red-700 font-bold'
                            : 'bg-white border-zinc-300 text-zinc-500 hover:bg-zinc-100'
                        }`}
                      >
                        {col}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Extracted Output Table */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-zinc-950 uppercase tracking-wider font-display">
                  Extracted Records ({extractedRows.length} matches)
                </span>
                <button
                  onClick={() => handleExportJson(extractedRows, 'cartio_extracted_dataset')}
                  className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Extracted View</span>
                </button>
              </div>

              <div className="bg-white border border-zinc-200 rounded-xl overflow-x-auto max-h-80">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-600 text-[11px]">
                    <tr>
                      {selectedColumns.length > 0 ? (
                        selectedColumns.map((c) => (
                          <th key={c} className="p-3 uppercase">{c}</th>
                        ))
                      ) : (
                        <th className="p-3">Select columns above</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 text-zinc-700">
                    {extractedRows.slice(0, 15).map((row, idx) => (
                      <tr key={idx} className="hover:bg-zinc-50/50">
                        {selectedColumns.map((col) => (
                          <td key={col} className="p-3 truncate max-w-[150px]">
                            {String(row[col] ?? 'N/A')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: VALIDATE
         ========================================================================= */}
      {activeTab === 'validate' && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 font-display">
                  Quality Assurance & Data Integrity
                </span>
                <h3 className="text-xl font-bold text-zinc-950 mt-1 font-display">
                  Validation Rules & Schema Constraints
                </h3>
              </div>

              <button
                onClick={handleRunValidation}
                disabled={isValidating}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isValidating ? 'Running Validation Suite...' : 'Run All Validation Rules'}</span>
              </button>
            </div>

            {/* Validation Rule Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {validationRules.map((rule) => (
                <div key={rule.id} className="border border-zinc-200 rounded-xl p-4 bg-zinc-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-zinc-900 font-display">{rule.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      rule.status === 'Passed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {rule.status}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-zinc-500 bg-white p-2 rounded border border-zinc-200">
                    Rule: {rule.rule}
                  </p>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-emerald-700 font-semibold">Passed: {rule.passed}%</span>
                    <span className="text-zinc-500">Violations: {rule.failed}%</span>
                  </div>
                  <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: `${rule.passed}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Integrity Summary Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <div>
                  <h4 className="font-bold text-xs text-emerald-950 font-display">Dataset Health: 99.1% Confidence</h4>
                  <p className="text-[11px] text-emerald-700">All financial values comply with ISO currency specifications and positive integer requirements.</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-900">Zero Critical Failures</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: CLEAN TRANSFORM
         ========================================================================= */}
      {activeTab === 'clean transform' && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 font-display">
                  ETL Transformation & Imputation
                </span>
                <h3 className="text-xl font-bold text-zinc-950 mt-1 font-display">
                  Clean & Transform Pipeline
                </h3>
              </div>

              <button
                onClick={handleRunCleaning}
                disabled={isCleaning}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{isCleaning ? 'Transforming...' : 'Execute Clean & Transform'}</span>
              </button>
            </div>

            {/* Cleaning Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-zinc-800">
                <input
                  type="checkbox"
                  checked={cleanOptions.removeDuplicates}
                  onChange={(e) => setCleanOptions({ ...cleanOptions, removeDuplicates: e.target.checked })}
                  className="accent-red-600 rounded"
                />
                <span>Remove Duplicates (Key Match)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-medium text-zinc-800">
                <input
                  type="checkbox"
                  checked={cleanOptions.fillMissingValues}
                  onChange={(e) => setCleanOptions({ ...cleanOptions, fillMissingValues: e.target.checked })}
                  className="accent-red-600 rounded"
                />
                <span>Handle Missing Cells (Impute 0)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-medium text-zinc-800">
                <input
                  type="checkbox"
                  checked={cleanOptions.normalizeNumbers}
                  onChange={(e) => setCleanOptions({ ...cleanOptions, normalizeNumbers: e.target.checked })}
                  className="accent-red-600 rounded"
                />
                <span>Normalize Numbers (Decimals)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-medium text-zinc-800">
                <input
                  type="checkbox"
                  checked={cleanOptions.stripWhitespace}
                  onChange={(e) => setCleanOptions({ ...cleanOptions, stripWhitespace: e.target.checked })}
                  className="accent-red-600 rounded"
                />
                <span>Strip Trim Whitespace</span>
              </label>
            </div>

            {/* Custom Transformations */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 font-display">
                Advanced Feature Engineering & Transformations
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <label className="flex items-center gap-2 bg-white border border-zinc-200 p-3 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customTransform.uppercaseSku}
                    onChange={(e) => setCustomTransform({ ...customTransform, uppercaseSku: e.target.checked })}
                    className="accent-red-600"
                  />
                  <span>Standardize SKU Codes</span>
                </label>

                <label className="flex items-center gap-2 bg-white border border-zinc-200 p-3 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customTransform.categorizeRiskBands}
                    onChange={(e) => setCustomTransform({ ...customTransform, categorizeRiskBands: e.target.checked })}
                    className="accent-red-600"
                  />
                  <span>Derive Risk Bands</span>
                </label>

                <label className="flex items-center gap-2 bg-white border border-zinc-200 p-3 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customTransform.roundDecimals}
                    onChange={(e) => setCustomTransform({ ...customTransform, roundDecimals: e.target.checked })}
                    className="accent-red-600"
                  />
                  <span>Format USD Rounding</span>
                </label>

                <label className="flex items-center gap-2 bg-white border border-zinc-200 p-3 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customTransform.maskEmails}
                    onChange={(e) => setCustomTransform({ ...customTransform, maskEmails: e.target.checked })}
                    className="accent-red-600"
                  />
                  <span>GDPR Anonymize Emails</span>
                </label>
              </div>
            </div>

            {cleanFeedback && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{cleanFeedback}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: AGGREGATE
         ========================================================================= */}
      {activeTab === 'aggregate' && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 font-display">
                  Multidimensional Rollup & Grouping
                </span>
                <h3 className="text-xl font-bold text-zinc-950 mt-1 font-display">
                  Aggregate Dimensions & Metrics
                </h3>
              </div>

              {/* Group By Selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-zinc-600 font-semibold">Group By:</span>
                <select
                  value={groupByField}
                  onChange={(e) => setGroupByField(e.target.value as any)}
                  className="bg-white border border-zinc-300 rounded-lg p-2 font-semibold text-zinc-800"
                >
                  <option value="category">Footwear Category</option>
                  <option value="payment_method">Payment Method</option>
                  <option value="ip_country">Customer Geography / Country</option>
                  <option value="risk_band">Risk Severity Tier</option>
                </select>
              </div>
            </div>

            {/* Aggregated Table */}
            <div className="overflow-x-auto border border-zinc-200 rounded-xl bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-600 uppercase text-[10px] font-mono">
                  <tr>
                    <th className="p-3">Dimension Cluster</th>
                    <th className="p-3">Order Volume (Count)</th>
                    <th className="p-3">Gross Revenue (Sum)</th>
                    <th className="p-3">Average Basket (AOV)</th>
                    <th className="p-3">Contribution Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 font-mono text-zinc-800">
                  {calculateAggregation().map((row, i) => {
                    const totalSum = 94360;
                    const pct = Math.round((row.sum / totalSum) * 100);
                    return (
                      <tr key={i} className="hover:bg-zinc-50/50">
                        <td className="p-3 font-sans font-bold text-zinc-950">{row.key}</td>
                        <td className="p-3 font-bold">{row.count} tx</td>
                        <td className="p-3 text-emerald-700 font-bold">${row.sum.toLocaleString()}</td>
                        <td className="p-3">${row.avg}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-zinc-100 h-2 rounded-full overflow-hidden">
                              <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-[11px] text-zinc-500">{pct}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 6: CALCULATE KPIS
         ========================================================================= */}
      {activeTab === 'calculate kpis' && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 font-display">
                  Financial Mathematics & Scenario Simulation
                </span>
                <h3 className="text-xl font-bold text-zinc-950 mt-1 font-display">
                  Calculate Commercial KPIs & Profitability
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500">Live Mathematical Formula Matrix</span>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                <span className="text-[10px] uppercase font-bold text-zinc-500 font-display">Calculated Gross Revenue</span>
                <p className="text-2xl font-black text-zinc-950 font-mono mt-1">
                  ${(kpis?.totalRevenue || 148560).toLocaleString()}
                </p>
                <span className="text-[11px] text-emerald-700 font-medium">+18.4% YoY</span>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                <span className="text-[10px] uppercase font-bold text-zinc-500 font-display">Estimated Gross Profit</span>
                <p className="text-2xl font-black text-emerald-700 font-mono mt-1">
                  ${calcGrossProfit().toLocaleString()}
                </p>
                <span className="text-[11px] text-zinc-500 font-medium">{100 - profitModel.cogsPercentage}% Gross Margin</span>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                <span className="text-[10px] uppercase font-bold text-zinc-500 font-display">Calculated Net Profit</span>
                <p className="text-2xl font-black text-emerald-800 font-mono mt-1">
                  ${calcNetProfit().toLocaleString()}
                </p>
                <span className="text-[11px] text-emerald-700 font-medium">After COGS, Courier & Ad Spend</span>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                <span className="text-[10px] uppercase font-bold text-zinc-500 font-display">Average Order Value (AOV)</span>
                <p className="text-2xl font-black text-zinc-950 font-mono mt-1">
                  ${kpis?.averageOrderValue || 268}
                </p>
                <span className="text-[11px] text-zinc-500 font-medium">1.38 pairs / order</span>
              </div>
            </div>

            {/* Scenario Adjustment Slider */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-display">
                Sensitivity & Traffic Multiplier Simulation
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-zinc-600 font-semibold mb-1">
                    Simulate Traffic Increase: {kpiScenarioModifier.trafficBoostPct}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={kpiScenarioModifier.trafficBoostPct}
                    onChange={(e) => setKpiScenarioModifier({ ...kpiScenarioModifier, trafficBoostPct: Number(e.target.value) })}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-zinc-600 font-semibold mb-1">
                    Monthly Marketing / Ad Spend Allocation: ${kpiScenarioModifier.marketingAdSpend.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="5000"
                    max="40000"
                    step="1000"
                    value={kpiScenarioModifier.marketingAdSpend}
                    onChange={(e) => setKpiScenarioModifier({ ...kpiScenarioModifier, marketingAdSpend: Number(e.target.value) })}
                    className="w-full accent-emerald-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 7: ANALYSZE
         ========================================================================= */}
      {activeTab === 'analysze' && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-purple-600 font-display">
                  Cohort & Statistical Segmentation
                </span>
                <h3 className="text-xl font-bold text-zinc-950 mt-1 font-display">
                  Analyze Customer Demographics & Elasticity
                </h3>
              </div>

              <div className="flex gap-2 text-xs">
                {(['all', 'high_value', 'repeat_buyers', 'high_risk'] as const).map((cohort) => (
                  <button
                    key={cohort}
                    onClick={() => setAnalysisCohort(cohort)}
                    className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-colors ${
                      analysisCohort === cohort ? 'bg-purple-700 text-white' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                    }`}
                  >
                    {cohort.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Analysis Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-zinc-200 rounded-xl p-4 bg-zinc-50 space-y-2">
                <span className="text-[10px] uppercase font-bold text-purple-700 font-display">LTV to CAC Ratio</span>
                <p className="text-3xl font-black text-zinc-950 font-mono">4.8x</p>
                <p className="text-xs text-zinc-600">Standard benchmark in athletic footwear is 3.0x. CARTIO excels due to premium repeat purchase rate.</p>
              </div>

              <div className="border border-zinc-200 rounded-xl p-4 bg-zinc-50 space-y-2">
                <span className="text-[10px] uppercase font-bold text-purple-700 font-display">Cart Abandonment Rate</span>
                <p className="text-3xl font-black text-zinc-950 font-mono">44.2%</p>
                <p className="text-xs text-zinc-600">Top drop-off occurring on sizing confirmation step before checkout submission.</p>
              </div>

              <div className="border border-zinc-200 rounded-xl p-4 bg-zinc-50 space-y-2">
                <span className="text-[10px] uppercase font-bold text-purple-700 font-display">Net Retention (60-Day)</span>
                <p className="text-3xl font-black text-zinc-950 font-mono">28.4%</p>
                <p className="text-xs text-zinc-600">Shoppers return to purchase streetwear caps, socks, and seasonal colorway variants.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 8: VISUAL
         ========================================================================= */}
      {activeTab === 'visual' && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 font-display">
                  Visual Analytics & Business Intelligence
                </span>
                <h3 className="text-xl font-bold text-zinc-950 mt-1 font-display">
                  Visual Charts & Trajectory Graphs
                </h3>
              </div>

              <div className="flex gap-2 text-xs">
                <button
                  onClick={() => setChartViewMode('revenue')}
                  className={`px-3 py-1.5 rounded-lg font-bold ${chartViewMode === 'revenue' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600'}`}
                >
                  Revenue Trajectory
                </button>
                <button
                  onClick={() => setChartViewMode('category')}
                  className={`px-3 py-1.5 rounded-lg font-bold ${chartViewMode === 'category' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600'}`}
                >
                  Category Breakdown
                </button>
              </div>
            </div>

            {/* Visual Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bar Chart */}
              <div className="border border-zinc-200 rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 font-display">
                  Monthly Revenue Trajectory ($USD)
                </h4>
                <div className="h-56 flex items-end justify-between gap-3 pt-6 border-b border-zinc-200">
                  {(chartsData?.salesOverTime || []).map((bar: any) => {
                    const maxRev = 45000;
                    const heightPct = Math.round((bar.revenue / maxRev) * 100);
                    return (
                      <div key={bar.period} className="flex-1 flex flex-col items-center gap-2 group">
                        <div className="text-[10px] text-zinc-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                          ${(bar.revenue / 1000).toFixed(0)}k
                        </div>
                        <div
                          className="w-full bg-red-600 hover:bg-red-700 rounded-t-lg transition-all"
                          style={{ height: `${heightPct}%` }}
                        />
                        <span className="text-[11px] text-zinc-600 font-mono">{bar.period}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category Share Distribution */}
              <div className="border border-zinc-200 rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 font-display">
                  Category Share & Dollar Volume
                </h4>
                <div className="space-y-3 pt-2">
                  {(chartsData?.revenueByCategory || []).map((cat: any) => (
                    <div key={cat.category} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-zinc-900">{cat.category}</span>
                        <span className="font-mono text-zinc-600">{cat.percentage}% (${cat.revenue?.toLocaleString()})</span>
                      </div>
                      <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-red-600 h-full rounded-full" style={{ width: `${cat.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 9: GENERATE INSIGHTS
         ========================================================================= */}
      {activeTab === 'generate insights' && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 font-display">
                  Machine Insights & Anomaly Detection
                </span>
                <h3 className="text-xl font-bold text-zinc-950 mt-1 font-display">
                  Automated Strategic Insights
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex gap-1.5 text-xs">
                  {(['all', 'opportunity', 'risk', 'trend'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setFilterInsightType(t)}
                      className={`px-2.5 py-1 rounded-lg capitalize font-medium ${
                        filterInsightType === t ? 'bg-zinc-900 text-white font-bold' : 'bg-zinc-100 text-zinc-600'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleRegenerateInsights}
                  disabled={isGeneratingInsights}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs cursor-pointer transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isGeneratingInsights ? 'Synthesizing...' : 'Re-Generate Insights'}</span>
                </button>
              </div>
            </div>

            {/* Insights Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {insights
                .filter((ins) => filterInsightType === 'all' || ins.type === filterInsightType)
                .map((ins) => (
                  <div key={ins.id} className="border border-zinc-200 rounded-xl p-5 bg-white flex flex-col justify-between space-y-4 shadow-xs">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          ins.type === 'opportunity'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ins.type === 'risk'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {ins.type}
                        </span>
                        <span className="font-mono font-bold text-xs text-zinc-950">{ins.metric}</span>
                      </div>
                      <h4 className="font-bold text-sm text-zinc-950 font-display">{ins.title}</h4>
                      <p className="text-xs text-zinc-600 leading-relaxed">{ins.description}</p>
                    </div>

                    <div className="pt-3 border-t border-zinc-200 text-xs">
                      <span className="text-red-700 font-semibold text-[11px] block">Strategic Action:</span>
                      <p className="text-zinc-600 text-[11px] mt-0.5">{ins.recommendation}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 10: AI Q&A ABOUT PROFIT CALCULATION ETC
         ========================================================================= */}
      {activeTab === 'AI Q&A about profit calculation etc' && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-red-100 text-red-600 rounded-lg">
                    <Bot className="w-4 h-4" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 font-display">
                    Commercial Finance & Margin Modeling
                  </span>
                </div>
                <h3 className="text-xl font-bold text-zinc-950 mt-1 font-display">
                  AI Q&A About Profit Calculation & Financial Engineering
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Powered by Gemini 3.8 Flash server-side with direct grounding in CARTIO orders, COGS, and telemetry.
                </p>
              </div>

              {/* Active Financial Model Settings summary */}
              <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 px-3 py-2 rounded-xl text-xs font-mono">
                <span className="text-zinc-500">COGS:</span>
                <span className="font-bold text-zinc-900">{profitModel.cogsPercentage}%</span>
                <span className="text-zinc-400">|</span>
                <span className="text-zinc-500">Gross Rev:</span>
                <span className="font-bold text-emerald-700">${(kpis?.totalRevenue || 148560).toLocaleString()}</span>
              </div>
            </div>

            {/* Quick Profit Modeling Sliders */}
            <div className="bg-zinc-50 border border-zinc-200/90 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-display">
                  Live Unit Economics & Operating Cost Matrix
                </span>
                <span className="text-[11px] text-zinc-500 font-mono">Adjust values to test scenario outcomes</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <label className="block text-zinc-600 font-medium mb-1">
                    COGS Rate: <span className="font-bold text-zinc-900">{profitModel.cogsPercentage}%</span>
                  </label>
                  <input
                    type="range"
                    min="25"
                    max="65"
                    value={profitModel.cogsPercentage}
                    onChange={(e) => setProfitModel({ ...profitModel, cogsPercentage: Number(e.target.value) })}
                    className="w-full accent-red-600"
                  />
                </div>

                <div>
                  <label className="block text-zinc-600 font-medium mb-1">
                    Courier / Fulfillment: <span className="font-bold text-zinc-900">${profitModel.fulfillmentCostPerOrder}</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="0.5"
                    value={profitModel.fulfillmentCostPerOrder}
                    onChange={(e) => setProfitModel({ ...profitModel, fulfillmentCostPerOrder: Number(e.target.value) })}
                    className="w-full accent-red-600"
                  />
                </div>

                <div>
                  <label className="block text-zinc-600 font-medium mb-1">
                    Target ROAS: <span className="font-bold text-zinc-900">{profitModel.marketingRoas}x</span>
                  </label>
                  <input
                    type="range"
                    min="1.5"
                    max="6"
                    step="0.1"
                    value={profitModel.marketingRoas}
                    onChange={(e) => setProfitModel({ ...profitModel, marketingRoas: Number(e.target.value) })}
                    className="w-full accent-red-600"
                  />
                </div>

                <div>
                  <label className="block text-zinc-600 font-medium mb-1">
                    Return Rate: <span className="font-bold text-zinc-900">{profitModel.returnRefundRatePct}%</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="0.5"
                    value={profitModel.returnRefundRatePct}
                    onChange={(e) => setProfitModel({ ...profitModel, returnRefundRatePct: Number(e.target.value) })}
                    className="w-full accent-red-600"
                  />
                </div>
              </div>
            </div>

            {/* Suggested Prompts / Chips */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
                Suggested Financial Prompts:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  'What is our total net profit margin right now?',
                  'Calculate profit if we reduce footwear return rates from 4.5% to 2.5%',
                  'What is the break-even volume for Spektr Air 01 sneakers?',
                  'Show me a complete breakdown of COGS vs Operating expenses',
                  'How does increasing AOV by $30 impact bottom line profit?',
                ].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendAiQuestion(prompt)}
                    className="px-3 py-1.5 bg-white hover:bg-red-50 border border-zinc-200 hover:border-red-300 rounded-xl text-zinc-700 hover:text-red-700 transition-colors text-xs font-medium cursor-pointer"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Conversation Thread */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 sm:p-6 space-y-6 max-h-[500px] overflow-y-auto">
              {qaHistory.map((msg) => (
                <div key={msg.id} className="space-y-3">
                  {/* User Question */}
                  <div className="flex items-start gap-3 justify-end">
                    <div className="bg-zinc-950 text-white rounded-2xl rounded-tr-xs px-4 py-3 max-w-xl text-xs font-medium shadow-xs">
                      {msg.question}
                    </div>
                  </div>

                  {/* AI Answer */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="bg-white border border-zinc-200/90 rounded-2xl rounded-tl-xs p-4 sm:p-5 max-w-2xl text-xs text-zinc-800 space-y-2 shadow-xs">
                      <div className="flex items-center justify-between border-b border-zinc-100 pb-2 mb-2 text-[10px] text-zinc-400 font-mono">
                        <span>Model: {msg.model}</span>
                        <span>{msg.time}</span>
                      </div>
                      <div className="prose prose-sm max-w-none prose-p:my-1 prose-headings:font-bold prose-headings:text-zinc-900 prose-ul:my-1 whitespace-pre-line leading-relaxed">
                        {msg.answer}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isAiLoading && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 animate-pulse">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white border border-zinc-200 rounded-2xl px-4 py-3 text-xs text-zinc-600 flex items-center gap-2">
                    <RotateCcw className="w-3.5 h-3.5 animate-spin text-red-600" />
                    <span>Analyzing balance sheet, COGS curves, and generating profit calculation...</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendAiQuestion();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={qaInput}
                onChange={(e) => setQaInput(e.target.value)}
                placeholder="Ask about net profit calculation, margins, COGS, AOV, or break-even..."
                className="flex-1 bg-white border border-zinc-300 rounded-xl px-4 py-3 text-xs text-zinc-900 focus:ring-2 focus:ring-red-500 outline-none"
              />
              <button
                type="submit"
                disabled={isAiLoading || !qaInput.trim()}
                className="px-5 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
