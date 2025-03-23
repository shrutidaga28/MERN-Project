require('dotenv').config(); // Ensure .env is loaded here
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

console.log("🌍 Manually Checking ENV Variables:");
console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);
console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET);

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

console.log("🚀 CLOUDINARY CONFIG:", cloudinary.config());

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "WanderLust_DEV",
        allowedFormats: ["jpeg", "png", "jpg"],
        resource_type: "image"
    }
});

module.exports = { cloudinary, storage };