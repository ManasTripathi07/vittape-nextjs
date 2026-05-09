'use client';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#8b5cf6','#32a6ff','#06b6d4','#10b981','#f59e0b','#ef4444','#64748b'];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="glass-card p-3 text-xs border border-white/10">
      <p className="font-semibold text-slate-200">{d._id}</p>
      <p className="text-slate-400">₹{(d.total / 1e7).toFixed(1)}Cr · {d.count} deals</p>
    </div>
  );
};

export default function RoundChart({ data = [] }) {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Investment by Round</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="total" nameKey="_id" cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} strokeWidth={0}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.8} />)}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend iconType="circle" iconSize={8}
            formatter={(v) => <span className="text-xs text-slate-400">{v}</span>} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
