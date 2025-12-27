import { NavLink, Outlet } from "react-router-dom";

export default function ProfileLayout() {
  const profileLinks = [
    { label: "Overview", to: "/profile" },
    { label: "Favorites", to: "/profile/favorites" },
    { label: "My Properties", to: "/profile/properties" },
    { label: "Messages", to: "/profile/messages" },
    { label: "Settings", to: "/profile/settings" },
  ];

  return (
    <>
      <div className="h-20 bg-linear-to-r from-teal-800 via-teal-400 to-teal-300"></div>

      <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
        {/* Sidebar (desktop) */}
        <aside
          className="hidden md:flex md:flex-col w-64 
          bg-linear-to-b from-teal-800 via-teal-600 to-teal-500
          text-white p-6"
        >
          <h2 className="text-2xl font-semibold mb-8 tracking-wide">
            My Profile
          </h2>

          <nav className="flex flex-col space-y-2">
            {profileLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/profile"} // 👈 Fixes Overview always active
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-white/20 text-Mint pl-4"
                      : "hover:bg-white/10 hover:text-Mint"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Mobile top bar */}
        <div className="md:hidden w-full bg-linear-to-r from-teal-700 to-teal-500 text-white px-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">My Profile</h2>

          {/* Mobile dropdown menu */}
          <details className="relative">
            <summary className="cursor-pointer px-3 py-1 bg-white/20 rounded-md">
              Menu
            </summary>

            <nav className="absolute right-0 mt-2 bg-white text-teal-700 rounded-md shadow-lg w-40 overflow-hidden">
              {profileLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/profile"}
                  className={({ isActive }) =>
                    `block px-4 py-2 transition
                    ${
                      isActive
                        ? "bg-teal-100 font-semibold"
                        : "hover:bg-teal-50"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </details>
        </div>

        {/* Dynamic content */}
        <main className="flex-1 md:px-10 pt-8">
          <Outlet />
        </main>
      </div>
    </>
  );
}
