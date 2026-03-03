const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Tiêu đề bài viết là bắt buộc'],
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    excerpt: {
        type: String,
        required: [true, 'Mô tả ngắn là bắt buộc'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Nội dung bài viết là bắt buộc']
    },
    author: {
        type: String,
        default: 'Admin'
    },
    image: {
        type: String,
        required: [true, 'Ảnh đại diện bài viết là bắt buộc']
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    views: {
        type: Number,
        default: 0
    },
    qrCode: {
        type: String // Base64 Data URL
    }
}, {
    timestamps: true
});

// Middleware to create slug from title if not provided or changed
blogSchema.pre('validate', async function () {
    if (this.title && !this.slug) {
        let baseSlug = this.title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[đĐ]/g, 'd')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        // Ensure slug is unique by appending a short hash if it exists
        const Blog = this.constructor;
        let slugExists = await Blog.findOne({ slug: baseSlug });

        if (slugExists && slugExists._id.toString() !== this._id.toString()) {
            this.slug = `${baseSlug}-${Math.random().toString(36).substring(2, 7)}`;
        } else {
            this.slug = baseSlug;
        }
    }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
