require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.uploader
  .upload("./test.jpg", {
    folder: "nexora-test",
  })
  .then((result) => {
    console.log("SUCCESS");
    console.log(result);
  })
  .catch((error) => {
    console.log("ERROR");
    console.log(error);
  });