import { X } from "lucide-react";
import { useEffect } from "react";

export default function PrivacyPolicyModal({ open, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-3xl mx-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <h2 className="text-lg font-semibold text-white">Privacy Policy</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 max-h-[65vh] overflow-y-auto text-sm text-gray-400 space-y-4">
          <p>
            At <span className="text-white font-medium">ScanMyMenu</span>, your
            privacy is important to us. This Privacy Policy explains how we
            collect, use, and protect your information.
          </p>

          <div>
            <h3 className="text-white font-medium mb-1">
              1. Information We Collect
            </h3>
            <p>
              We collect basic details such as name, email address, and messages
              submitted through our contact forms. We do not store payment card
              details on our servers.
            </p>
          </div>

          <div>
            <h3 className="text-white font-medium mb-1">
              2. How We Use Information
            </h3>
            <p>
              Information is used to respond to inquiries, improve our services,
              and communicate updates related to ScanMyMenu.
            </p>
          </div>

          <div>
            <h3 className="text-white font-medium mb-1">3. Data Security</h3>
            <p>
              We implement reasonable technical and organizational measures to
              protect your data. However, no online service is completely
              secure.
            </p>
          </div>

          <div>
            <h3 className="text-white font-medium mb-1">
              4. Third-Party Services
            </h3>
            <p>
              We may use third-party tools for analytics, hosting, and payments.
              These services have their own privacy policies.
            </p>
          </div>

          <div>
            <h3 className="text-white font-medium mb-1">
              5. Changes to Policy
            </h3>
            <p>
              This policy may be updated from time to time. Continued use of our
              services means you accept the revised policy.
            </p>
          </div>

          <p className="text-xs text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
