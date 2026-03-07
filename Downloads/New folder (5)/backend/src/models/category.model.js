const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a category name'],
            unique: true,
            trim: true,
        },
        slug: {
            type: String,
            required: [true, 'Please add a slug'],
            unique: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: '🏺',
        },
    },
    {
        timestamps: true,
    }
);

// Create slug from name before validation
categorySchema.pre('validate', async function () {
    if (this.name && !this.slug) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
