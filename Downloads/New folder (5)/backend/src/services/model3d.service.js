const Model3D = require('../models/model3d.model');

const getAllModels = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const models = await Model3D.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Model3D.countDocuments();
    return {
        models,
        total,
        pages: Math.ceil(total / limit),
        currentPage: page
    };
};

const getModelById = async (id) => {
    return await Model3D.findById(id);
};

const createModel = async (modelData) => {
    return await Model3D.create(modelData);
};

const updateModel = async (id, updateData) => {
    return await Model3D.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteModel = async (id) => {
    return await Model3D.findByIdAndDelete(id);
};

module.exports = {
    getAllModels,
    getModelById,
    createModel,
    updateModel,
    deleteModel,
};
