
import React, { useState } from 'react';

interface FaqAccordionProps {
    question: string;
    answer: string;
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`bg-card border border-border rounded-xl shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:-translate-y-1 ${isOpen ? 'bg-primary-light border-primary/30' : ''}`}>
            <button
                onClick={toggleAccordion}
                className="w-full flex justify-between items-center text-left text-lg font-semibold text-foreground p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${question.replace(/\s+/g, '-')}`}
            >
                <span>{question}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`w-6 h-6 transform transition-transform duration-300 text-muted ${
                        isOpen ? 'rotate-180 text-primary' : 'rotate-0'
                    }`}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </button>
            <div
                id={`faq-answer-${question.replace(/\s+/g, '-')}`}
                className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="overflow-hidden">
                    <p className="text-muted px-6 pb-6 pt-0 leading-relaxed">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FaqAccordion;