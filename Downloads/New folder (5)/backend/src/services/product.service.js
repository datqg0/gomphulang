const Product = require('../models/product.model');

const getAllProducts = async (filters = {}) => {
    return await Product.find(filters).sort({ createdAt: -1 });
};

const getProductById = async (id) => {
    return await Product.findById(id);
};

const createProduct = async (productData) => {
    return await Product.create(productData);
};

const updateProduct = async (id, productData) => {
    return await Product.findByIdAndUpdate(id, productData, {
        new: true,
        runValidators: true,
    });
};

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

const getProductByCode = async (productCode) => {
    return await Product.findOne({ productCode });
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductByCode,
};
