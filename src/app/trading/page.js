'use client';
import { useState, useEffect } from 'react';
import { formatDate } from '@/lib/format';
import clsx from 'clsx';
import { ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';

const typeStyle = { BUY: 'bg-emerald-500/15 text-emerald-400', SELL: 'bg-red-500/15 text-red-400', SHORT: 'bg-amber-500/15 text-amber-400', COVER: 'bg-violet-500/15 text-violet-400' };
const statusDot = { Executed: 'bg-emerald-400', Pending: 'bg-amber-400 animate-pulse', Cancelled: 'bg-red-400', Partial: 'bg-blue-400' };
const typeIcon = { BUY: ArrowUpRight, SELL: ArrowDownRight, SHORT: ArrowDownRight, COVER: ArrowUpRight };

export default function TradingPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    fetch('/api/metrics')
      .then(r => r.json())
      .then(json => setData(json))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); const iv = setInterval(fetchData, 15000); return () => clearInterval(iv); }, []);

  const trades = data?.recentTrades || [];
  const tradesByType = data?.tradesByType || [];
  const totalVol = tradesByType.reduce((s, t) => s + (t.volume || 0), 0);
  const totalCount = tradesByType.reduce((s, t) => s + (t.count || 0), 0);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Trading Desk</h1>
          <p className="text-sm text-slate-500 mt-0.5">Live trade monitoring · Auto-refreshes every 15s</p>
        </div>
        <button onClick={fetchData} disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card text-sm text-slate-400 hover:text-slate-200 transition-colors">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {tradesByType.map((t, i) => {
          const Icon = typeIcon[t._id] || ArrowUpRight;
          return (
            <div key={i} className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} className={t._id === 'BUY' || t._id === 'COVER' ? 'text-emerald-400' : 'text-red-400'} />
                <span className="text-xs font-medium text-slate-400 uppercase">{t._id}</span>
              </div>
              <p className="text-lg font-bold font-mono text-slate-200">{t.count}</p>
              <p className="text-[10px] text-slate-500">₹{((t.volume || 0) / 1e5).toFixed(1)}L vol</p>
            </div>
          );
        })}
      </div>

      {/* Trade log */}
      <div className="glass-card overflow-x-auto">
        <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Trade Log</h3>
          <span className="text-xs text-slate-500">{totalCount} trades · ₹{(totalVol / 1e5).toFixed(1)}L total</span>
        </div>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {['Ticker', 'Company', 'Type', 'Qty', 'Price', 'Total', 'Exchange', 'Status', 'Executed'].map(h => (
                <th key={h} className="px-4 py-2.5 text-xs text-slate-500 font-medium uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && !trades.length ? (
              [...Array(6)].map((_, i) => (
                <tr key={i} className="border-b border-white/[0.03]">
                  {[...Array(9)].map((_, j) => <td key={j} className="px-4 py-3"><div className="h-4 bg-slate-800/50 rounded animate-pulse w-16" /></td>)}
                </tr>
              ))
            ) : trades.map((t, i) => (
              <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 font-mono font-bold text-slate-200">{t.ticker}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{t.company || '—'}</td>
                <td className="px-4 py-3"><span className={clsx('badge text-[10px]', typeStyle[t.type])}>{t.type}</span></td>
                <td className="px-4 py-3 font-mono text-slate-300">{t.quantity}</td>
                <td className="px-4 py-3 font-mono text-slate-300">₹{t.price?.toFixed(2)}</td>
                <td className="px-4 py-3 font-mono text-brand-400">₹{((t.total || 0) / 1e5).toFixed(1)}L</td>
                <td className="px-4 py-3 text-xs text-slate-400">{t.exchange || 'NSE'}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className={clsx('w-1.5 h-1.5 rounded-full', statusDot[t.status])} />
                    <span className="text-xs text-slate-400">{t.status}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{formatDate(t.executedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
