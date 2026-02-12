import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function SkeletonLoader({ count = 7 }) {
  const { RESTAURANT } = useContext(AuthContext);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg animate-pulse"
        >
          {/* Image Skeleton */}
          {RESTAURANT.hasPictures && (
            <div className="relative h-40 sm:h-56 bg-gray-200">
              {/* Veg / Non-Veg Badge */}
              <div className="absolute top-3 left-3 w-6 h-6 rounded-lg bg-gray-300" />

              {/* Availability Overlay */}
              <div className="absolute inset-0 bg-black/10" />
            </div>
          )}

          {/* Content Skeleton */}
          <div className="p-2.5 sm:p-3 space-y-3">
            {/* Title + Price */}
            <div className="flex justify-between gap-2">
              <div className="space-y-2 flex-1">
                <div className="h-4 w-3/4 bg-gray-200 rounded-md" />
                <div className="h-4 w-1/2 bg-gray-200 rounded-md" />
              </div>
              <div className="h-6 w-14 bg-gray-300 rounded-md" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-3 w-full bg-gray-200 rounded-md" />
              <div className="h-3 w-5/6 bg-gray-200 rounded-md" />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
              {/* Availability Toggle */}
              <div className="flex items-center gap-2">
                <div className="h-6 w-12 bg-gray-300 rounded-full" />
                <div className="h-3 w-16 bg-gray-200 rounded-md" />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-lg bg-gray-200" />
                <div className="w-8 h-8 rounded-lg bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
