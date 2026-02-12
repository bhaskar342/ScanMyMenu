import { X, Triangle, Sparkles } from "lucide-react";

export default function ItemDetailModal({
  item,
  currency,
  onClose,
  selectedVariantIndex,
  onVariantChange,
}) {
  if (!item) return null;

  const hasVariants = item.variants && item.variants.length > 0;
  const variant = hasVariants && item.variants[selectedVariantIndex || 0];

  const price = hasVariants ? variant?.price ?? variant?.price : item.price;

  const discountedPrice = hasVariants
    ? variant?.discountedPrice
    : item.discountedPrice;

  const hasDiscount =
    discountedPrice != null && price != null && discountedPrice !== price;
  const discountPercentage = hasDiscount
    ? Math.round(((price - discountedPrice) / price) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-md"
        onClick={onClose}
        style={{ animation: "fadeIn 0.3s ease-out" }}
      />

      {/* Modal */}
      <div
        className="relative w-full sm:max-w-2xl bg-white rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] sm:max-h-[85vh] flex flex-col"
        style={{ animation: "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {/* Image Container */}
        <div className="relative h-56 sm:h-72 bg-gradient-to-br from-gray-100 via-gray-50 to-emerald-50/30 flex-shrink-0">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="text-6xl sm:text-7xl mb-2">🍽️</div>
              <p className="text-sm text-gray-400 font-medium">
                No Image Available
              </p>
            </div>
          )}

          {/* Gradient Overlay at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm hover:bg-white rounded-full p-2.5 shadow-lg hover:shadow-xl transition-all duration-200 group border border-gray-100"
          >
            <X
              size={20}
              className="text-gray-700 group-hover:text-gray-900 transition-colors"
            />
          </button>

          {/* Badges Container */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {/* Veg / Non-veg Badge */}
            <div className="">
              {item.isVeg === false ? (
                <div className="flex items-center justify-center border-2 border-red-600 w-6 h-6 bg-white rounded-lg">
                  <Triangle
                    size={14}
                    className="text-red-600"
                    fill="currentColor"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center border-2 border-emerald-600 w-6 h-6 bg-white rounded-lg">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full" />
                </div>
              )}
            </div>

            {/* Bestseller Badge */}
            {item.isBestSeller && (
              <div className="absolute top-43 left-63 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <Sparkles size={14} className="fill-current" />
                <span className="text-xs font-bold">Bestseller</span>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-3 sm:p-8 space-y-6">
            {/* Title & Description */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                {item.name}
              </h2>
              {item.description && (
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>

            {/* Variants Section */}
            {hasVariants && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                    Choose Size
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
                </div>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
                  {item.variants.map((v, index) => {
                    const isSelected = index === selectedVariantIndex;
                    const vPrice =
                      v.discountedPrice && v.price !== v.discountedPrice
                        ? v.discountedPrice
                        : v.price ?? v.price;

                    return (
                      <button
                        key={index}
                        onClick={() => onVariantChange(index)}
                        className={`relative px-3 sm:px-5 py-2 rounded-2xl text-sm font-semibold border-2 transition-all duration-200 ${
                          isSelected
                            ? "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-500 text-emerald-700 shadow-md scale-105"
                            : "bg-white border-gray-200 text-gray-700 hover:border-emerald-300 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex flex-col items-start gap-1">
                          <span className="font-bold">{v.name}</span>
                          <span
                            className={`text-xs ${
                              isSelected ? "text-emerald-600" : "text-gray-500"
                            }`}
                          >
                            {currency}
                            {vPrice}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-600 rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Price Section */}
            <div className="bg-gradient-to-br from-emerald-50 via-teal-50/50 to-transparent rounded-2xl p-2.5 sm:p-6 border-2 border-emerald-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    Total Price
                  </p>
                  <div className="flex items-end gap-3">
                    <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      {currency}
                      {discountedPrice ?? price}
                    </span>

                    {hasDiscount && (
                      <span className="text-lg text-gray-400 line-through mb-1">
                        {currency}
                        {price}
                      </span>
                    )}
                  </div>
                  {hasDiscount && (
                    <p className="text-xs text-emerald-600 font-semibold mt-1">
                      You save {currency}
                      {price - discountedPrice}!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (min-width: 640px) {
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        }
      `}</style>
    </div>
  );
}
