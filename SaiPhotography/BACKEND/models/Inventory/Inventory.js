const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        rquantity: {
            type: Number,
            required: true
        },
      
        totalPrice: {
            type: String,
            required: true
        },
        id2: {
            type: Number,
            unique: true,
        }
    },
    {
        timestamps: true
    }
);
inventorySchema.pre('save', async function (next) {
    try {
        if (!this.isNew) return next(); // Only generate id2 for new documents
        const count = await this.constructor.countDocuments();
        this.id2 = count + 1;
        next();
    } catch (error) {
        next(error);
    }
});


module.exports = mongoose.model("Products", inventorySchema);