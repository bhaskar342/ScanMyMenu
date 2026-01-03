import { useContext, useState } from "react";
import { FaQrcode, FaDownload, FaTrash } from "react-icons/fa";
import { MdQrCodeScanner } from "react-icons/md";
import { useForm } from "react-hook-form";
import { TableContext } from "../../context/TableAndQrContext";
import Loader from "../../components/Loader";
import QrCardSkeleton from "../../components/OrSkeleton";
import ConfirmModal from "../../components/ConfirmationModal";
import ErrorModal from "../../components/ErrorModal";

function AdminQrCode() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { createTableAndQr, handleDownload, handleDelete, tables, isLoading } =
    useContext(TableContext);

  const onSubmit = async (data) => {
    const result = await createTableAndQr(data);
    if (result.success) {
      setShowAddModal(false);
      reset();
    } else {
      setErrorMessage(result.message || "Error creating QR");
    }
  };

  const onDelete = async (id) => {
    if (!id) return;
    const result = await handleDelete(id);
    if (!result.success) {
      setErrorMessage(result.message || "Error deleting QR");
    }
  };

  const onDownload = async (qr) => {
    const result = await handleDownload(qr);
    if (!result.success) {
      setErrorMessage(result.message || "Error downloading QR");
    }
  };

  return (
    <div className="container-fluid space-y-6">
      <ConfirmModal
        message={confirmMessage}
        onCancel={() => {
          setConfirmMessage("");
          setConfirmAction(null);
        }}
        onConfirm={() => {
          confirmAction();
          setConfirmMessage("");
          setConfirmAction(null);
        }}
      />
      <ErrorModal message={errorMessage} onClose={() => setErrorMessage("")} />

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 p-3 rounded-xl">
            <MdQrCodeScanner className="text-emerald-600 w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              QR Code Management
            </h1>
            <p className="text-sm text-gray-500">
              Generate and manage table QR codes
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl shadow-md transition-all"
        >
          <FaQrcode />
          Generate QR
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total QR Codes</p>
            <h3 className="text-2xl font-bold text-emerald-600">
              {isLoading ? <Loader /> : tables.length}
            </h3>
          </div>
          <div className="bg-emerald-100 p-3 rounded-full">
            <FaQrcode className="text-emerald-600 w-6 h-6" />
          </div>
        </div>
      </div>

      {/* ADD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 h-full z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-3 sm:p-6 space-y-3"
          >
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="absolute top-2 right-4 text-2xl text-gray-500"
            >
              &times;
            </button>

            <div className="text-xl font-semibold text-center text-emerald-700">
              Generate Table QR
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Table Name
              </label>
              <input
                {...register("name", {
                  required: "Table name is required",
                })}
                placeholder="e.g. Table 1"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 text-white sm:py-2.5 py-1.5 rounded-xl hover:bg-emerald-700 transition-all disabled:opacity-60"
            >
              {isSubmitting ? "Generating..." : "Generate QR"}
            </button>
          </form>
        </div>
      )}

      {/* QR GRID */}
      {isLoading ? (
        <QrCardSkeleton count={6} />
      ) : tables.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tables.map((qr) => (
            <div
              key={qr._id}
              className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-gray-800">{qr.name}</h4>
                  <span className="text-xs text-gray-500">
                    {new Date(qr.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex justify-center">
                  <img
                    src={qr.qrImage}
                    alt={qr.name}
                    className="w-48 h-48 object-contain"
                  />
                </div>

                <div className="flex justify-between items-center pt-3 border-t">
                  <button
                    onClick={() => onDownload(qr)}
                    className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition"
                  >
                    <FaDownload size={14} />
                    <span className="text-sm">Download</span>
                  </button>

                  <button
                    onClick={() => {
                      setConfirmMessage(
                        "Are you sure you want to delete this QR?"
                      );
                      setConfirmAction(() => () => onDelete(qr._id));
                    }}
                    className="p-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-20">
          No QR codes created yet
        </div>
      )}
    </div>
  );
}

export default AdminQrCode;
