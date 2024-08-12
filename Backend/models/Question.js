const mongoose = require('mongoose');

// Define the schema for the Question model
const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    answer: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Add a pre-save hook to update the updatedAt field
questionSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Create and export the model
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;