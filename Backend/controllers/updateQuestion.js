const Question = require('../models/Question');

// Update a question by ID
const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;

        // Find the question by ID and update it
        const updatedQuestion = await Question.findByIdAndUpdate(
            id,
            { question, answer },
            { new: true, runValidators: true }
        );

        if (!updatedQuestion) {
            return res.status(404).json({ message: "Question not found." });
        }

        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { updateQuestion };