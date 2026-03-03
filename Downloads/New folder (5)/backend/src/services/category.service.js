const Category = require('../models/category.model');

const getAllCategories = async () => {
    return await Category.find();
};

const getCategoryById = async (id) => {
    return await Category.findById(id);
};

const getCategoryBySlug = async (slug) => {
    return await Category.findOne({ slug });
};

const createCategory = async (categoryData) => {
    return await Category.create(categoryData);
};

const updateCategory = async (id, categoryData) => {
    return await Category.findByIdAndUpdate(id, categoryData, {
        new: true,
        runValidators: true,
    });
};

const deleteCategory = async (id) => {
    return await Category.findByIdAndDelete(id);
};

module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryBySlug,
    createCategory,
    updateCategory,
    deleteCategory,
};
