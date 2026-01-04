import { useContext, useState } from "react";
import { Mail, Lock, Eye, EyeOff, ChefHat } from "lucide-react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import LoadingDots from "../components/LoadingDots";

const LoginPage = () => {
  const { loginUser, isLoading } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const result = await loginUser(data);
    if (result.success) {
      reset();
    }
    if (!result.success) {
      setError("root", { message: result.message });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10">
          {/* Logo */}
          <div className="relative inline-block mb-4 sm:mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl blur-xl opacity-60 animate-pulse"></div>
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <ChefHat className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={2} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Welcome Back
            </span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Sign in to manage your restaurant
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Gradient top bar */}
          <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>

          <div className="p-6 sm:p-8 lg:p-10">
            {/* Error Message */}
            {errors.root && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-sm text-red-700 font-medium">
                    {errors.root.message}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-5 sm:space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <Mail className="w-4 h-4 mr-2 text-emerald-600" />
                  Email Address / Phone Number
                </label>
                <div className="relative">
                  <input
                    {...register("identifier", {
                      required: {
                        value: true,
                        message: "Email/Phone number is required",
                      },
                    })}
                    className={`w-full px-4 py-3 sm:py-3.5 rounded-xl border-2 transition-all duration-200 text-sm sm:text-base ${
                      errors.identifier
                        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                        : "border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
                    } outline-none`}
                    placeholder="Enter your email or phone"
                  />
                </div>
                {errors.identifier && (
                  <p className="flex items-center gap-1.5 text-red-500 text-xs font-medium mt-1.5">
                    <span className="w-1 h-1 rounded-full bg-red-500"></span>
                    {errors.identifier.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <Lock className="w-4 h-4 mr-2 text-emerald-600" />
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    className={`w-full px-4 py-3 sm:py-3.5 rounded-xl border-2 transition-all duration-200 text-sm sm:text-base ${
                      errors.password
                        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                        : "border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
                    } outline-none pr-12`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="flex items-center gap-1.5 text-red-500 text-xs font-medium mt-1.5">
                    <span className="w-1 h-1 rounded-full bg-red-500"></span>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit)}
                className="w-full sm:mt-4 py-3.5 sm:py-4 px-4 rounded-xl font-semibold text-white text-sm sm:text-base bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Signing in</span>
                    <LoadingDots size={6} color="#fff" speed={1} />
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </div>

          
        </div>

        {/* Footer text */}
        <p className="text-center my-4 text-xs sm:text-sm text-gray-600">
          Powered by{" "}
          <span className="font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            ScanMyMenu
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;