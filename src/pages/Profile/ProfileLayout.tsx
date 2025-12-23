import { Link, Outlet } from "react-router-dom";

export default function ProfileLayout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex md:flex-col w-64 bg-linear-to-b from-teal-700 to-teal-500 text-white px-6 pt-30">
        <h2 className="text-2xl font-semibold mb-8">My Profile</h2>

        <nav className="space-y-3">
          <Link className="block hover:text-teal-200 transition" to="/profile">
            Overview
          </Link>
          <Link
            className="block hover:text-teal-200 transition"
            to="/profile/favorites"
          >
            Favorites
          </Link>
          <Link
            className="block hover:text-teal-200 transition"
            to="/profile/properties"
          >
            My Properties
          </Link>
          <Link
            className="block hover:text-teal-200 transition"
            to="/profile/messages"
          >
            Messages
          </Link>
          <Link
            className="block hover:text-teal-200 transition"
            to="/profile/settings"
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden w-full bg-linear-to-r from-teal-700 to-teal-500 text-white px-4 pt-30 flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Profile</h2>

        {/* Mobile dropdown menu */}
        <details className="relative">
          <summary className="cursor-pointer px-3 py-1 bg-white/20 rounded-md">
            Menu
          </summary>

          <nav className="absolute right-0 mt-2 bg-white text-teal-700 rounded-md shadow-lg w-40 overflow-hidden">
            <Link className="block px-4 py-2 hover:bg-teal-50" to="/profile">
              Overview
            </Link>
            <Link
              className="block px-4 py-2 hover:bg-teal-50"
              to="/profile/favorites"
            >
              Favorites
            </Link>
            <Link
              className="block px-4 py-2 hover:bg-teal-50"
              to="/profile/properties"
            >
              My Properties
            </Link>
            <Link
              className="block px-4 py-2 hover:bg-teal-50"
              to="/profile/messages"
            >
              Messages
            </Link>
            <Link
              className="block px-4 py-2 hover:bg-teal-50"
              to="/profile/settings"
            >
              Settings
            </Link>
          </nav>
        </details>
      </div>

      {/* Dynamic content */}
      <main className="flex-1 p-2 md:px-10 pt-30">
        <Outlet />
      </main>
    </div>
  );
}
