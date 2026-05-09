'use client';
import { useState, useEffect } from 'react';
import { formatCurrency, formatDate, roundColor } from '@/lib/format';
import clsx from 'clsx';

const ROUNDS = ['All', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D', 'Pre-IPO', 'Bridge'];

export default function InvestmentsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [round, setRound] = useState('All');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const params = new URLSearchParams({ page, limit: 20 });
    if (round !== 'All') params.set('round', round);
    setLoading(true);
    fetch(`/api/investments?${params}`)
      .then(r => r.json())
      .then(json => { setData(json.data || []); setPagination(json.pagination || {}); })
      .finally(() => setLoading(false));
  }, [round, page]);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Investment Tracker</h1>
        <p className="text-sm text-slate-500 mt-0.5">All funding rounds and investor activity</p>
      </div>

      {/* Round filter pills */}
      <div className="flex flex-wrap gap-2">
        {ROUNDS.map(r => (
          <button key={r} onClick={() => { setRound(r); setPage(1); }}
            className={clsx('px-3 py-1.5 rounded-full text-xs font-medium transition-all border',
              round === r ? 'bg-brand-500/20 text-brand-400 border-brand-500/30' : 'glass-card text-slate-400 border-white/[0.06] hover:text-slate-200')}>
            {r}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {['Company', 'Sector', 'Round', 'Amount', 'Valuation', 'Lead Investor', 'Equity', 'Date'].map(h => (
                <th key={h} className="px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(8)].map((_, i) => (
                <tr key={i} className="border-b border-white/[0.03]">
                  {[...Array(8)].map((_, j) => (
                    <td key={j} className="px-4 py-3"><div className="h-4 bg-slate-800/50 rounded animate-pulse w-20" /></td>
                  ))}
                </tr>
              ))
            ) : data.map((inv, i) => (
              <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 font-medium text-slate-200">{inv.company?.name || '—'}</td>
                <td className="px-4 py-3 text-slate-400">{inv.company?.sector || '—'}</td>
                <td className="px-4 py-3"><span className={clsx('badge text-[10px]', roundColor(inv.round))}>{inv.round}</span></td>
                <td className="px-4 py-3 font-mono text-emerald-400">{formatCurrency(inv.amount)}</td>
                <td className="px-4 py-3 font-mono text-slate-300">{formatCurrency(inv.valuation)}</td>
                <td className="px-4 py-3 text-slate-300">{inv.leadInvestor || '—'}</td>
                <td className="px-4 py-3 font-mono text-slate-400">{inv.equity ? `${inv.equity}%` : '—'}</td>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDate(inv.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}
            className="px-3 py-1.5 rounded-lg glass-card text-xs text-slate-400 disabled:opacity-30">Prev</button>
          <span className="text-xs text-slate-500">{page} / {pagination.pages}</span>
          <button onClick={() => setPage(p => Math.min(pagination.pages, p + 1))} disabled={page >= pagination.pages}
            className="px-3 py-1.5 rounded-lg glass-card text-xs text-slate-400 disabled:opacity-30">Next</button>
        </div>
      )}
    </div>
  );
}
