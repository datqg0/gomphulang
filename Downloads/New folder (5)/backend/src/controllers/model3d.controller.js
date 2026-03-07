const model3dService = require('../services/model3d.service');
const response = require('../utils/response');
const { uploadToCloudinary } = require('../utils/cloudinary');

const getModels = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const data = await model3dService.getAllModels(page, limit);
        res.status(200).json(response.success(data, '3D Models fetched successfully'));
    } catch (error) {
        next(error);
    }
};

const createModel = async (req, res, next) => {
    try {
        const modelFile = req.files && req.files['model'] ? req.files['model'][0] : null;
        const imageFile = req.files && req.files['image'] ? req.files['image'][0] : null;

        if (!modelFile) {
            return res.status(400).json(response.error('Please upload a .glb file', 400));
        }

        const { name, description, price, imageUrl, category } = req.body;

        // Upload model buffer to Cloudinary as raw
        const modelCloudResult = await uploadToCloudinary(modelFile.buffer, 'pottery_app_models', 'raw');

        let finalImageUrl = imageUrl;
        if (imageFile) {
            const imageCloudResult = await uploadToCloudinary(imageFile.buffer, 'pottery_app_previews', 'image');
            finalImageUrl = imageCloudResult.secure_url;
        }

        const modelData = {
            name,
            description,
            price: parseFloat(price),
            imageUrl: finalImageUrl,
            category: category || '3D Model',
            modelUrl: modelCloudResult.secure_url,
            cloudinaryPublicId: modelCloudResult.public_id,
        };

        const model = await model3dService.createModel(modelData);
        res.status(201).json(response.success(model, '3D Model uploaded successfully', 201));
    } catch (error) {
        next(error);
    }
};

const updateModel = async (req, res, next) => {
    try {
        const modelFile = req.files && req.files['model'] ? req.files['model'][0] : null;
        const imageFile = req.files && req.files['image'] ? req.files['image'][0] : null;

        const { name, description, price, imageUrl, category } = req.body;
        const updateData = {
            name,
            description,
            price: parseFloat(price),
            imageUrl,
            category: category || '3D Model',
        };

        if (modelFile) {
            // New model file uploaded
            const modelCloudResult = await uploadToCloudinary(modelFile.buffer, 'pottery_app_models', 'raw');
            updateData.modelUrl = modelCloudResult.secure_url;
            updateData.cloudinaryPublicId = modelCloudResult.public_id;
        }

        if (imageFile) {
            // New image file uploaded
            const imageCloudResult = await uploadToCloudinary(imageFile.buffer, 'pottery_app_previews', 'image');
            updateData.imageUrl = imageCloudResult.secure_url;
        }

        const model = await model3dService.updateModel(req.params.id, updateData);
        if (!model) {
            return res.status(404).json(response.error('Model not found', 404));
        }
        res.status(200).json(response.success(model, '3D Model updated successfully'));
    } catch (error) {
        next(error);
    }
};

const deleteModel = async (req, res, next) => {
    try {
        const model = await model3dService.deleteModel(req.params.id);
        if (!model) {
            return res.status(404).json(response.error('Model not found', 404));
        }
        res.status(200).json(response.success(null, '3D Model deleted successfully'));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getModels,
    createModel,
    updateModel,
    deleteModel,
};
