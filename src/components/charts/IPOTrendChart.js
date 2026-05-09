'use client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card p-3 text-xs border border-white/10">
      <p className="font-semibold text-slate-200 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: {p.name === 'Funds' ? `₹${(p.value / 1e7).toFixed(1)}Cr` : p.value}
        </p>
      ))}
    </div>
  );
};

export default function IPOTrendChart({ data = [] }) {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Monthly IPO Trends</h3>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="gBrand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#32a6ff" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#32a6ff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.06)" />
          <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="count" name="IPOs" stroke="#32a6ff" fill="url(#gBrand)" strokeWidth={2} />
          <Area type="monotone" dataKey="funds" name="Funds" stroke="#10b981" fill="url(#gGreen)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
