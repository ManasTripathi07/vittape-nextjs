'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

const TYPE_COLORS = { BUY: '#10b981', SELL: '#ef4444', SHORT: '#f59e0b', COVER: '#8b5cf6' };

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="glass-card p-3 text-xs border border-white/10">
      <p className="font-semibold text-slate-200">{d._id}</p>
      <p className="text-slate-400">{d.count} trades · ₹{(d.volume / 1e5).toFixed(1)}L volume</p>
    </div>
  );
};

export default function TradeChart({ data = [] }) {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Trades by Type</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <XAxis dataKey="_id" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148,163,184,0.04)' }} />
          <Bar dataKey="volume" radius={[6, 6, 0, 0]} barSize={36}>
            {data.map((entry, i) => <Cell key={i} fill={TYPE_COLORS[entry._id] || '#64748b'} fillOpacity={0.75} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
