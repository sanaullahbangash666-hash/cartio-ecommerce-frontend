import React, { useState } from 'react';
import { X, Ruler, Check, Info } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  productName = 'CARTIO Footwear',
}) => {
  const [selectedGender, setSelectedGender] = useState<'men' | 'women'>('men');
  const [footCm, setFootCm] = useState<string>('27');

  if (!isOpen) return null;

  const mensSizeChart = [
    { us: 'US 7', uk: 'UK 6', eu: 'EU 40', cm: '25.0 cm', inches: '9.8 in' },
    { us: 'US 7.5', uk: 'UK 6.5', eu: 'EU 40.5', cm: '25.5 cm', inches: '10.0 in' },
    { us: 'US 8', uk: 'UK 7', eu: 'EU 41', cm: '26.0 cm', inches: '10.2 in' },
    { us: 'US 8.5', uk: 'UK 7.5', eu: 'EU 42', cm: '26.5 cm', inches: '10.4 in' },
    { us: 'US 9', uk: 'UK 8', eu: 'EU 42.5', cm: '27.0 cm', inches: '10.6 in' },
    { us: 'US 9.5', uk: 'UK 8.5', eu: 'EU 43', cm: '27.5 cm', inches: '10.8 in' },
    { us: 'US 10', uk: 'UK 9', eu: 'EU 44', cm: '28.0 cm', inches: '11.0 in' },
    { us: 'US 10.5', uk: 'UK 9.5', eu: 'EU 44.5', cm: '28.5 cm', inches: '11.2 in' },
    { us: 'US 11', uk: 'UK 10', eu: 'EU 45', cm: '29.0 cm', inches: '11.4 in' },
    { us: 'US 11.5', uk: 'UK 10.5', eu: 'EU 45.5', cm: '29.5 cm', inches: '11.6 in' },
    { us: 'US 12', uk: 'UK 11', eu: 'EU 46', cm: '30.0 cm', inches: '11.8 in' },
    { us: 'US 13', uk: 'UK 12', eu: 'EU 47.5', cm: '31.0 cm', inches: '12.2 in' },
  ];

  const womensSizeChart = [
    { us: 'US 5.5', uk: 'UK 3', eu: 'EU 36', cm: '22.5 cm', inches: '8.8 in' },
    { us: 'US 6', uk: 'UK 3.5', eu: 'EU 36.5', cm: '23.0 cm', inches: '9.0 in' },
    { us: 'US 6.5', uk: 'UK 4', eu: 'EU 37', cm: '23.5 cm', inches: '9.2 in' },
    { us: 'US 7', uk: 'UK 4.5', eu: 'EU 38', cm: '24.0 cm', inches: '9.4 in' },
    { us: 'US 7.5', uk: 'UK 5', eu: 'EU 38.5', cm: '24.5 cm', inches: '9.6 in' },
    { us: 'US 8', uk: 'UK 5.5', eu: 'EU 39', cm: '25.0 cm', inches: '9.8 in' },
    { us: 'US 8.5', uk: 'UK 6', eu: 'EU 40', cm: '25.5 cm', inches: '10.0 in' },
    { us: 'US 9', uk: 'UK 6.5', eu: 'EU 40.5', cm: '26.0 cm', inches: '10.2 in' },
    { us: 'US 9.5', uk: 'UK 7', eu: 'EU 41', cm: '26.5 cm', inches: '10.4 in' },
    { us: 'US 10', uk: 'UK 7.5', eu: 'EU 42', cm: '27.0 cm', inches: '10.6 in' },
  ];

  const currentChart = selectedGender === 'men' ? mensSizeChart : womensSizeChart;

  // Recommended size calculator
  const calcCm = parseFloat(footCm) || 27;
  const recommendedSize = currentChart.reduce((closest, item) => {
    const itemCm = parseFloat(item.cm);
    const currDiff = Math.abs(itemCm - calcCm);
    const closestDiff = Math.abs(parseFloat(closest.cm) - calcCm);
    return currDiff < closestDiff ? item : closest;
  }, currentChart[0]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-zinc-900"
      >
        {/* Header */}
        <div className="p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <Ruler className="w-4 h-4" />
            </div>
            <div>
              <h2 id="size-guide-title" className="text-base font-bold text-zinc-950">
                Interactive Size Guide & Fit Advisor
              </h2>
              <p className="text-xs text-zinc-500 font-medium">
                Calibrated for {productName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close size guide"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Fit Advisor Quick Card */}
          <div className="bg-red-50/60 border border-red-200/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-red-950 uppercase tracking-wider">
                  Fit Profile: True to Size (94% Verified Match)
                </h4>
                <p className="text-xs text-red-900/80 mt-0.5">
                  CARTIO silhouettes are designed with anatomical footbeds. If you are between sizes or prefer a relaxed toe-box, order a half-size up.
                </p>
              </div>
            </div>

            {/* Quick Size Calculator */}
            <div className="bg-white border border-red-200 rounded-lg p-3 shrink-0 shadow-xs flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-zinc-500">Foot Length (cm)</span>
              <div className="flex items-center gap-1.5 mt-1">
                <input
                  type="number"
                  step="0.5"
                  min="20"
                  max="33"
                  value={footCm}
                  onChange={(e) => setFootCm(e.target.value)}
                  className="w-16 px-2 py-1 text-xs border border-zinc-300 rounded font-mono font-bold text-center focus:outline-none focus:border-red-600"
                />
                <span className="text-xs font-bold text-zinc-700">cm</span>
              </div>
              <span className="text-[11px] font-bold text-red-600 mt-1">
                Suggested: {recommendedSize.us}
              </span>
            </div>
          </div>

          {/* Gender Tab Switcher */}
          <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedGender('men')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedGender === 'men'
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950'
                }`}
              >
                Men's Sizing
              </button>
              <button
                type="button"
                onClick={() => setSelectedGender('women')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedGender === 'women'
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950'
                }`}
              >
                Women's Sizing
              </button>
            </div>
            <span className="text-[11px] text-zinc-500 hidden sm:inline">
              ISO/ASTM International Footwear Standards
            </span>
          </div>

          {/* Sizing Table */}
          <div className="border border-zinc-200 rounded-xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-100/80 text-zinc-600 font-bold uppercase tracking-wider text-[10px] border-b border-zinc-200">
                <tr>
                  <th className="py-2.5 px-3">US Size</th>
                  <th className="py-2.5 px-3">UK Size</th>
                  <th className="py-2.5 px-3">EU Size</th>
                  <th className="py-2.5 px-3">Foot Length (CM)</th>
                  <th className="py-2.5 px-3">Inches</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {currentChart.map((row) => (
                  <tr
                    key={row.us}
                    className={`hover:bg-zinc-50 transition-colors ${
                      recommendedSize.us === row.us ? 'bg-red-50/70 font-bold text-red-950' : 'text-zinc-800'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-mono font-bold flex items-center gap-1.5">
                      {recommendedSize.us === row.us && <Check className="w-3.5 h-3.5 text-red-600" />}
                      <span>{row.us}</span>
                    </td>
                    <td className="py-2.5 px-3 font-mono">{row.uk}</td>
                    <td className="py-2.5 px-3 font-mono">{row.eu}</td>
                    <td className="py-2.5 px-3 font-mono">{row.cm}</td>
                    <td className="py-2.5 px-3 font-mono text-zinc-500">{row.inches}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to Measure Instructions */}
          <div className="border border-zinc-200 rounded-xl p-4 bg-zinc-50/50 space-y-2">
            <h4 className="text-xs font-bold text-zinc-950 uppercase tracking-wide">
              How to Measure for Perfect Precision:
            </h4>
            <ol className="text-xs text-zinc-600 list-decimal list-inside space-y-1.5 leading-relaxed">
              <li>Place a sheet of paper on a flat floor against a wall.</li>
              <li>Stand on the paper with your heel firmly touching the wall, wearing the socks you intend to wear.</li>
              <li>Mark the tip of your longest toe on the paper with a pencil perpendicular to the floor.</li>
              <li>Measure the distance from the edge of the paper to the mark in centimeters and match to the table above.</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between">
          <span className="text-[11px] text-zinc-500">
            Free size exchanges within 30 days of delivery.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-zinc-950 hover:bg-black text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
