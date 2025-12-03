import { useContext } from "react";
import { useNavigate, NavLink } from "react-router";
import AuthContext from "../../contexts/AuthContext";
// import MobileMenue from "../MobileMenue/MobileMenue";

export default function Topbar() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const navbarItems = [
    { id: 1, title: "Home", link: "/" },
    { id: 2, title: "About us", link: "/about" },
    { id: 3, title: "News", link: "/news" },
  ];

  return (
    <div className="absolute top-0 left-0 w-full h-[9vh] flex justify-between items-center px-20 bg-black/60 text-white">
      {/* Mobile menu */}
      <div className="block md:hidden">
        mobile menu
        {/* <MobileMenue /> */}
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex w-full justify-between items-center">
        {/* Logo */}
        <div
          className="font-Fascinate text-Pine text-[2.2rem] cursor-pointer"
          onClick={() => navigate("/")}
        >
          CASA VERDE
        </div>

        {/* Right side */}
        <div className="flex justify-between items-center w-4/5">
          {/* Navbar items */}
          <div className="flex justify-end items-center gap-2">
            {navbarItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.link}
                className={({ isActive }) =>
                  `px-4 py-2 text-lg transition-colors hover:text-Lemon ${
                    isActive ? "text-Lemon bg-Lemon/20" : "text-white"
                  }`
                }
              >
                {item.title}
              </NavLink>
            ))}
          </div>

          {/* Profile / Login */}
          <div className="flex items-center gap-4">
            {authContext.isLoggedIn ? (
              <>
                <NavLink
                  to="/newproperty"
                  className="px-4 py-2 text-lg transition-colors hover:text-Lemon"
                >
                  New property
                </NavLink>
                <NavLink
                  to="/messages"
                  className="px-4 py-2 text-lg transition-colors hover:text-Lemon"
                >
                  Messages
                </NavLink>
                <NavLink
                  to="/profile"
                  className="ml-4 flex items-center gap-3 pr-4 border border-white rounded-full hover:border-Lemon transition"
                >
                  <img
                    className="w-14 h-14 rounded-full"
                    src={
                      authContext.userInfos?.profile?.image
                        ? authContext.userInfos.profile.image
                        : "./images/users/icons/artist.png"
                    }
                  />
                  <span className="text-white underline font-bold transition hover:text-Lemon">
                    {authContext.userInfos?.username}
                  </span>
                </NavLink>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <NavLink
                  to="/login"
                  className="px-4 py-2 text-lg transition-colors hover:text-Lemon"
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 text-lg border border-white rounded-md text-white transition hover:bg-Jade hover:text-Pine"
                >
                  Join us
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
