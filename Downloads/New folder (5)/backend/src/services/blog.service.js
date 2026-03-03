const Blog = require('../models/blog.model');
const QRCode = require('qrcode');

const getAllBlogs = async (query = {}) => {
    return await Blog.find(query).sort({ createdAt: -1 });
};

const getBlogBySlug = async (slug) => {
    return await Blog.findOneAndUpdate(
        { slug, status: 'published' },
        { $inc: { views: 1 } },
        { new: true }
    );
};

const getBlogById = async (id) => {
    return await Blog.findById(id);
};

const createBlog = async (blogData, frontendBaseUrl) => {
    const blog = new Blog(blogData);

    // Generate QR Code for the blog URL
    const blogUrl = `${frontendBaseUrl}/blogs/${blog.slug}`;
    try {
        const qrCodeDataUrl = await QRCode.toDataURL(blogUrl, {
            color: {
                dark: '#8B4513',
                light: '#F5E6D3'
            },
            width: 300,
            margin: 2
        });
        blog.qrCode = qrCodeDataUrl;
    } catch (err) {
        console.error('QR Code generation failed:', err);
    }

    return await blog.save();
};

const updateBlog = async (id, updateData, frontendBaseUrl) => {
    // If slug changes, we might want to regenerate QR code
    if (updateData.slug || updateData.title) {
        const slug = updateData.slug || updateData.title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        const blogUrl = `${frontendBaseUrl}/blogs/${slug}`;
        try {
            updateData.qrCode = await QRCode.toDataURL(blogUrl, {
                color: { dark: '#8B4513', light: '#F5E6D3' },
                width: 300,
                margin: 2
            });
        } catch (err) {
            console.error('QR Code regeneration failed:', err);
        }
    }

    return await Blog.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

const deleteBlog = async (id) => {
    return await Blog.findByIdAndDelete(id);
};

module.exports = {
    getAllBlogs,
    getBlogBySlug,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
};
