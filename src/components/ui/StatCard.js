'use client';
import clsx from 'clsx';

const variants = {
  brand:  { glow: 'stat-glow', dot: 'bg-brand-400', text: 'text-brand-400' },
  green:  { glow: 'stat-glow-green', dot: 'bg-emerald-400', text: 'text-emerald-400' },
  amber:  { glow: 'stat-glow-amber', dot: 'bg-amber-400', text: 'text-amber-400' },
  violet: { glow: 'stat-glow-violet', dot: 'bg-violet-400', text: 'text-violet-400' },
};

export default function StatCard({ label, value, sub, icon: Icon, variant = 'brand', delay = 0 }) {
  const v = variants[variant];
  return (
    <div className={clsx('glass-card p-5 animate-fade-up', v.glow)} style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={clsx('w-1.5 h-1.5 rounded-full animate-pulse', v.dot)} />
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</span>
        </div>
        {Icon && <Icon size={16} className="text-slate-500" />}
      </div>
      <p className={clsx('text-2xl font-bold tracking-tight font-mono', v.text)}>{value}</p>
      {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
    </div>
  );
}
