import { useContext, useEffect, useState } from "react";
import {
  FaCog,
  FaUser,
  FaStore,
  FaSave,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";
import { SettingContext } from "../../context/SettingsContext";

function SuperSettings() {
  const { settings, updateSettings } = useContext(SettingContext);
  const [saveStatus, setSaveStatus] = useState({
    type: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (saveStatus.message) {
      const timer = setTimeout(() => {
        setSaveStatus({ type: "", message: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  useEffect(() => {
    if (settings && Object.keys(settings).length > 0) {
      setFormData(settings);
    }
  }, [settings]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Restaurant name is required";
    }

    if (!formData.ownerName?.trim()) {
      newErrors.ownerName = "Owner name is required";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phoneNumber?.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveSettings = async () => {
    if (!validateForm()) return;

    try {
      setIsSaving(true);
      setSaveStatus({ type: "", message: "" });

      const res = await updateSettings(formData);

      if (res.success) {
        setSaveStatus({
          type: "success",
          message: "Settings updated successfully.",
        });
        setErrors({});
      } else {
        setSaveStatus({
          type: "error",
          message: res.message || "Failed to update settings.",
        });
      }
    } catch (err) {
      setSaveStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="w-full  py-6 sm:py-8">
        <div className="mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="relative">
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-transparent rounded-full blur-3xl -z-10"></div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-3 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl blur-lg opacity-50"></div>
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-xl">
                    <MdSettings className="w-8 h-8 sm:w-10 sm:h-10 animate-spin-slow" />
                  </div>
                </div>

                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    Settings
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    Configure your restaurant preferences
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Restaurant Info Card */}
            <div className="relative bg-gradient-to-br from-white via-emerald-50/20 to-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-emerald-200/20 to-transparent rounded-full blur-3xl"></div>

              <div className="relative p-3 sm:p-6">
                {/* Card Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl blur-md opacity-50"></div>
                    <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-xl shadow-lg">
                      <FaStore className="text-white w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Restaurant Information
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                      Update your restaurant details
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent"></div>
                </div>

                {/* Form Fields */}
                <div className="space-y-5">
                  <InputField
                    label="Restaurant Name"
                    value={formData.name || ""}
                    error={errors.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      setErrors({ ...errors, name: "" });
                    }}
                  />
                  <InputField
                    label="Address"
                    type="textarea"
                    value={formData.address || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                  <InputField
                    label="Currency"
                    value={formData.currency || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, currency: e.target.value })
                    }
                  />

                  {/* Restaurant Status Toggle */}
                  <div className="bg-gradient-to-r from-emerald-50 to-white rounded-2xl sm:p-5 p-2 border border-emerald-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <p className="text-base font-bold text-gray-900 mb-1">
                          Restaurant Status
                        </p>
                        <p className="text-sm text-gray-600">
                          Control whether your restaurant is currently open
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, isOpen: !formData.isOpen })
                        }
                        className={`relative inline-flex sm:h-9 sm:w-18 h-6 w-12 items-center rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex-shrink-0
                            ${
                              formData.isOpen
                                ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
                                : "bg-gradient-to-r from-gray-400 to-gray-500"
                            }
                          `}
                      >
                        <span
                          className={`inline-block sm:h-7 sm:w-7 h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300
                              ${
                                formData.isOpen
                                  ? "sm:translate-x-10 translate-x-7"
                                  : "translate-x-1"
                              }
                            `}
                        />
                      </button>
                    </div>

                    <p
                      className={`text-sm font-semibold mt-3 flex items-center gap-2 ${
                        formData.isOpen ? "text-emerald-600" : "text-gray-600"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          formData.isOpen
                            ? "bg-emerald-500 animate-pulse"
                            : "bg-gray-400"
                        }`}
                      ></span>
                      {formData.isOpen
                        ? "Open for customers"
                        : "Currently closed"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500"></div>
            </div>

            {/* User Info Card */}
            <div className="relative bg-gradient-to-br from-white via-blue-50/20 to-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-200/20 to-transparent rounded-full blur-3xl"></div>

              <div className="relative p-3 sm:p-6">
                {/* Card Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl blur-md opacity-50"></div>
                    <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg">
                      <FaUser className="text-white w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      User Information
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                      Update your personal details
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
                </div>

                {/* Form Fields */}
                <div className="space-y-5">
                  <InputField
                    label="Owner Name"
                    value={formData.ownerName || ""}
                    error={errors.ownerName}
                    onChange={(e) => {
                      setFormData({ ...formData, ownerName: e.target.value });
                      setErrors({ ...errors, ownerName: "" });
                    }}
                  />
                  <InputField
                    label="Email"
                    value={formData.email || ""}
                    error={errors.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      setErrors({ ...errors, email: "" });
                    }}
                  />
                  <InputField
                    label="Phone Number"
                    value={formData.phoneNumber || ""}
                    error={errors.phoneNumber}
                    onChange={(e) => {
                      setFormData({ ...formData, phoneNumber: e.target.value });
                      setErrors({ ...errors, phoneNumber: "" });
                    }}
                  />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500"></div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveSettings}
              disabled={isSaving}
              className={`group flex items-center gap-3 sm:px-8 sm:py-4 px-4 py-2 rounded-2xl transition-all shadow-xl hover:shadow-2xl font-bold text-base transform hover:scale-105 ${
                isSaving
                  ? "bg-gradient-to-r from-emerald-400 to-emerald-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white"
              }`}
            >
              <FaSave className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {/* Toast Notification */}
          {saveStatus.message && (
            <div className="fixed top-5 right-5 z-50 animate-slideIn">
              <div
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl border-2 font-semibold min-w-[320px] ${
                  saveStatus.type === "success"
                    ? "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-800 border-emerald-400"
                    : "bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-400"
                }`}
              >
                {saveStatus.type === "success" ? (
                  <FaCheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                ) : (
                  <FaTimesCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                )}
                <div className="flex-1">{saveStatus.message}</div>
                <button
                  onClick={() => setSaveStatus({ type: "", message: "" })}
                  className="text-gray-500 hover:text-gray-700 transition-colors text-xl"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx="true">{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-8px) translateX(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(0);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.25s ease-out;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default SuperSettings;

function InputField({ label, value, onChange, error, type = "text" }) {
  const base =
    "w-full px-4 py-3 rounded-xl border-2 focus:ring-2 transition-all duration-300 text-gray-900 font-medium";

  const classes = error
    ? "border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50"
    : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-200 bg-white hover:border-gray-300";

  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          rows="3"
          value={value}
          onChange={onChange}
          className={`${base} ${classes} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={`${base} ${classes}`}
        />
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600 font-semibold flex items-center gap-1">
          <FaTimesCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
}
