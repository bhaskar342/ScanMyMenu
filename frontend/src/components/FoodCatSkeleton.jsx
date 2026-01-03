function FoodCatSkeleton({ count = 6 }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative rounded-xl border border-gray-200 bg-white p-3 shadow-md animate-pulse"
        >
          {/* Top Right Actions (desktop hint) */}
          <div className="absolute top-2 right-2 hidden sm:flex gap-1">
            <div className="w-6 h-6 rounded-lg bg-gray-200" />
            <div className="w-6 h-6 rounded-lg bg-gray-200" />
          </div>

          {/* Category Name */}
          <div className="h-4 w-3/4 bg-gray-200 rounded-md mb-2" />

          {/* Status Row */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="h-3 w-16 bg-gray-200 rounded-md" />
          </div>

          {/* Mobile Action Bar */}
          <div className="sm:hidden mt-3 border-t pt-2 flex justify-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gray-200" />
            <div className="w-7 h-7 rounded-lg bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default FoodCatSkeleton;
