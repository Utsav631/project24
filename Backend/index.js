const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();

require("dotenv").config();
const port = process.env.port || 4000;

const Question = require('./models/Question');

// POST route to add a new question
router.post('/createQuestion', async (req, res) => {
    try {
        const { question, answer } = req.body;

        const newQuestion = new Question({
            question,
            answer,
        });

        await newQuestion.save();
        res.status(201).json({
            success: true,
            message: 'Question added successfully',
            data: newQuestion,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to add question',
            error: error.message,
        });
    }
});

// GET route to fetch all questions
router.get('/getQuestions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json({
            success: true,
            data: questions,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch questions',
            error: error.message,
        });
    }
});

// Allow requests from http://localhost:3000
app.use(cors({
    origin: 'http://localhost:3000',
}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));  

// Importing routes
const adminRoutes = require("./routes/admin");
const clientRoutes = require("./routes/client");

// Using routes
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/client', clientRoutes);


app.listen(port, () => {
    console.log("Server started at port no " + port);
});

const dbConnect = require("./config/database");
dbConnect();

// Root route
app.get("/", (req, res) => {
    res.send('<h1>This is h1</h1>');
});


app.post('/api/v1/admin/createQuestion', (req, res) => {
    console.log('Received data:', req.body); // Log the received data
    const { question, answer } = req.body;

    if (!question || !answer) {
        return res.status(400).send({ message: 'Question and answer are required' });
    }

    const newQuestion = { question, answer };
    // Save to database...

    res.status(201).send({ message: 'Question added successfully', data: newQuestion });
});


router.put('/updateQuestion/:id', async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;

    try {
        const updatedQuestion = await Question.findByIdAndUpdate(id, { question, answer }, { new: true });
        if (!updatedQuestion) {
            return res.status(404).send({ message: 'Question not found' });
        }
        res.send({ message: 'Question updated successfully', data: updatedQuestion });
    } catch (error) {
        console.error('Error updating question:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

const { deleteQuestion } = require('./controllers/deleteQuestion'); // Update the path as necessary

// DELETE route to delete a question by ID
router.delete('/deleteQuestion/:id', deleteQuestion);
