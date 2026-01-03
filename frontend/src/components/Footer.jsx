
export default function Footer() {
  return (
    <footer className="mt-8 ">
      <div className="pb-4 flex items-center justify-center">
        {/* Left */}
        <div className="text-sm text-gray-500 text-center sm:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-emerald-600">ScanMyMenu</span>.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
}
