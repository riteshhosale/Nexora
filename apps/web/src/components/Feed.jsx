import { useEffect, useState } from "react";
import { getAllPosts } from "../api/postApi";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";
import { toast } from "react-hot-toast";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const { data } = await getAllPosts();
      setPosts(data.posts);
    } catch (error) {
      toast.error("Failed to load posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="space-y-6">
      <CreatePost onPostCreated={fetchPosts} />

      {posts.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-center">
          No posts yet.
        </div>
      ) : (
        posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))
      )}
    </div>
  );
};

export default Feed;