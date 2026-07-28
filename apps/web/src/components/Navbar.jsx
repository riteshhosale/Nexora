import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaSearch } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-4">

                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    Nexora 
                </Link>

                {/* Search */}
                <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-96">
                    <FaSearch className="text-gray-500 mr-2" />

                    <input type="text" placeholder="Search..." className="bg-transparent outline-none ml-3 w-full" />
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-5">

                    {/* Notifications */}
                    <button className="relative">
                        <FaBell className="text-2xl text-gray-700 hover:text-blue-600 transition-colors duration-200" />

                        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                            0
                        </span> 
                    </button>

                    {/* User */}
                    <Link to={`/profile/${user?._id}`} className="flex items-center gap-3">
                        <img src={user?.profilePicture || "https://ui-avatars.com/api/?name=User"} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                        <span className="hidden md:block font-medium">
                            {user?.username || "User"}
                        </span>
                    </Link>

                    {/* Logout */}
                    <button onClick={handleLogout} className="hidden md:block px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200">
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;