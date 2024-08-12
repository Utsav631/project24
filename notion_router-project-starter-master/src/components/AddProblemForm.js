import React, { useState } from 'react';
import axios from 'axios';

const AddProblemForm = ({ onClose, onSubmit }) => {
    const [text, setText] = useState('');
    const [answer, setAnswer] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newProblem = {
            question: text,
            answer: answer
        };
    
        try {
            await axios.post('http://localhost:4002/api/v1/admin/createQuestion', newProblem, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            onSubmit(newProblem);
            onClose();
        } catch (error) {
            if (error.response) {
                console.error('Error adding problem:', error.response.data);
            } else {
                console.error('Error adding problem:', error.message);
            }
        }
    };
    

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-violet-500">Add Problem</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 text-slate-500">Problem Text</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            rows="4"
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-slate-500">Answer</label>
                        <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            rows="2"
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div className="flex gap-4">
                        <button type="submit" className="bg-violet-400 hover:bg-violet-500 text-white px-4 py-2 rounded-md">Add</button>
                        <button type="button" onClick={onClose} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProblemForm;
