
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FloatingCTA: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className={`fixed bottom-8 right-24 z-40 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <Link 
              to="/contact"
              className="bg-primary/90 text-white font-semibold py-2 px-5 rounded-full shadow-lg shadow-primary/30 backdrop-blur-sm transform hover:scale-105 hover:bg-primary-hover transition-all duration-300 ease-in-out"
            >
                Start Your Project
            </Link>
        </div>
    );
};

export default FloatingCTA;