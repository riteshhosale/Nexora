const axios = require("axios");
const FormData = require("form-data");

const uploadImage = async (buffer, folder) => {
    const form = new FormData();

    form.append("file", buffer, {
        filename: "image.jpg",
        contentType: "image/jpeg",
    });

    form.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);
    form.append("folder", folder);

    try {
        const { data } = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
            form,
            {
                headers: form.getHeaders(),
                maxBodyLength: Infinity,
            }
        );

        return {
            url: data.secure_url,
            public_id: data.public_id,
        };
    } catch (error) {
        throw new Error(
            error.response?.data?.error?.message || "Image upload failed"
        );
    }
};

module.exports = {
    uploadImage,
};