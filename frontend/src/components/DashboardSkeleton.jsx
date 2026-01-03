export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="h-6 w-40 bg-gray-200 rounded"></div>
        <div className="h-10 w-28 bg-gray-200 rounded-xl"></div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-2xl"></div>
        ))}
      </div>

      {/* Insight */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="h-32 bg-gray-200 rounded-2xl"></div>
      </div>

      {/* Health */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="h-28 bg-gray-200 rounded-2xl"></div>
        <div className="h-28 bg-gray-200 rounded-2xl"></div>
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="h-64 bg-gray-200 rounded-2xl"></div>
        <div className="h-64 bg-gray-200 rounded-2xl"></div>
      </div>
    </div>
  );
}
