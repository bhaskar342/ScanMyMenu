import React from "react";

const FoodLoader = ({ size = "medium", message = "Loading..." }) => {
  // Size configurations
  const sizeConfig = {
    medium: {
      container: "w-24 h-24",
      plate: "w-20 h-20",
      food: "text-3xl",
      text: "text-sm mt-3",
    },
  };

  const config = sizeConfig[size] || sizeConfig.medium;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Animated Plate with Food */}
      <div className={`relative ${config.container}`}>
        {/* Rotating Plate */}
        <div
          className={`absolute inset-0 ${config.plate} rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg animate-spin`}
          style={{ animationDuration: "3s" }}
        >
          {/* Plate rim */}
          <div className="absolute inset-2 rounded-full bg-white shadow-inner"></div>
        </div>

        {/* Food Items - Counter rotating */}
        <div
          className="absolute inset-0 flex items-center justify-center animate-spin"
          style={{ animationDuration: "3s", animationDirection: "reverse" }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Pizza Slice */}
            <div
              className="absolute animate-bounce"
              style={{
                animationDuration: "1s",
                animationDelay: "0s",
              }}
            >
              <span className={config.food}>🍕</span>
            </div>
          </div>
        </div>

        {/* Orbiting Food Items */}
        <div
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: "4s" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span
              className={
                size === "small"
                  ? "text-base"
                  : size === "large"
                  ? "text-2xl"
                  : "text-xl"
              }
            >
              🍔
            </span>
          </div>
        </div>

        <div
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: "4s", animationDelay: "1s" }}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <span
              className={
                size === "small"
                  ? "text-base"
                  : size === "large"
                  ? "text-2xl"
                  : "text-xl"
              }
            >
              🍰
            </span>
          </div>
        </div>

        <div
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: "4s", animationDelay: "2s" }}
        >
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
            <span
              className={
                size === "small"
                  ? "text-base"
                  : size === "large"
                  ? "text-2xl"
                  : "text-xl"
              }
            >
              🍜
            </span>
          </div>
        </div>

        <div
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: "4s", animationDelay: "3s" }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
            <span
              className={
                size === "small"
                  ? "text-base"
                  : size === "large"
                  ? "text-2xl"
                  : "text-xl"
              }
            >
              🍣
            </span>
          </div>
        </div>
      </div>

      {/* Loading Text with Animated Dots */}
      {message && (
        <div
          className={`${config.text} font-semibold text-gray-700 flex items-center gap-1`}
        >
          <span>{message}</span>
          <span className="flex gap-0.5">
            <span className="animate-bounce" style={{ animationDelay: "0s" }}>
              .
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
              .
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
              .
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

// Demo component showing different variations
const FoodLoaderDemo = () => {
  return (
    <div className="min-h-screen flex justify-center items-center p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="rounded-2xl p-8 flex flex-col justify-center items-center">
            <FoodLoader size="medium" message="Preparing order" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodLoaderDemo;
