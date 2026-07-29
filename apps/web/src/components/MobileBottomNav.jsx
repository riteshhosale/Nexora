import { NavLink } from "react-router-dom";
import { FaHome, FaSearch, FaPlusSquare, FaBell, FaUser } from "react-icons/fa";

import { useAuth } from "../hooks/useAuth";

const MobileBottomNav = () => {
  const { user } = useAuth();

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome size={24} />,
    },
    {
      name: "Explore",
      path: "/explore",
      icon: <FaSearch size={24} />,
    },
    {
      name: "Create",
      path: "/create",
      icon: <FaPlusSquare size={24} />,
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: <FaBell size={24} />,
    },
    {
      name: "Profile",
      path: `/profile/${user?._id}`,
      icon: <FaUser size={24} />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white shadow-lg lg:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs transition-colors duration-200 ${isActive ? "text-blue-500" : "text-gray-500 hover:text-blue-500"}`
            }
          >
            {item.icon}
            <span className="mt-1">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
