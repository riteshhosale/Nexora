import { Link } from "react-router-dom";

const suggestedUsers = [
  {
    id: 1,
    fullName: "John Doe",
    username: "johndoe",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    username: "janesmith",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    fullName: "Alex Johnson",
    username: "alexjohnson",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

const trendingTopics = [
  "#ReactJS",
  "#MERN",
  "#JavaScript",
  "#WebDevelopment",
  "#TailwindCSS",
];

const RightSidebar = () => {
  return (
    <div className="space-y-6">
      {/* Suggested Users */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h2 className="text-lg font-semibold mb-4">
          Suggested for You
        </h2>

        <div className="space-y-4">
          {suggestedUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between"
            >
              <Link
                to={`/profile/${user.id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-medium">
                    {user.fullName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    @{user.username}
                  </p>
                </div>
              </Link>

              <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h2 className="text-lg font-semibold mb-4">
          Trending
        </h2>

        <div className="space-y-3">
          {trendingTopics.map((topic) => (
            <div
              key={topic}
              className="cursor-pointer hover:text-blue-600 transition"
            >
              {topic}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;