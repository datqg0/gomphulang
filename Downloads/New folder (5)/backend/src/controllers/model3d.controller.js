const model3dService = require('../services/model3d.service');
const response = require('../utils/response');
const { uploadToCloudinary } = require('../utils/cloudinary');

const getModels = async (req, res, next) => {
    try {
        const models = await model3dService.getAllModels();
        res.status(200).json(response.success(models, '3D Models fetched successfully'));
    } catch (error) {
        next(error);
    }
};

const createModel = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json(response.error('Please upload a .glb file', 400));
        }

        const { name, description, price, imageUrl, category } = req.body;

        // Upload buffer to Cloudinary as raw
        const cloudResult = await uploadToCloudinary(req.file.buffer);

        const modelData = {
            name,
            description,
            price: parseFloat(price),
            imageUrl,
            category: category || '3D Model',
            modelUrl: cloudResult.secure_url,
            cloudinaryPublicId: cloudResult.public_id,
        };

        const model = await model3dService.createModel(modelData);
        res.status(201).json(response.success(model, '3D Model uploaded successfully', 201));
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
    deleteModel,
};
