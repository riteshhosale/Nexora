import { useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaBookmark,
  FaRegBookmark,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import {
  likePost,
  savePost,
  deletePost,
} from "../api/postApi";

const PostCard = ({ post }) => {
  const { user } = useAuth();

  const [likes, setLikes] = useState(post.likes || []);
  const [savedBy, setSavedBy] = useState(post.savedBy || []);
  const [deleted, setDeleted] = useState(false);

  const isOwner = user?._id === post.user?._id;
  const isLiked = likes.includes(user?._id);
  const isSaved = savedBy.includes(user?._id);

  const handleLike = async () => {
    try {
      await likePost(post._id);

      if (isLiked) {
        setLikes(likes.filter((id) => id !== user._id));
      } else {
        setLikes([...likes, user._id]);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update like"
      );
    }
  };

  const handleSave = async () => {
    try {
      await savePost(post._id);

      if (isSaved) {
        setSavedBy(savedBy.filter((id) => id !== user._id));
      } else {
        setSavedBy([...savedBy, user._id]);
      }

      toast.success(isSaved ? "Post unsaved" : "Post saved");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to save post"
      );
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await deletePost(post._id);

      toast.success("Post deleted");

      setDeleted(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete post"
      );
    }
  };

  if (deleted) return null;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src={
              post.user?.profilePicture ||
              `https://ui-avatars.com/api/?name=${post.user?.fullName || "User"}`
            }
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <h3 className="font-semibold">
              {post.user?.fullName}
            </h3>

            <p className="text-sm text-gray-500">
              @{post.user?.username}
            </p>
          </div>
        </div>

        {isOwner && (
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600"
          >
            <FaTrash />
          </button>
        )}
      </div>

      {/* Caption */}
      {post.caption && (
        <p className="px-4 pb-3 text-gray-700">
          {post.caption}
        </p>
      )}

      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="w-full max-h-[500px] object-cover"
        />
      )}

      {/* Actions */}
      <div className="flex justify-between items-center p-4 border-t">
        <div className="flex gap-6">
          <button
            onClick={handleLike}
            className="flex items-center gap-2"
          >
            {isLiked ? (
              <FaHeart className="text-red-500 text-xl" />
            ) : (
              <FaRegHeart className="text-xl" />
            )}

            <span>{likes.length}</span>
          </button>

          <button className="flex items-center gap-2">
            <FaRegComment className="text-xl" />

            <span>{post.comments?.length || 0}</span>
          </button>
        </div>

        <button onClick={handleSave}>
          {isSaved ? (
            <FaBookmark className="text-blue-600 text-xl" />
          ) : (
            <FaRegBookmark className="text-xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PostCard;