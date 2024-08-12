import React, { useEffect, useState } from "react";
import Card from "./Card";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import AddProblemForm from "./AddProblemForm";
import UpdateProblemForm from "./UpdateProblemForm";
import axios from "axios";

const Testimonial = ({ reviews, setReviews, isLoggedIn }) => {
    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [currentProblem, setCurrentProblem] = useState(null);

    const leftShiftHandler = () => {
        setIndex(index - 1 < 0 ? reviews.length - 1 : index - 1);
        setFlipped(false);
    };

    const rightShiftHandler = () => {
        setIndex(index + 1 >= reviews.length ? 0 : index + 1);
        setFlipped(false);
    };

    const surpriseShiftHandler = () => {
        setFlipped(!flipped);
    };

    const handleAddProblem = () => {
        setShowAddForm(true);
    };

    const handleUpdateProblem = (problem) => {
        setCurrentProblem(problem);
        setShowUpdateForm(true);
    };

    const handleAddProblemClose = () => {
        setShowAddForm(false);
    };

    const handleUpdateProblemClose = () => {
        setShowUpdateForm(false);
        setCurrentProblem(null);
    };

    const handleAddProblemSubmit = (newProblem) => {
        setReviews((prevReviews) => [...prevReviews, newProblem]);
        setShowAddForm(false);
    };

    const handleUpdateProblemSubmit = (updatedProblem) => {
        setReviews((prevReviews) =>
            prevReviews.map((review) =>
                review.id === updatedProblem.id ? updatedProblem : review
            )
        );
        setShowUpdateForm(false);
        setCurrentProblem(null);
    };

    async function fetchProblems() {
        try {
            const response = await axios.get("http://localhost:4002/api/v1/admin/getQuestions");
            setReviews(response.data.data);
        } catch (error) {
            console.log("Error in getting the questions: ", error);
        }
    }

    useEffect(() => {
        fetchProblems();
    }, []);

    return (
        <div className="flex flex-col w-[85vw] md:w-[700px] bg-white justify-center items-center mt-10 p-10 transition-all duration-700 hover:shadow-xl rounded-md">
            {reviews.length > 0 && <Card review={reviews[index]} flipped={flipped} />}
            <div className="flex text-3xl mt-5 gap-3 text-violet-400 font-bold mx-auto text-center">
                <button
                    className="cursor-pointer hover:text-violet-500"
                    onClick={leftShiftHandler}
                >
                    <FiChevronLeft />
                </button>
                <button
                    className="cursor-pointer hover:text-violet-500"
                    onClick={rightShiftHandler}
                >
                    <FiChevronRight />
                </button>
            </div>

            <div className="mt-6 flex gap-4 justify-center">
                {isLoggedIn && (
                    <>
                        <button
                            className="bg-violet-400 hover:bg-violet-500 transition-all duration-200 cursor-pointer px-10 py-2 rounded-md font-bold text-white text-lg"
                            onClick={handleAddProblem}
                        >
                            Add Problem
                        </button>
                        <button
                            className="bg-violet-400 hover:bg-violet-500 transition-all duration-200 cursor-pointer px-10 py-2 rounded-md font-bold text-white text-lg"
                            onClick={() => handleUpdateProblem(reviews[index])}
                        >
                            Update Problem
                        </button>
                    </>
                )}
                <button
                    className="bg-violet-400 hover:bg-violet-500 transition-all duration-200 cursor-pointer px-10 py-2 rounded-md font-bold text-white text-lg"
                    onClick={surpriseShiftHandler}
                >
                    Show Answer
                </button>
            </div>

            {showAddForm && <AddProblemForm onClose={handleAddProblemClose} onSubmit={handleAddProblemSubmit} />}
            {showUpdateForm && <UpdateProblemForm problem={currentProblem} onClose={handleUpdateProblemClose} onSubmit={handleUpdateProblemSubmit} />}
        </div>
    );
};

export default Testimonial;
