const Question = require('../models/Question');

// Get all questions
const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json({
             success:true,
            data: questions});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getQuestions };