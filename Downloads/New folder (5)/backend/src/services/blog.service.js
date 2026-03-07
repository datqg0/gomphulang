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

    // Validate to trigger the 'pre-validate' hook which generates the slug
    await blog.validate();

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
    const blog = await Blog.findById(id);
    if (!blog) return null;

    Object.assign(blog, updateData);

    // Validate to trigger the 'pre-validate' hook to update slug if title changed
    await blog.validate();

    // If title or slug changes, we might want to regenerate QR code
    if (updateData.slug || updateData.title) {
        const blogUrl = `${frontendBaseUrl}/blogs/${blog.slug}`;
        try {
            blog.qrCode = await QRCode.toDataURL(blogUrl, {
                color: { dark: '#8B4513', light: '#F5E6D3' },
                width: 300,
                margin: 2
            });
        } catch (err) {
            console.error('QR Code regeneration failed:', err);
        }
    }

    return await blog.save();
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
