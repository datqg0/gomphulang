const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const streamifier = require('streamifier');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// Use memory storage so we can pipe to cloudinary manually
const upload = multer({ storage: multer.memoryStorage() });

// Upload buffer to cloudinary
const uploadToCloudinary = (buffer, folder = 'pottery_app', resourceType = 'image') => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: resourceType,
                public_id: `${resourceType}_${Date.now()}`,
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};

const deleteFromCloudinary = (publicId, resourceType = 'image') => {
    return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
};

module.exports = {
    cloudinary,
    upload,
    uploadToCloudinary,
    deleteFromCloudinary,
};
