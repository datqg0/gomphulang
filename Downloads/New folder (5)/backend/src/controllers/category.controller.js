const categoryService = require('../services/category.service');
const response = require('../utils/response');
const { uploadToCloudinary } = require('../utils/cloudinary');

const getCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(response.success(categories, 'Categories fetched successfully'));
    } catch (error) {
        next(error);
    }
};

const getCategory = async (req, res, next) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        if (!category) {
            return res.status(404).json(response.error('Category not found', 404));
        }
        res.status(200).json(response.success(category, 'Category fetched successfully'));
    } catch (error) {
        next(error);
    }
};

const createCategory = async (req, res, next) => {
    try {
        const categoryData = req.body;
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, 'pottery_categories', 'image');
            categoryData.image = result.secure_url;
        }
        const category = await categoryService.createCategory(categoryData);
        res.status(201).json(response.success(category, 'Category created successfully', 201));
    } catch (error) {
        next(error);
    }
};

const updateCategory = async (req, res, next) => {
    try {
        const updateData = req.body;
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, 'pottery_categories', 'image');
            updateData.image = result.secure_url;
        }
        const category = await categoryService.updateCategory(req.params.id, updateData);
        if (!category) {
            return res.status(404).json(response.error('Category not found', 404));
        }
        res.status(200).json(response.success(category, 'Category updated successfully'));
    } catch (error) {
        next(error);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const category = await categoryService.deleteCategory(req.params.id);
        if (!category) {
            return res.status(404).json(response.error('Category not found', 404));
        }
        res.status(200).json(response.success(null, 'Category deleted successfully'));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
};
