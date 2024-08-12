const Question = require('../models/Question');

// Create a new question
const createQuestion = async (req, res) => {
    try {
        const { question, answer } = req.body;

        // Check if both question and answer are provided
        if (!question || !answer) {
            return res.status(400).json({ message: "Question and Answer are required." });
        }

        const newQuestion = new Question({ question, answer });
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createQuestion };