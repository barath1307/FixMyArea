import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.06] bg-[#070a12]/95 text-white backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Fix<span className="text-blue-500">MyArea</span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-7 md:flex">

          <Link
            to="/"
            className="text-sm font-medium text-slate-300 transition hover:text-blue-400"
          >
            Home
          </Link>

          <Link
            to="/issues"
            className="text-sm font-medium text-slate-300 transition hover:text-blue-400"
          >
            Issues
          </Link>

          <Link
            to="/map"
            className="text-sm font-medium text-slate-300 transition hover:text-blue-400"
          >
            Map
          </Link>

          <Link
            to="/my-reports"
            className="text-sm font-medium text-slate-300 transition hover:text-blue-400"
          >
            My Reports
          </Link>

          <Link
            to="/report"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-500"
          >
            Report an Issue
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;