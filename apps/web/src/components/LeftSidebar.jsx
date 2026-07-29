import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaCompass,
  FaBell,
  FaBookmark,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

const LeftSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome />,
    },

    {
      name: "Explore",
      path: "/explore",
      icon: <FaCompass />,
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: <FaBell />,
    },

    {
      name: "Bookmarks",
      path: "/bookmarks",
      icon: <FaBookmark />,
    },

    {
      name: "Profile",
      path: `/profile/${user?._id}`,
      icon: <FaUser />,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-5 sticky top-24">
      {/* User Info */}
      <div className="flex flex-col items-center border-b pb-5 mb-5">
        <img
          src={
            user?.profilePicture ||
            `https://ui-avatars.com/api/?name=${user?.fullName || "User"}`
          }
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <h2 className="mt-3 text-lg font-semibold"> {user?.fullName} </h2>
        <p className="text-gray-600 text-sm"> @{user?.username}</p>
      </div>

      {/* Navigation */}
      <nav className="mt-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200 text-gray-700"}`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-6 w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default LeftSidebar;
