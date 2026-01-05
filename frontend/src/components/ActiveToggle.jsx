function ActiveToggle({ isActive, onToggle, loading }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={loading}
      className={`relative w-14 h-7 rounded-full transition-colors duration-300
        ${isActive ? "bg-emerald-500" : "bg-gray-300"}
        ${loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md
          transform transition-transform duration-300
          ${isActive ? "translate-x-7" : "translate-x-0"}
        `}
      />
    </button>
  );
}

export default ActiveToggle;
