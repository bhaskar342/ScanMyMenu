export default function QrCardSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 animate-pulse"
        >
          <div className="p-5 space-y-5">
            {/* Title + Date */}
            <div className="flex justify-between items-center">
              <div className="h-4 w-32 bg-gray-200 rounded-md" />
              <div className="h-3 w-20 bg-gray-200 rounded-md" />
            </div>

            {/* QR Image */}
            <div className="flex justify-center">
              <div className="w-48 h-48 bg-gray-200 rounded-2xl" />
            </div>

            {/* Action Row */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              {/* Download Button */}
              <div className="h-9 w-28 bg-gray-200 rounded-lg" />

              {/* Delete Button */}
              <div className="h-9 w-9 bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
