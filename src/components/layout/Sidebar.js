'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, TrendingUp, Briefcase, BarChart3, Menu, X, Zap } from 'lucide-react';
import clsx from 'clsx';

const nav = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Investments', href: '/investments', icon: Briefcase },
  { label: 'Trading', href: '/trading', icon: TrendingUp },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button onClick={() => setOpen(!open)} className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl glass-card">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {open && <div className="lg:hidden fixed inset-0 bg-black/60 z-30" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside className={clsx(
        'fixed top-0 left-0 h-full w-64 z-40 flex flex-col border-r border-white/[0.06] bg-surface-900/95 backdrop-blur-xl transition-transform duration-300',
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/[0.06]">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">VittaPe</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Analytics</p>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map(item => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                className={clsx(
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                  active
                    ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                )}>
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-2">
            <BarChart3 size={14} className="text-slate-500" />
            <span className="text-xs text-slate-500">Power BI Connected</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-auto" />
          </div>
        </div>
      </aside>
    </>
  );
}
