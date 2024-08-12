const Question = require('../models/Question');

// Delete a question by ID
const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the question by ID and delete it
        const deletedQuestion = await Question.findByIdAndDelete(id);

        // If no question found, return 404
        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question not found." });
        }

        res.status(200).json({ message: "Question deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { deleteQuestion };