import { useState } from "react";

export default function RestaurantLookupForm({ onSubmitRestaurant }) {
  const [formData, setFormData] = useState({
    restaurantId: "",
    name: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!formData.restaurantId || !formData.name) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // 👉 perform your function here
      await onSubmitRestaurant(formData);

      // optional reset
      setFormData({
        restaurantId: "",
        name: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <form
        onSubmit={handleSubmitForm}
        className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md space-y-4 border"
      >
        <h2 className="text-2xl font-semibold text-center text-emerald-600">
          Find Restaurant
        </h2>

        {/* Restaurant ID */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Restaurant ID
          </label>
          <input
            type="text"
            name="restaurantId"
            value={formData.restaurantId}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="Enter restaurant id"
          />
        </div>

        {/* Restaurant Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Restaurant Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="Enter restaurant name"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? "Checking..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
