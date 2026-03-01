const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        productCode: {
            type: String,
            required: [true, 'Please add a product code'],
            unique: true,
            trim: true,
        },
        name: {
            type: String,
            required: [true, 'Please add a product name'],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'Please add a product price'],
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        category: {
            type: String,
            required: [true, 'Please add a category'],
        },
        image: {
            type: String,
            default: '',
        },
        images: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
