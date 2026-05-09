'use client';
import { useState, useEffect } from 'react';
import { Building2, TrendingUp, Wallet, BarChart3, RefreshCw, ArrowUpRight } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';
import Skeleton from '@/components/ui/Skeleton';
import IPOTrendChart from '@/components/charts/IPOTrendChart';
import SectorChart from '@/components/charts/SectorChart';
import RoundChart from '@/components/charts/RoundChart';
import TradeChart from '@/components/charts/TradeChart';
import TopInvestors from '@/components/ui/TopInvestors';
import RecentDeals from '@/components/ui/RecentDeals';
import RecentTrades from '@/components/ui/RecentTrades';
import { formatCurrency, formatNumber } from '@/lib/format';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/metrics');
      if (!res.ok) throw new Error('Failed to fetch metrics');
      const json = await res.json();
      setData(json);
      setLastRefresh(new Date());
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !data) return <Skeleton />;

  if (error && !data) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p className="text-slate-400">Failed to load dashboard data</p>
      <button onClick={fetchData} className="px-4 py-2 rounded-xl bg-brand-500/20 text-brand-400 text-sm hover:bg-brand-500/30 transition-colors">
        Retry
      </button>
    </div>
  );

  const c = data?.cards || {};

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Investment & Trading Overview
            {lastRefresh && <span className="ml-2">· Updated {lastRefresh.toLocaleTimeString('en-IN')}</span>}
          </p>
        </div>
        <button onClick={fetchData} disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card text-sm text-slate-400 hover:text-slate-200 transition-colors disabled:opacity-50">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Stat Cards — Power BI tile row */}
      <div className="dashboard-grid">
        <StatCard label="Companies" value={formatNumber(c.totalCompanies)} sub="Tracked startups" icon={Building2} variant="brand" delay={0} />
        <StatCard label="IPOs" value={formatNumber(c.totalIPOs)} sub="Active & upcoming" icon={TrendingUp} variant="green" delay={80} />
        <StatCard label="Funds Raised" value={formatCurrency(c.totalFundsRaised)} sub="Total IPO capital" icon={Wallet} variant="amber" delay={160} />
        <StatCard label="Trade Volume" value={formatCurrency(c.totalTradeVolume)} sub={`${formatNumber(c.totalTrades)} executed trades`} icon={BarChart3} variant="violet" delay={240} />
      </div>

      {/* Charts Row 1 — IPO Trends + Sector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <IPOTrendChart data={data?.monthlyIPOTrends || []} />
        <SectorChart data={data?.sectorBreakdown || []} />
      </div>

      {/* Charts Row 2 — Round breakdown + Trade activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RoundChart data={data?.investmentByRound || []} />
        <TradeChart data={data?.tradesByType || []} />
      </div>

      {/* Recent Trades — full width */}
      <RecentTrades data={data?.recentTrades || []} />

      {/* Bottom row — Investors + Deals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TopInvestors data={data?.topInvestors || []} />
        <RecentDeals data={data?.recentDeals || []} />
      </div>

      {/* Footer */}
      <div className="text-center py-4 border-t border-white/[0.04]">
        <p className="text-xs text-slate-600">VittaPe Analytics · Auto-refreshes every 30s · Power BI Connected</p>
      </div>
    </div>
  );
}
