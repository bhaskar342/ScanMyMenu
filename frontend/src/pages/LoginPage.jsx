import { useContext, useState } from "react";
import { Mail, Lock, Eye, EyeOff, ChefHat } from "lucide-react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import LoadingDots from "../components/LoadingDots";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const result = await loginUser(data);
    if (result.success) {
      reset();
    } else {
      setError("root", { message: result.message });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl blur-xl opacity-60 animate-pulse"></div>
            <div
              className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-2xl cursor-pointer hover:scale-105 transition"
              onClick={() => navigate("/")}
            >
              <ChefHat className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Welcome Back
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Sign in to manage your restaurant
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>

          <div className="p-6 sm:p-8 lg:p-10">
            {/* Global Error */}
            {errors.root && (
              <div className="mb-6 p-4 bg-red-500/10 border-l-4 border-red-500 rounded-lg">
                <p className="text-sm text-red-400 font-medium">
                  {errors.root.message}
                </p>
              </div>
            )}

            <div className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-slate-200">
                  <Mail className="w-4 h-4 mr-2 text-emerald-400" />
                  Email Address / Phone Number
                </label>
                <input
                  {...register("identifier", {
                    required: "Email/Phone number is required",
                  })}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950 text-slate-100 placeholder-slate-500 border transition focus:outline-none ${
                    errors.identifier
                      ? "border-red-400 focus:ring-4 focus:ring-red-500/20"
                      : "border-slate-600 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                  }`}
                  placeholder="Enter your email or phone"
                />
                {errors.identifier && (
                  <p className="text-xs text-red-400">
                    {errors.identifier.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-slate-200">
                  <Lock className="w-4 h-4 mr-2 text-emerald-400" />
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type={showPassword ? "text" : "password"}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950 text-slate-100 placeholder-slate-500 border transition focus:outline-none pr-12 ${
                      errors.password
                        ? "border-red-400 focus:ring-4 focus:ring-red-500/20"
                        : "border-slate-600 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 p-1 rounded-lg transition"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit)}
                className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 disabled:opacity-70 shadow-lg hover:shadow-xl transition"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
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

        {/* Footer */}
        <p className="text-center my-4 text-xs sm:text-sm text-slate-500">
          Powered by{" "}
          <span className="font-semibold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            ScanMyMenu
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
