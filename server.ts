
import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT
  ? parseInt(process.env.PORT, 10)
  : 3000;

app.use(express.json({ limit: '10mb' }));

// --------------------------------------------------
// Helpers: validate financial values
// --------------------------------------------------

function getNonNegativeNumber(
  value: unknown,
  fallback: number
): number {
  if (
    typeof value === 'number' &&
    Number.isFinite(value) &&
    value >= 0
  ) {
    return value;
  }

  return fallback;
}

function formatCurrency(value: number): string {
  return `$${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// --------------------------------------------------
// Data Analyst Q&A API
// POST /api/analyst/ai-qa
//
// This is a rule-based calculator, not an AI model.
// --------------------------------------------------

app.post('/api/analyst/ai-qa', (req, res) => {
  try {
    const { question, context } = req.body ?? {};

    if (
      typeof question !== 'string' ||
      question.trim().length === 0
    ) {
      res.status(400).json({
        error: 'Please provide a question.',
      });
      return;
    }

    if (question.length > 2000) {
      res.status(400).json({
        error: 'Question must be 2,000 characters or fewer.',
      });
      return;
    }

    const normalizedQuestion = question.toLowerCase();

    // Use supplied metrics when available.
    // Defaults are illustrative demo values, not verified sales.
    const grossRevenue = getNonNegativeNumber(
      context?.grossRevenue,
      148560
    );

    const totalOrders = getNonNegativeNumber(
      context?.totalOrders,
      554
    );

    const cogsRate = 0.42;
    const logisticsRate = 0.08;
    const paymentRate = 0.029;

    const cogs = grossRevenue * cogsRate;
    const logistics = grossRevenue * logisticsRate;
    const paymentFees = grossRevenue * paymentRate;

    const netProfit =
      grossRevenue - cogs - logistics - paymentFees;

    const grossProfit = grossRevenue - cogs;

    const netMargin =
      grossRevenue > 0
        ? (netProfit / grossRevenue) * 100
        : 0;

    const grossMargin =
      grossRevenue > 0
        ? (grossProfit / grossRevenue) * 100
        : 0;

    const averageOrderValue =
      totalOrders > 0
        ? grossRevenue / totalOrders
        : 0;

    let answer: string;

    const asksAboutProfit =
      normalizedQuestion.includes('profit') ||
      normalizedQuestion.includes('margin');

    const asksAboutOrders =
      normalizedQuestion.includes('order') ||
      normalizedQuestion.includes('aov') ||
      normalizedQuestion.includes('average order value') ||
      normalizedQuestion.includes('basket');

    const asksAboutCosts =
      normalizedQuestion.includes('cogs') ||
      normalizedQuestion.includes('cost') ||
      normalizedQuestion.includes('production') ||
      normalizedQuestion.includes('expense');

    const asksAboutRevenue =
      normalizedQuestion.includes('revenue') ||
      normalizedQuestion.includes('sales') ||
      normalizedQuestion.includes('income');

    if (asksAboutProfit) {
      answer = [
        '## Profit and Margin Summary',
        '',
        `- Gross revenue: ${formatCurrency(grossRevenue)}`,
        `- Estimated cost of goods sold (42%): ${formatCurrency(cogs)}`,
        `- Estimated logistics costs (8%): ${formatCurrency(logistics)}`,
        `- Estimated payment fees (2.9%): ${formatCurrency(paymentFees)}`,
        `- Estimated gross profit: ${formatCurrency(grossProfit)}`,
        `- Estimated gross margin: ${grossMargin.toFixed(2)}%`,
        `- Estimated net operating profit: ${formatCurrency(netProfit)}`,
        `- Estimated net operating margin: ${netMargin.toFixed(2)}%`,
        '',
        'Calculation:',
        'Estimated operating profit = revenue - COGS - logistics - payment fees.',
        '',
        'Note: Cost percentages are demonstration assumptions. This estimate excludes any other expenses not supplied in the context.',
      ].join('\n');
    } else if (asksAboutOrders) {
      answer = [
        '## Order Summary',
        '',
        `- Gross revenue: ${formatCurrency(grossRevenue)}`,
        `- Total orders: ${totalOrders.toLocaleString('en-US')}`,
        `- Average order value: ${formatCurrency(averageOrderValue)}`,
        '',
        'Formula: Average order value = gross revenue / total orders.',
        '',
        'Note: This result uses the supplied context or illustrative demo values.',
      ].join('\n');
    } else if (asksAboutCosts) {
      answer = [
        '## Cost Summary',
        '',
        `- Gross revenue: ${formatCurrency(grossRevenue)}`,
        `- Assumed COGS rate: ${(cogsRate * 100).toFixed(1)}%`,
        `- Estimated COGS: ${formatCurrency(cogs)}`,
        `- Assumed logistics rate: ${(logisticsRate * 100).toFixed(1)}%`,
        `- Estimated logistics costs: ${formatCurrency(logistics)}`,
        `- Assumed payment fee rate: ${(paymentRate * 100).toFixed(1)}%`,
        `- Estimated payment fees: ${formatCurrency(paymentFees)}`,
        '',
        'Note: These rates are illustrative assumptions, not verified supplier or payment-provider costs.',
      ].join('\n');
    } else if (asksAboutRevenue) {
      answer = [
        '## Revenue Summary',
        '',
        `- Gross revenue: ${formatCurrency(grossRevenue)}`,
        `- Total orders: ${totalOrders.toLocaleString('en-US')}`,
        `- Average order value: ${formatCurrency(averageOrderValue)}`,
        '',
        'Note: Use actual sales data for a reliable business report.',
      ].join('\n');
    } else {
      answer = [
        '## Cartio Financial Calculator',
        '',
        'I can answer basic questions about the available financial metrics.',
        '',
        'Try asking:',
        '- What is the estimated net profit?',
        '- Calculate the profit margin.',
        '- What is the average order value?',
        '- Explain the estimated production costs.',
        '- Summarize the revenue.',
        '',
        `Current revenue value: ${formatCurrency(grossRevenue)}`,
        `Current order count: ${totalOrders.toLocaleString('en-US')}`,
        '',
        'This tool uses predefined rules and formulas. It does not understand arbitrary questions like a generative AI model.',
      ].join('\n');
    }

    const isUsingDemoDefaults =
      context?.grossRevenue === undefined ||
      context?.totalOrders === undefined;

    res.json({
      answer,
      source: 'rule-based-analytics',
      demoData: isUsingDemoDefaults,
      metrics: {
        grossRevenue,
        totalOrders,
        estimatedCogs: cogs,
        estimatedLogistics: logistics,
        estimatedPaymentFees: paymentFees,
        estimatedGrossProfit: grossProfit,
        estimatedNetProfit: netProfit,
        estimatedGrossMarginPercent: grossMargin,
        estimatedNetMarginPercent: netMargin,
        averageOrderValue,
      },
    });
  } catch (error) {
    console.error('Data Analyst Q&A error:', error);

    res.status(500).json({
      error: 'An internal error occurred while calculating the result.',
    });
  }
});

// --------------------------------------------------
// Start Vite development server or serve production
// --------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(
      `Cartio server running on port ${PORT}`
    );
  });
}

startServer().catch((error) => {
  console.error('Failed to start Cartio server:', error);
  process.exit(1);
});
