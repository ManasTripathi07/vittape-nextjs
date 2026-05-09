'use client';
import { formatCurrency, formatDate, roundColor } from '@/lib/format';
import clsx from 'clsx';

export default function RecentDeals({ data = [] }) {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Recent Deals</h3>
      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        {data.map((deal, i) => (
          <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/[0.02] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
              {deal.company?.charAt(0) || '?'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-200 truncate">{deal.company}</span>
                <span className={clsx('badge text-[10px]', roundColor(deal.round))}>{deal.round}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-mono text-emerald-400">{formatCurrency(deal.amount)}</span>
                <span className="text-[10px] text-slate-500">· {deal.leadInvestor}</span>
              </div>
              <span className="text-[10px] text-slate-600">{formatDate(deal.date)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
