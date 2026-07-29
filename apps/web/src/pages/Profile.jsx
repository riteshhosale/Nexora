import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="h-52 bg-blue-600 flex items-center justify-center"></div>

          <div className="px-8 pb-8">
            <img
              src={user?.profilePicture || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white -mt-16 object-cover mx-auto"
            />

            <h2 className="text-2xl font-bold text-center mt-4">
              {user?.fullName}
            </h2>

            <p className="text-gray-500 text-center">@{user?.username}</p>

            <p className="text-gray-600 text-center mt-2">
              {user?.bio || "No bio available."}
            </p>

            <div className="grid grid-cols-3 gap-6 mt-8 text-center">
              <div>
                <h3 className="font-semibold text-xl text-gray-700">
                  {user?.followers?.length || 0}
                </h3>
                <p className="text-gray-500">Followers</p>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-gray-700">
                  {user?.following?.length || 0}
                </h3>
                <p className="text-gray-500">Following</p>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-gray-700">
                  {user?.posts?.length || 0}
                </h3>
                <p className="text-gray-500">Posts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
