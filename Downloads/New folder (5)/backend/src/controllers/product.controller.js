const productService = require('../services/product.service');
const response = require('../utils/response');

const getProducts = async (req, res, next) => {
    try {
        const filters = {};
        if (req.query.category) filters.category = req.query.category;

        const products = await productService.getAllProducts(filters);
        res.status(200).json(response.success(products, 'Products fetched successfully'));
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
        const product = await productService.createProduct(req.body);
        res.status(201).json(response.success(product, 'Product created successfully', 201));
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
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
