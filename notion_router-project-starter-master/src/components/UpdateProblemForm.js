import React, { useState, useEffect } from 'react';

const UpdateProblemForm = ({ problem, onClose, onSubmit }) => {
    const [text, setText] = useState(problem?.question || '');
    const [answer, setAnswer] = useState(problem?.answer || '');

    useEffect(() => {
        if (problem) {
            setText(problem.question);
            setAnswer(problem.answer);
        }
    }, [problem]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (problem) {
            const updatedProblem = { ...problem, question: text, answer };
            onSubmit(updatedProblem);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-violet-500">Update Problem</h2>
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
                        <button
                            type="submit"
                            className="bg-violet-400 hover:bg-violet-500 transition-all duration-200 cursor-pointer px-10 py-2 rounded-md font-bold text-white text-lg"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 hover:bg-gray-500 transition-all duration-200 cursor-pointer px-10 py-2 rounded-md font-bold text-white text-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProblemForm;
