const { uploadToCloudinary } = require('../utils/cloudinary');

exports.uploadMedia = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                msg: 'No file provided'
            });
        }

        // Upload to cloudinary with auto resource type so it accepts image/video/audio
        const result = await uploadToCloudinary(req.file.buffer, 'pottery_app', 'auto');

        // Jodit Editor file uploader expected format
        return res.status(200).json({
            success: true,
            time: new Date().toISOString(),
            data: {
                baseurl: result.secure_url,
                messages: [],
                isImages: [result.resource_type === 'image'],
                code: 220
            }
        });

    } catch (error) {
        console.error('Error uploading media:', error);
        return res.status(500).json({
            success: false,
            msg: error.message || 'Server error while uploading media'
        });
    }
};
