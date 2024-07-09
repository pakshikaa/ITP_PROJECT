const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

// Initialize mongoose-auto-increment
autoIncrement.initialize(mongoose.connection);

// Define the schema
const supSchema = mongoose.Schema({
    F_name: {
        type: String,
        required: true,
    },
    L_name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Phone: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    check: {
        type: String,
    },
    id2: {
        type: Number,
        unique: true,
    }
});

// Add pre-save middleware to auto-generate id2
supSchema.pre('save', async function (next) {
    try {
        if (!this.isNew) return next(); // Only generate id2 for new documents
        const count = await this.constructor.countDocuments();
        this.id2 = count + 1;
        next();
    } catch (error) {
        next(error);
    }
});

// Create the model
const supModel = mongoose.model("supplier", supSchema);

module.exports = supModel;
