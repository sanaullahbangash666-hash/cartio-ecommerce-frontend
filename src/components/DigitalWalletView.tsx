import React, { useState } from 'react';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Send,
  PlusCircle,
  Building,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ShoppingBag,
  CreditCard,
  Copy,
  Check,
  RefreshCw,
  TrendingUp,
} from 'lucide-react';
import { UserWallet, WalletTransaction, User } from '../types';
import { storage } from '../services/storage';

interface DigitalWalletViewProps {
  currentUser: User | null;
  onNavigateToShop?: () => void;
  onNavigateToOrders?: () => void;
}

export const DigitalWalletView: React.FC<DigitalWalletViewProps> = ({
  currentUser,
  onNavigateToShop,
  onNavigateToOrders,
}) => {
  const [wallet, setWallet] = useState<UserWallet>(() => storage.getWallet(currentUser?.id));
  const [activeModal, setActiveModal] = useState<'deposit' | 'withdraw' | 'transfer' | null>(null);

  // Form states
  const [depositAmount, setDepositAmount] = useState<string>('150');
  const [depositMethod, setDepositMethod] = useState<'card' | 'bank' | 'apple_pay'>('bank');

  const [withdrawAmount, setWithdrawAmount] = useState<string>('100');
  const [selectedBank, setSelectedBank] = useState<string>('4892');

  const [transferRecipient, setTransferRecipient] = useState<string>('');
  const [transferAmount, setTransferAmount] = useState<string>('50');
  const [transferNote, setTransferNote] = useState<string>('Sneaker split payment');

  const [alertNotice, setAlertNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [copiedWalletNum, setCopiedWalletNum] = useState(false);
  const [txFilter, setTxFilter] = useState<'all' | 'orders' | 'transfers' | 'deposits_withdrawals'>('all');

  const refreshWallet = () => {
    setWallet(storage.getWallet(currentUser?.id));
  };

  const handleCopyWalletNumber = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(wallet.walletNumber);
      setCopiedWalletNum(true);
      setTimeout(() => setCopiedWalletNum(false), 2000);
    }
  };

  const showAlert = (type: 'success' | 'error', text: string) => {
    setAlertNotice({ type, text });
    setTimeout(() => setAlertNotice(null), 5000);
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(depositAmount);
    if (isNaN(amt) || amt <= 0) {
      showAlert('error', 'Please enter a valid deposit amount greater than $0.');
      return;
    }
    const methodLabel = depositMethod === 'bank' ? 'Chase Premier ACH' : depositMethod === 'card' ? 'Visa •••• 4242' : 'Apple Pay Direct';
    const res = storage.depositToWallet(amt, methodLabel);
    if (res.success) {
      refreshWallet();
      setActiveModal(null);
      showAlert('success', `Added $${amt.toFixed(2)} to your CARTIO Wallet balance.`);
    } else {
      showAlert('error', res.message);
    }
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(withdrawAmount);
    if (isNaN(amt) || amt <= 0) {
      showAlert('error', 'Please enter a valid withdrawal amount greater than $0.');
      return;
    }
    if (amt > wallet.balance) {
      showAlert('error', `Insufficient wallet balance. You have $${wallet.balance.toFixed(2)} available.`);
      return;
    }
    const res = storage.withdrawFromWallet(amt, selectedBank);
    if (res.success) {
      refreshWallet();
      setActiveModal(null);
      showAlert('success', `Withdrew $${amt.toFixed(2)} to your bank account ending in ${selectedBank}.`);
    } else {
      showAlert('error', res.message);
    }
  };

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(transferAmount);
    if (!transferRecipient.trim()) {
      showAlert('error', 'Please specify a recipient email address.');
      return;
    }
    if (isNaN(amt) || amt <= 0) {
      showAlert('error', 'Please enter a valid transfer amount greater than $0.');
      return;
    }
    if (amt > wallet.balance) {
      showAlert('error', `Insufficient wallet balance. You have $${wallet.balance.toFixed(2)} available.`);
      return;
    }

    const res = storage.transferMoney(transferRecipient.trim(), '', amt, transferNote.trim());
    if (res.success) {
      refreshWallet();
      setActiveModal(null);
      setTransferRecipient('');
      showAlert('success', res.message);
    } else {
      showAlert('error', res.message);
    }
  };

  // Quick recipient pickers for testing
  const quickRecipients = [
    { name: 'Elena Rostova (Admin)', email: 'admin@cartio.com' },
    { name: 'Derrick Chen (Security)', email: 'cyber@cartio.com' },
    { name: 'Sarah Lin (Analyst)', email: 'analyst@cartio.com' },
    { name: 'Friend / Sneakerhead', email: 'alex.sneaker@gmail.com' },
  ];

  const filteredTransactions = wallet.transactions.filter((tx) => {
    if (txFilter === 'orders') return tx.type === 'order_payment';
    if (txFilter === 'transfers') return tx.type === 'transfer_sent' || tx.type === 'transfer_received';
    if (txFilter === 'deposits_withdrawals') return tx.type === 'deposit' || tx.type === 'withdraw';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      {alertNotice && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between gap-3 animate-in fade-in duration-200 ${
            alertNotice.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {alertNotice.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{alertNotice.text}</span>
          </div>
          <button
            onClick={() => setAlertNotice(null)}
            className="text-zinc-500 hover:text-zinc-800 text-[11px] font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Hero Wallet Card & Quick Action Buttons */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Luxury Virtual Metal Debit Card */}
        <div className="lg:col-span-7 relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-[#120708] border border-red-950/80 p-6 sm:p-7 text-white shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between min-h-[240px]">
          {/* Subtle Ambient Red Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/15 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-[60px] pointer-events-none" />

          {/* Top Row: Brand & Tier Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center font-black font-display text-white text-base shadow-sm">
                C
              </div>
              <div>
                <span className="font-display font-black text-sm tracking-widest text-white">CARTIO PAY</span>
                <span className="block text-[9px] uppercase tracking-wider text-red-400 font-bold">DIGITAL SNEAKER WALLET</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-zinc-900/90 border border-amber-500/40 px-3 py-1 rounded-full backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">{wallet.tier}</span>
            </div>
          </div>

          {/* Center: Available Balance */}
          <div className="relative z-10 my-4">
            <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Total Available Balance</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-black font-mono-numbers text-white tracking-tight">
                ${wallet.balance.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono">USD</span>
            </div>
            <div className="flex items-center gap-3 mt-2 text-[11px] text-zinc-400">
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>3% Instant Cashback</span>
              </span>
              <span>·</span>
              <span>Zero transaction fees on shoe orders</span>
            </div>
          </div>

          {/* Bottom Row: Wallet ID & Customer Name */}
          <div className="relative z-10 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
            <div>
              <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Account Holder</p>
              <p className="font-bold text-zinc-200 tracking-wide text-xs">{currentUser?.name || 'Marcus Vance'}</p>
            </div>

            <div className="flex items-center gap-2">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold text-right">Wallet ID</p>
                <p className="font-mono text-xs text-zinc-300 font-bold">{wallet.walletNumber}</p>
              </div>
              <button
                type="button"
                onClick={handleCopyWalletNumber}
                title="Copy Wallet Number"
                className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                {copiedWalletNum ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="lg:col-span-5 bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 font-display">Wallet Actions</h3>
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>FDIC Insured Partner</span>
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Use your wallet balance to checkout shoes seamlessly, transfer funds to friends, or withdraw directly to your verified bank.
            </p>
          </div>

          {/* 3 Main Action Buttons */}
          <div className="grid grid-cols-3 gap-2.5">
            <button
              onClick={() => setActiveModal('deposit')}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-red-50 hover:bg-red-100/80 border border-red-200/80 text-red-700 transition-all text-center cursor-pointer group hover:-translate-y-0.5"
            >
              <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-110 transition-transform">
                <PlusCircle className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold">Add Money</span>
              <span className="text-[9px] text-zinc-500">Deposit</span>
            </button>

            <button
              onClick={() => setActiveModal('transfer')}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/80 text-zinc-900 transition-all text-center cursor-pointer group hover:-translate-y-0.5"
            >
              <div className="w-9 h-9 rounded-full bg-zinc-900 text-white flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-110 transition-transform">
                <Send className="w-4 h-4 ml-0.5" />
              </div>
              <span className="text-xs font-bold">Transfer</span>
              <span className="text-[9px] text-zinc-500">To Friend</span>
            </button>

            <button
              onClick={() => setActiveModal('withdraw')}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/80 text-zinc-900 transition-all text-center cursor-pointer group hover:-translate-y-0.5"
            >
              <div className="w-9 h-9 rounded-full bg-zinc-800 text-white flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-110 transition-transform">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold">Withdraw</span>
              <span className="text-[9px] text-zinc-500">To Bank</span>
            </button>
          </div>

          {/* Quick Pay For Shoes Callout */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-zinc-900 text-[11px]">Pay for Shoes at Checkout</p>
                <p className="text-[10px] text-zinc-500">Select CARTIO Wallet as 1-click payment</p>
              </div>
            </div>
            {onNavigateToShop && (
              <button
                onClick={onNavigateToShop}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-[10px] font-bold uppercase tracking-wider shrink-0 cursor-pointer"
              >
                Catalog
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Transaction History & Filter Section */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 font-display">
              Wallet Transaction Ledger
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">Real-time ledger of orders, transfers, and bank deposits.</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-lg text-xs overflow-x-auto">
            <button
              onClick={() => setTxFilter('all')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                txFilter === 'all' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              All Activity
            </button>
            <button
              onClick={() => setTxFilter('orders')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                txFilter === 'orders' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Shoe Orders
            </button>
            <button
              onClick={() => setTxFilter('transfers')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                txFilter === 'transfers' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Transfers
            </button>
            <button
              onClick={() => setTxFilter('deposits_withdrawals')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                txFilter === 'deposits_withdrawals' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Bank & Top-ups
            </button>
          </div>
        </div>

        {/* Transactions List */}
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12 text-zinc-400 text-xs">
            No transactions found under this filter.
          </div>
        ) : (
          <div className="divide-y divide-zinc-200">
            {filteredTransactions.map((tx) => {
              const isPositive = tx.type === 'deposit' || tx.type === 'transfer_received' || tx.type === 'cashback';
              return (
                <div key={tx.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        tx.type === 'order_payment'
                          ? 'bg-red-50 text-red-600 border border-red-200'
                          : tx.type === 'transfer_sent'
                          ? 'bg-amber-50 text-amber-600 border border-amber-200'
                          : tx.type === 'transfer_received'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                          : tx.type === 'withdraw'
                          ? 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                          : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      }`}
                    >
                      {tx.type === 'order_payment' ? (
                        <ShoppingBag className="w-4 h-4" />
                      ) : tx.type === 'transfer_sent' ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : tx.type === 'transfer_received' ? (
                        <ArrowDownLeft className="w-4 h-4" />
                      ) : tx.type === 'withdraw' ? (
                        <Building className="w-4 h-4" />
                      ) : tx.type === 'cashback' ? (
                        <Sparkles className="w-4 h-4" />
                      ) : (
                        <PlusCircle className="w-4 h-4" />
                      )}
                    </div>

                    <div>
                      <p className="text-xs font-bold text-zinc-900">{tx.description}</p>
                      <div className="flex items-center gap-2 text-[10px] text-zinc-500 mt-0.5">
                        <span>{new Date(tx.createdAt).toLocaleDateString()} at {new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <span>·</span>
                        <span className="capitalize font-medium text-zinc-600">Status: {tx.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p
                      className={`text-sm font-black font-mono-numbers ${
                        isPositive ? 'text-emerald-700' : 'text-zinc-900'
                      }`}
                    >
                      {isPositive ? '+' : '-'}${tx.amount.toFixed(2)}
                    </p>
                    <p className="text-[10px] text-zinc-400 font-mono">
                      Bal: ${tx.balanceAfter.toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL 1: DEPOSIT / ADD FUNDS */}
      {activeModal === 'deposit' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold">
                  <PlusCircle className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-sm text-zinc-950 uppercase tracking-wider">Deposit Funds</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-zinc-400 hover:text-zinc-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleDepositSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-1.5">
                  Amount to Deposit ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-zinc-400 font-bold">$</span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    required
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded-lg pl-7 pr-3 py-2 text-sm font-bold text-zinc-900 focus:outline-none focus:border-red-600 font-mono-numbers"
                  />
                </div>
                {/* Quick preset buttons */}
                <div className="flex items-center gap-2 mt-2">
                  {[50, 100, 200, 500].map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      onClick={() => setDepositAmount(preset.toString())}
                      className="px-2.5 py-1 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-[11px] font-semibold transition-colors"
                    >
                      +${preset}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-1.5">
                  Payment Source
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-lg border border-zinc-300 hover:border-red-600 cursor-pointer transition-colors has-[:checked]:border-red-600 has-[:checked]:bg-red-50/50">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="depMethod"
                        checked={depositMethod === 'bank'}
                        onChange={() => setDepositMethod('bank')}
                        className="text-red-600 focus:ring-red-500"
                      />
                      <div>
                        <p className="text-xs font-bold text-zinc-900">Chase Premier Checking</p>
                        <p className="text-[10px] text-zinc-500">Account •••• 4892 (Zero fee ACH)</p>
                      </div>
                    </div>
                    <Building className="w-4 h-4 text-zinc-400" />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-lg border border-zinc-300 hover:border-red-600 cursor-pointer transition-colors has-[:checked]:border-red-600 has-[:checked]:bg-red-50/50">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="depMethod"
                        checked={depositMethod === 'card'}
                        onChange={() => setDepositMethod('card')}
                        className="text-red-600 focus:ring-red-500"
                      />
                      <div>
                        <p className="text-xs font-bold text-zinc-900">Visa Debit Card</p>
                        <p className="text-[10px] text-zinc-500">•••• •••• •••• 4242</p>
                      </div>
                    </div>
                    <CreditCard className="w-4 h-4 text-zinc-400" />
                  </label>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-zinc-600 hover:bg-zinc-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-sm cursor-pointer"
                >
                  Confirm Deposit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: WITHDRAW TO BANK */}
      {activeModal === 'withdraw' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-800 flex items-center justify-center font-bold">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-sm text-zinc-950 uppercase tracking-wider">Withdraw to Bank</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-zinc-400 hover:text-zinc-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleWithdrawSubmit} className="mt-4 space-y-4">
              <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 text-xs flex items-center justify-between">
                <span className="text-zinc-500">Current Balance:</span>
                <span className="font-bold font-mono-numbers text-zinc-950">${wallet.balance.toFixed(2)} USD</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-1.5">
                  Amount to Withdraw ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-zinc-400 font-bold">$</span>
                  <input
                    type="number"
                    min="1"
                    max={wallet.balance}
                    step="1"
                    required
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded-lg pl-7 pr-3 py-2 text-sm font-bold text-zinc-900 focus:outline-none focus:border-red-600 font-mono-numbers"
                  />
                </div>
                <div className="flex items-center justify-between mt-1 text-[10px] text-zinc-500">
                  <span>Transfer time: Instant ACH (1-3 min)</span>
                  <button
                    type="button"
                    onClick={() => setWithdrawAmount(wallet.balance.toString())}
                    className="text-red-600 font-bold hover:underline"
                  >
                    Withdraw All
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-1.5">
                  Select Payout Account
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-lg border border-zinc-300 hover:border-red-600 cursor-pointer transition-colors has-[:checked]:border-red-600 has-[:checked]:bg-red-50/50">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="bankAcc"
                        checked={selectedBank === '4892'}
                        onChange={() => setSelectedBank('4892')}
                        className="text-red-600 focus:ring-red-500"
                      />
                      <div>
                        <p className="text-xs font-bold text-zinc-900">Chase Premier Checking</p>
                        <p className="text-[10px] text-zinc-500">Routing ••••0210 · Account •••• 4892</p>
                      </div>
                    </div>
                    <Building className="w-4 h-4 text-zinc-400" />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-lg border border-zinc-300 hover:border-red-600 cursor-pointer transition-colors has-[:checked]:border-red-600 has-[:checked]:bg-red-50/50">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="bankAcc"
                        checked={selectedBank === '9104'}
                        onChange={() => setSelectedBank('9104')}
                        className="text-red-600 focus:ring-red-500"
                      />
                      <div>
                        <p className="text-xs font-bold text-zinc-900">Bank of America Advantage</p>
                        <p className="text-[10px] text-zinc-500">Routing ••••1120 · Account •••• 9104</p>
                      </div>
                    </div>
                    <Building className="w-4 h-4 text-zinc-400" />
                  </label>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-zinc-600 hover:bg-zinc-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-xs font-bold bg-zinc-900 hover:bg-black text-white shadow-sm cursor-pointer"
                >
                  Confirm Withdrawal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: TRANSFER MONEY TO FRIEND / PEER */}
      {activeModal === 'transfer' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-800 flex items-center justify-center font-bold">
                  <Send className="w-4 h-4 ml-0.5" />
                </div>
                <h3 className="font-display font-bold text-sm text-zinc-950 uppercase tracking-wider">Transfer Money</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-zinc-400 hover:text-zinc-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleTransferSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-1.5">
                  Recipient Email or CARTIO ID
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. friend@example.com or admin@cartio.com"
                  value={transferRecipient}
                  onChange={(e) => setTransferRecipient(e.target.value)}
                  className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-red-600"
                />

                {/* Quick select pills */}
                <div className="mt-2">
                  <p className="text-[10px] text-zinc-500 mb-1">Quick Select Demo Accounts:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {quickRecipients.map((rec) => (
                      <button
                        type="button"
                        key={rec.email}
                        onClick={() => setTransferRecipient(rec.email)}
                        className="px-2 py-0.5 rounded text-[10px] bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 transition-colors"
                      >
                        {rec.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-1.5">
                  Transfer Amount ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-zinc-400 font-bold">$</span>
                  <input
                    type="number"
                    min="1"
                    max={wallet.balance}
                    step="1"
                    required
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded-lg pl-7 pr-3 py-2 text-sm font-bold text-zinc-900 focus:outline-none focus:border-red-600 font-mono-numbers"
                  />
                </div>
                <div className="flex items-center justify-between mt-1 text-[10px] text-zinc-500">
                  <span>Available: ${wallet.balance.toFixed(2)}</span>
                  <span>Instant Peer-to-Peer</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-1.5">
                  Transfer Memo / Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. For Spektr Air shoe drop"
                  value={transferNote}
                  onChange={(e) => setTransferNote(e.target.value)}
                  className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-zinc-600 hover:bg-zinc-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-sm cursor-pointer"
                >
                  Send Money Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
