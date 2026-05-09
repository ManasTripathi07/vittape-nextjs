'use client';
import { formatDate } from '@/lib/format';
import clsx from 'clsx';

const typeStyle = {
  BUY: 'bg-emerald-500/15 text-emerald-400',
  SELL: 'bg-red-500/15 text-red-400',
  SHORT: 'bg-amber-500/15 text-amber-400',
  COVER: 'bg-violet-500/15 text-violet-400',
};

const statusDot = {
  Executed: 'bg-emerald-400',
  Pending: 'bg-amber-400',
  Cancelled: 'bg-red-400',
  Partial: 'bg-blue-400',
};

export default function RecentTrades({ data = [] }) {
  return (
    <div className="glass-card p-5 overflow-x-auto">
      <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Recent Trades</h3>
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-white/[0.06]">
            {['Ticker','Type','Qty','Price','Total','Status','Date'].map(h => (
              <th key={h} className="pb-2 pr-3 text-slate-500 font-medium uppercase tracking-wider whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((t, i) => (
            <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
              <td className="py-2.5 pr-3">
                <span className="font-mono font-semibold text-slate-200">{t.ticker}</span>
                {t.company && <span className="block text-[10px] text-slate-500">{t.company}</span>}
              </td>
              <td className="py-2.5 pr-3">
                <span className={clsx('badge text-[10px]', typeStyle[t.type])}>{t.type}</span>
              </td>
              <td className="py-2.5 pr-3 font-mono text-slate-300">{t.quantity}</td>
              <td className="py-2.5 pr-3 font-mono text-slate-300">₹{t.price?.toFixed(2)}</td>
              <td className="py-2.5 pr-3 font-mono text-brand-400">₹{((t.total || 0) / 1e5).toFixed(1)}L</td>
              <td className="py-2.5 pr-3">
                <div className="flex items-center gap-1.5">
                  <span className={clsx('w-1.5 h-1.5 rounded-full', statusDot[t.status])} />
                  <span className="text-slate-400">{t.status}</span>
                </div>
              </td>
              <td className="py-2.5 text-slate-500 whitespace-nowrap">{formatDate(t.executedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
