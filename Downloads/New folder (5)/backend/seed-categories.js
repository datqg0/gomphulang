const mongoose = require('mongoose');
const Category = require('./src/models/category.model');
require('dotenv').config();

const categories = [
    {
        name: "Bình hoa",
        slug: "binh-hoa",
        description: "Các loại bình hoa gốm sứ tinh xảo",
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800",
        icon: "🌸"
    },
    {
        name: "Chén trà",
        slug: "chen-tra",
        description: "Bộ chén trà truyền thống",
        image: "https://images.unsplash.com/photo-1610701596295-4dc5d6289214?w=800",
        icon: "🥣"
    },
    {
        name: "Bộ ấm",
        slug: "bo-am",
        description: "Ấm trà gốm sứ cao cấp",
        image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800",
        icon: "🫖"
    },
    {
        name: "Trang trí",
        slug: "trang-tri",
        description: "Đồ trang trí gốm sứ độc đáo",
        image: "https://images.unsplash.com/photo-1588946502132-c3fc69c31047?w=800",
        icon: "✨"
    }
];

const seedCategories = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing categories
        await Category.deleteMany({});
        console.log('Cleared existing categories');

        // Insert new categories
        await Category.insertMany(categories);
        console.log('Seeded categories successfully');

        process.exit();
    } catch (error) {
        console.error('Error seeding categories:', error);
        process.exit(1);
    }
};

seedCategories();
