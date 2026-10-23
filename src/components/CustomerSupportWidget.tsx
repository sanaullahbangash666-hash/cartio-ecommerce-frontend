import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, ShieldCheck, Ruler, Truck, ChevronDown, CheckCircle2 } from 'lucide-react';

interface CustomerSupportWidgetProps {
  onOpenSizeGuide?: () => void;
  onNavigate?: (view: string, params?: any) => void;
}

export const CustomerSupportWidget: React.FC<CustomerSupportWidgetProps> = ({
  onOpenSizeGuide,
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: 'Welcome to CARTIO Atelier Concierge. How can we assist your footwear selection today?',
      time: 'Just now',
    },
  ]);

  const quickTopics = [
    {
      label: 'Shoe Sizing & Fit',
      icon: Ruler,
      reply: 'All CARTIO silhouettes run true to standard US athletic sizing. If you have wide feet (EE) or prefer a relaxed toe-box in our Streetwear models, we advise going +0.5 size.',
      action: onOpenSizeGuide,
      actionText: 'Open Interactive Size Guide',
    },
    {
      label: 'Shipping & Delivery',
      icon: Truck,
      reply: 'Orders over $150 receive complimentary express air courier delivery (2-4 business days). Every shipment includes real-time GPS tracking and signature verification.',
    },
    {
      label: 'Authenticity Guarantee',
      icon: ShieldCheck,
      reply: 'Every pair shipped from the CARTIO atelier is hand-inspected with serialized cryptographic NFC provenance authentication and numbered inspection tags.',
    },
    {
      label: '30-Day Free Returns',
      icon: Sparkles,
      reply: 'We offer hassle-free complimentary returns and exchanges within 30 days of delivery with prepaid return labels included in every box.',
    },
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    const q = userQuery.trim();
    const newMsgs = [
      ...messages,
      { sender: 'user' as const, text: q, time: 'Just now' },
    ];
    setUserQuery('');

    // Responsive HCI automated reply
    let replyText = 'Thank you for your inquiry! Our senior atelier concierge is available 24/7. Your question has been prioritized for our footwear engineering team.';
    const qLower = q.toLowerCase();
    if (qLower.includes('size') || qLower.includes('fit') || qLower.includes('small') || qLower.includes('big')) {
      replyText = 'CARTIO sneakers run true to standard US athletic size. For high-volume streetwear styles like the Phantom Stride X or District Lo-Fade, standard sizing is recommended, or +0.5 if between sizes.';
    } else if (qLower.includes('ship') || qLower.includes('track') || qLower.includes('delivery')) {
      replyText = 'Dispatches take place within 24 hours via tracked air express. Complimentary delivery is active on all orders over $150.';
    } else if (qLower.includes('return') || qLower.includes('exchange')) {
      replyText = 'We provide 30-day complimentary returns and size exchanges with prepaid return postage included.';
    } else if (qLower.includes('streetwear') || qLower.includes('retro') || qLower.includes('arrival')) {
      replyText = 'Check out our new drops: Phantom Stride X (Streetwear), Track 77 Heritage (Retro Classics), and Aura Hyper-Run 03 (New Arrivals) in The Catalog!';
    }

    setTimeout(() => {
      setMessages([...newMsgs, { sender: 'bot', text: replyText, time: 'Just now' }]);
    }, 450);
  };

  const handleQuickClick = (item: typeof quickTopics[0]) => {
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: item.label, time: 'Just now' },
      { sender: 'bot', text: item.reply, time: 'Just now' },
    ]);
    if (item.action) {
      item.action();
    }
  };

  return (
    <aside aria-label="Customer concierge assistant" className="fixed bottom-6 left-6 z-40">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 bg-[#0a0a0d] hover:bg-black text-white border border-red-900/60 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_30px_rgba(220,38,38,0.35)] transition-all cursor-pointer hover:-translate-y-0.5"
          aria-label="Open Concierge Support"
        >
          <div className="relative">
            <MessageSquare className="w-4 h-4 text-red-500" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <span className="text-xs font-bold tracking-wide">Concierge</span>
          <span className="text-[10px] text-zinc-400 font-medium hidden sm:inline">· Online</span>
        </button>
      )}

      {/* Expanded Concierge Drawer/Card */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] bg-white border border-zinc-200/90 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[520px] text-zinc-900 animate-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="p-4 bg-[#0a0a0d] text-white border-b border-red-950 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>CARTIO Atelier Concierge</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </h3>
                <p className="text-[10px] text-zinc-400">Human Communication & Sizing Advisory</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Close Concierge"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick FAQ Chips */}
          <div className="p-3 bg-zinc-50 border-b border-zinc-200 overflow-x-auto flex gap-1.5 scrollbar-none">
            {quickTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <button
                  key={topic.label}
                  type="button"
                  onClick={() => handleQuickClick(topic)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-zinc-200 hover:border-red-600 hover:text-red-600 text-zinc-700 text-[11px] font-semibold whitespace-nowrap flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                >
                  <Icon className="w-3 h-3 text-red-500" />
                  <span>{topic.label}</span>
                </button>
              );
            })}
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white max-h-[260px] text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-zinc-950 text-white rounded-br-xs'
                      : 'bg-zinc-100 text-zinc-900 rounded-bl-xs border border-zinc-200/60'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-zinc-400 mt-0.5 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-zinc-200 bg-zinc-50 flex items-center gap-2"
          >
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="Ask about sizing, delivery, drops..."
              className="flex-1 bg-white border border-zinc-300 rounded-xl px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-600"
            />
            <button
              type="submit"
              disabled={!userQuery.trim()}
              className="p-2 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white rounded-xl transition-colors cursor-pointer shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </aside>
  );
};
