export function formatCurrency(n, compact = true) {
  if (n == null) return '—';
  if (compact && Math.abs(n) >= 1e9) return `₹${(n / 1e9).toFixed(1)}B`;
  if (compact && Math.abs(n) >= 1e7) return `₹${(n / 1e7).toFixed(1)}Cr`;
  if (compact && Math.abs(n) >= 1e5) return `₹${(n / 1e5).toFixed(1)}L`;
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export function formatNumber(n) {
  if (n == null) return '—';
  return new Intl.NumberFormat('en-IN').format(n);
}

export function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function statusColor(status) {
  const map = {
    Upcoming: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    Open: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    Closed: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
    Listed: 'bg-brand-500/15 text-brand-400 border-brand-500/30',
    Withdrawn: 'bg-red-500/15 text-red-400 border-red-500/30',
  };
  return map[status] || 'bg-slate-500/15 text-slate-400';
}

export function roundColor(round) {
  const map = {
    Seed: 'bg-violet-500/15 text-violet-400',
    'Series A': 'bg-blue-500/15 text-blue-400',
    'Series B': 'bg-cyan-500/15 text-cyan-400',
    'Series C': 'bg-emerald-500/15 text-emerald-400',
    'Series D': 'bg-amber-500/15 text-amber-400',
    'Pre-IPO': 'bg-rose-500/15 text-rose-400',
    Bridge: 'bg-slate-500/15 text-slate-400',
  };
  return map[round] || 'bg-slate-500/15 text-slate-400';
}
