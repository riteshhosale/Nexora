import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-5xl mx-auto w-full bg-white rounded-lg shadow-lg p-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">
            Welcome to Nexora
          </h1>

          <div className="mt-6 space-y-2">
            <h2 className="text-xl font-semibold text-gray-700">
              {user?.fullName}
            </h2>

            <p className="text-gray-600">@{user?.username}</p>

            <p className="text-gray-600">{user?.email}</p>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => navigate(`/profile/${user?._id}`)}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              My Profile
            </button>

            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
