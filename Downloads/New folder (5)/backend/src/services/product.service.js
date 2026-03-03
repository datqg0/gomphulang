const Product = require('../models/product.model');

const getAllProducts = async ({ category, search, page = 1, limit = 10 } = {}) => {
    const filters = {};
    if (category && category !== 'all') {
        filters.category = category;
    }
    if (search) {
        filters.name = { $regex: search, $options: 'i' };
    }

    const skip = (page - 1) * limit;

    const [products, totalProducts] = await Promise.all([
        Product.find(filters)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        Product.countDocuments(filters)
    ]);

    return {
        products,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page
    };
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
