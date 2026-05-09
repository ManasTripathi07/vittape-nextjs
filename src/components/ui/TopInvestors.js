'use client';
import { formatCurrency } from '@/lib/format';

export default function TopInvestors({ data = [] }) {
  const max = Math.max(...data.map(i => i.totalAmount), 1);
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Top Investors</h3>
      <div className="space-y-3">
        {data.map((inv, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="w-6 text-xs font-mono text-slate-500 text-right">#{i + 1}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-slate-200 truncate">{inv.name}</span>
                <span className="text-xs font-mono text-brand-400 ml-2">{formatCurrency(inv.totalAmount)}</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all duration-700"
                  style={{ width: `${(inv.totalAmount / max) * 100}%` }} />
              </div>
              <span className="text-[10px] text-slate-500">{inv.deals} deals</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
