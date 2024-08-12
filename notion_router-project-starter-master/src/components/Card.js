import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import './Card.css'; // Ensure to create this CSS file

const Card = ({ review = {}, flipped }) => {
    // Destructure properties from review with default values
    const { question = "No question provided", answer = "No answer provided" } = review;

    return (
        <div className={`single-card ${flipped ? "flipped" : ""}`}>
            <div className="front flex flex-col md:relative">
                <div className="text-violet-400 mx-auto mt-5">
                    <FaQuoteLeft />
                </div>
                <div className="text-center mt-4 text-slate-500">{question}</div>
                <div className="text-violet-400 mx-auto mt-5">
                    <FaQuoteRight />
                </div>
            </div>
            <div className="back">
                <div className="text-center mt-4 text-slate-500">{answer}</div>
            </div>
        </div>
    );
};

export default Card;
