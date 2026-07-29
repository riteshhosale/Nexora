import { useState } from "react";
import { FaImage, FaPaperPlane } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

const CreatePost = () => {
  const { user } = useAuth();

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      caption,
      image,
    });

    // Backend Integration comes next

    setCaption("");
    setImage(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <div className="flex items-center gap-3">
        <img
          src={
            user?.profilePicture ||
            `https://ui-avatars.com/api/?name=${user?.fullName || "User"}`
          }
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <textarea
          placeholder="What's happening?"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={3}
          className="flex- resize-none border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {image && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">Selected: {image.name}</p>
        </div>
      )}

      <div className="flex justify-between items-center mt-5">
        <label className="cursor-pointer flex items-center gap-2 text-blue-500 hover:text-blue-700">
          <FaImage />
          <span>Add Image</span>

          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </label>

        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <FaPaperPlane />
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
