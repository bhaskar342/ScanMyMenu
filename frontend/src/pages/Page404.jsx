import { useContext } from "react";
import { Home, ArrowLeft, UtensilsCrossed } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Page404() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-200/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Floating food emojis */}
      <div
        className="absolute top-10 left-10 text-4xl sm:text-5xl animate-bounce opacity-30"
        style={{ animationDuration: "3s" }}
      >
        🍕
      </div>
      <div
        className="absolute top-20 right-20 text-3xl sm:text-4xl animate-bounce opacity-30"
        style={{ animationDuration: "4s", animationDelay: "1s" }}
      >
        🍔
      </div>
      <div
        className="absolute bottom-20 left-20 text-3xl sm:text-4xl animate-bounce opacity-30"
        style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}
      >
        🍰
      </div>
      <div
        className="absolute bottom-10 right-10 text-4xl sm:text-5xl animate-bounce opacity-30"
        style={{ animationDuration: "4.5s", animationDelay: "1.5s" }}
      >
        🍜
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        <div className="text-center">
          {/* 404 Number */}
          <div className="mb-8 sm:mb-12 relative">
            <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-black leading-none">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-lg">
                404
              </span>
            </h1>
            {/* Decorative underline */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-32 sm:w-40 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full"></div>
          </div>

          {/* Plate Illustration */}
          <div className="mb-8 sm:mb-12 flex justify-center">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>

              {/* Main plate container */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72">
                {/* Outer plate rim with rotation */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-full shadow-2xl transform hover:rotate-180 transition-transform duration-1000">
                  {/* Inner plate */}
                  <div className="absolute inset-4 sm:inset-6 bg-white rounded-full shadow-inner"></div>

                  {/* Decorative rim details */}
                  <div className="absolute inset-8 sm:inset-10 border-2 border-gray-200 rounded-full"></div>
                </div>

                {/* Fork and knife crossed */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <UtensilsCrossed
                      className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-emerald-600"
                      strokeWidth={2}
                    />
                  </div>
                </div>

                {/* Orbiting food items */}
                <div
                  className="absolute inset-0 animate-spin"
                  style={{ animationDuration: "8s" }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="text-2xl sm:text-3xl">🍕</span>
                  </div>
                </div>

                <div
                  className="absolute inset-0 animate-spin"
                  style={{ animationDuration: "8s", animationDelay: "2s" }}
                >
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                    <span className="text-2xl sm:text-3xl">🍰</span>
                  </div>
                </div>

                <div
                  className="absolute inset-0 animate-spin"
                  style={{ animationDuration: "8s", animationDelay: "4s" }}
                >
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
                    <span className="text-2xl sm:text-3xl">🍔</span>
                  </div>
                </div>

                <div
                  className="absolute inset-0 animate-spin"
                  style={{ animationDuration: "8s", animationDelay: "6s" }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                    <span className="text-2xl sm:text-3xl">🍜</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8 sm:mb-10 space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Oops! Plate Not Found
            </h2>
            <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto px-4 leading-relaxed">
              Looks like the dish you're looking for is not on our menu. Let's
              get you back to something more delicious!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="w-full sm:w-auto group relative px-8 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-2xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-2">
                <Home className="w-5 h-5" />
                <span>Go to Home</span>
              </span>
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto group px-8 py-4 bg-white text-emerald-600 border-3 border-emerald-600 rounded-2xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl hover:bg-emerald-50 transform hover:-translate-y-1 transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-2">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Go Back</span>
              </span>
            </button>
          </div>

          {/* Decorative dots */}
          <div className="flex items-center justify-center gap-2 mt-10 sm:mt-12">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <div
              className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"
              style={{ animationDelay: "0.3s" }}
            ></div>
            <div
              className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"
              style={{ animationDelay: "0.6s" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Corner decorative shapes */}
      <div className="fixed top-0 left-0 w-32 sm:w-40 lg:w-48 h-32 sm:h-40 lg:h-48 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/40 to-transparent rounded-br-[100%]"></div>
      </div>
      <div className="fixed bottom-0 right-0 w-32 sm:w-40 lg:w-48 h-32 sm:h-40 lg:h-48 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tl from-teal-200/40 to-transparent rounded-tl-[100%]"></div>
      </div>
    </div>
  );
}

export default Page404;
