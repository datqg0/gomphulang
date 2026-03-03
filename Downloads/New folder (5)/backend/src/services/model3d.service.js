const Model3D = require('../models/model3d.model');

const getAllModels = async () => {
    return await Model3D.find().sort({ createdAt: -1 });
};

const getModelById = async (id) => {
    return await Model3D.findById(id);
};

const createModel = async (modelData) => {
    return await Model3D.create(modelData);
};

const deleteModel = async (id) => {
    return await Model3D.findByIdAndDelete(id);
};

module.exports = {
    getAllModels,
    getModelById,
    createModel,
    deleteModel,
};
