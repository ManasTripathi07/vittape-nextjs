export default function Skeleton({ rows = 6 }) {
  return (
    <div className="space-y-4 p-6">
      <div className="dashboard-grid">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card p-5 space-y-3 animate-pulse">
            <div className="h-3 w-24 bg-slate-700/50 rounded" />
            <div className="h-7 w-32 bg-slate-700/50 rounded" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="glass-card p-6 animate-pulse">
            <div className="h-4 w-32 bg-slate-700/50 rounded mb-4" />
            <div className="h-48 bg-slate-700/30 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
