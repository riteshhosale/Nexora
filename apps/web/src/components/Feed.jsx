import CreatePost from "./CreatePost";

const Feed = () => {
  return (
    <div className="space-y-6">
      <CreatePost />

      <div className="bg-white rounded-xl shadow-md p-10 text-center text-gray-500">
        No posts yet. Be the first to post!
      </div>
    </div>
  );
};

export default Feed;
