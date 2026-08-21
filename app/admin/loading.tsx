// app/admin/loading.tsx
export default function AdminLoading() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-pulse p-4 sm:p-8">
      {/* Top Bar Skeleton */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-3 w-28 bg-amber-100/70 rounded-md"></div>
          <div className="h-6 w-56 bg-slate-200 rounded-md"></div>
          <div className="h-3 w-80 bg-slate-100 rounded-md"></div>
        </div>
        <div className="h-10 w-36 bg-slate-200 rounded-xl"></div>
      </div>

      {/* Stats / Content Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="h-4 w-24 bg-slate-100 rounded-md"></div>
            <div className="h-8 w-16 bg-slate-200 rounded-md"></div>
          </div>
        ))}
      </div>

      {/* Main Table / Container Skeleton */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="h-5 w-40 bg-slate-200 rounded-md"></div>
        <div className="space-y-3 pt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-14 bg-slate-50 rounded-xl border border-slate-100"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
