const blogService = require('../services/blog.service');
const response = require('../utils/response');
const { uploadToCloudinary } = require('../utils/cloudinary');

const getBlogs = async (req, res, next) => {
    try {
        const query = req.query.status ? { status: req.query.status } : {};
        const blogs = await blogService.getAllBlogs(query);
        res.status(200).json(response.success(blogs, 'Blogs fetched successfully'));
    } catch (error) {
        next(error);
    }
};

const getBlog = async (req, res, next) => {
    try {
        const blog = await blogService.getBlogBySlug(req.params.slug);
        if (!blog) {
            return res.status(404).json(response.error('Blog bài viết không tồn tại', 404));
        }
        res.status(200).json(response.success(blog, 'Blog fetched successfully'));
    } catch (error) {
        next(error);
    }
};

const createBlog = async (req, res, next) => {
    try {
        const blogData = req.body;
        const frontendUrl = req.headers.origin || 'http://localhost:5173';

        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, 'pottery_blogs', 'image');
            blogData.image = result.secure_url;
        }

        const blog = await blogService.createBlog(blogData, frontendUrl);
        res.status(201).json(response.success(blog, 'Blog created successfully', 201));
    } catch (error) {
        next(error);
    }
};

const updateBlog = async (req, res, next) => {
    try {
        const updateData = req.body;
        const frontendUrl = req.headers.origin || 'http://localhost:5173';

        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, 'pottery_blogs', 'image');
            updateData.image = result.secure_url;
        }

        const blog = await blogService.updateBlog(req.params.id, updateData, frontendUrl);
        if (!blog) {
            return res.status(404).json(response.error('Blog không tồn tại', 404));
        }
        res.status(200).json(response.success(blog, 'Blog updated successfully'));
    } catch (error) {
        next(error);
    }
};

const deleteBlog = async (req, res, next) => {
    try {
        const blog = await blogService.deleteBlog(req.params.id);
        if (!blog) {
            return res.status(404).json(response.error('Blog không tồn tại', 404));
        }
        res.status(200).json(response.success(null, 'Blog deleted successfully'));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
};
