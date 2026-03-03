const productService = require('../services/product.service');
const response = require('../utils/response');
const { uploadToCloudinary } = require('../utils/cloudinary');

const getProducts = async (req, res, next) => {
    try {
        const { category, search, page, limit } = req.query;

        const result = await productService.getAllProducts({
            category,
            search,
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 12
        });

        res.status(200).json(response.success(result, 'Products fetched successfully'));
    } catch (error) {
        next(error);
    }
};

const getProduct = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json(response.error('Product not found', 404));
        }
        res.status(200).json(response.success(product, 'Product fetched successfully'));
    } catch (error) {
        next(error);
    }
};

const createProduct = async (req, res, next) => {
    try {
        const productData = req.body;
        
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, 'pottery_products', 'image');
            productData.image = result.secure_url;
        }

        const product = await productService.createProduct(productData);
        res.status(201).json(response.success(product, 'Product created successfully', 201));
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const updateData = req.body;

        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, 'pottery_products', 'image');
            updateData.image = result.secure_url;
        }

        const product = await productService.updateProduct(req.params.id, updateData);
        if (!product) {
            return res.status(404).json(response.error('Product not found', 404));
        }
        res.status(200).json(response.success(product, 'Product updated successfully'));
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const product = await productService.deleteProduct(req.params.id);
        if (!product) {
            return res.status(404).json(response.error('Product not found', 404));
        }
        res.status(200).json(response.success(null, 'Product deleted successfully'));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
