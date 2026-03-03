const mongoose = require('mongoose');

const model3dSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name for the 3D model'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        price: {
            type: Number,
            required: [true, 'Please add a price'],
        },
        modelUrl: {
            type: String,
            required: [true, 'Please add a model URL (.glb)'],
        },
        imageUrl: {
            type: String,
            required: [true, 'Please add a preview image URL'],
        },
        cloudinaryPublicId: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            default: '3D Model',
        }
    },
    {
        timestamps: true,
    }
);

const Model3D = mongoose.model('Model3D', model3dSchema);

module.exports = Model3D;
