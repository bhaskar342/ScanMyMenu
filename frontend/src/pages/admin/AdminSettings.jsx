import { useContext, useEffect, useState } from "react";
import { FaCog, FaUser, FaStore, FaSave } from "react-icons/fa";
import { SettingContext } from "../../context/SettingsContext";

export default function AdminSettings() {
  const { settings, updateSettings } = useContext(SettingContext);
  const [saveStatus, setSaveStatus] = useState({
    type: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  // ✅ Single editable state sourced from backend settings
  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    if (saveStatus.message) {
      const timer = setTimeout(() => {
        setSaveStatus({ type: "", message: "" });
      }, 3000); // auto close after 3s

      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  // ✅ Sync settings → local form state
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

  // ✅ Save settings
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
    <div className="w-full sm:p-4 md:p-6 bg-emerald-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-3">
          <FaCog className="text-emerald-600 w-6 h-6 sm:w-8 sm:h-8" />
          <h2 className="text-xl sm:text-2xl font-semibold ms-2 text-gray-800">
            Settings
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Restaurant Info */}
          <div className="bg-white rounded-2xl p-3 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <FaStore className="text-emerald-600 w-5 h-5 mr-2" />
              <div className="text-lg font-semibold text-gray-800">
                Restaurant Information
              </div>
            </div>

            <div className="space-y-3">
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
              {/* Restaurant Open / Close */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Restaurant Status
                  </p>
                  <p className="text-xs text-gray-500">
                    Control whether your restaurant is currently open
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, isOpen: !formData.isOpen })
                  }
                  className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300
      ${formData.isOpen ? "bg-emerald-600" : "bg-gray-300"}
    `}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-300
        ${formData.isOpen ? "translate-x-8" : "translate-x-1"}
      `}
                  />
                </button>
              </div>

              {/* Status text */}
              <p
                className={`text-sm font-medium mt-1 ${
                  formData.isOpen ? "text-emerald-600" : "text-gray-500"
                }`}
              >
                {formData.isOpen ? "Open for customers" : "Currently closed"}
              </p>
            </div>
          </div>

          {/* User Info */}
          <div className="bg-white rounded-2xl sm:p-6 p-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <FaUser className="text-emerald-600 w-5 h-5 mr-2" />
              <div className="text-lg font-semibold text-gray-800">
                User Information
              </div>
            </div>

            <div className="space-y-3">
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
        </div>
        {saveStatus.message && (
          <div className="fixed top-5 right-5 z-50 animate-slideIn">
            <div
              className={`flex items-start gap-3 px-4 py-3 rounded-xl shadow-xl border text-sm font-medium min-w-[280px]
        ${
          saveStatus.type === "success"
            ? "bg-emerald-50 text-emerald-700 border-emerald-300"
            : "bg-red-50 text-red-700 border-red-300"
        }
      `}
            >
              {/* Message */}
              <div className="flex-1">{saveStatus.message}</div>

              {/* Close Button */}
              <button
                onClick={() => setSaveStatus({ type: "", message: "" })}
                className="text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-3 flex justify-end">
          <button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md
    ${
      isSaving
        ? "bg-emerald-400 cursor-not-allowed"
        : "bg-emerald-600 hover:bg-emerald-700 text-white"
    }
  `}
          >
            <FaSave className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ✅ Reusable Input Components */
function InputField({ label, value, onChange, error, type = "text" }) {
  const base = "w-full px-4 py-2 rounded-lg border focus:ring-1";

  const classes = error
    ? "border-red-400 focus:border-red-500 focus:ring-red-500"
    : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-500";

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          rows="2"
          value={value}
          onChange={onChange}
          className={`${base} ${classes}`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={`${base} ${classes}`}
        />
      )}

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
<style>
  {`
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

.animate-slideIn {
  animation: slideIn 0.25s ease-out;
}
`}
</style>;
