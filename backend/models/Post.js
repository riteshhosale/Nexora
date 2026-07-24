const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        caption: {
            type: String,
            trim: true,
            maxlength: 500,
            default: "",
        },

        images: [
            {
                url: {
                    type: String,
                    required: true,
                },
                public_id: {
                    type: String,
                    required: true,
                },
            },
        ],

        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
        ],

        commentsCount: {
            type: Number,
            default: 0,
        },

        isEdited: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);