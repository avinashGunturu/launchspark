
import React, { useEffect } from 'react';

interface SuccessPopupProps {
    message: string;
    onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000); // Auto-close after 5 seconds
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div 
            role="alert"
            className="fixed top-5 right-5 z-[100] flex items-center p-4 mb-4 max-w-sm w-full text-foreground bg-primary-light border border-primary rounded-lg shadow-lg animate-fade-in-up"
        >
            <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <div className="ml-3 text-sm font-medium">
                {message}
            </div>
            <button 
                type="button" 
                className="ml-auto -mx-1.5 -my-1.5 bg-primary-light text-foreground rounded-lg focus:ring-2 focus:ring-primary/50 p-1.5 hover:bg-primary/20 inline-flex h-8 w-8" 
                aria-label="Close"
                onClick={onClose}
            >
                <span className="sr-only">Close</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </div>
    );
};

export default SuccessPopup;
