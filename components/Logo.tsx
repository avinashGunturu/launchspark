import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <div className={`flex items-center space-x-2.5 ${className}`}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 text-primary">
                <path d="M12 2L14.25 9.75L22 12L14.25 14.25L12 22L9.75 14.25L2 12L9.75 9.75L12 2Z" className="stroke-current fill-current/30" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M5 5L7 3" className="stroke-current" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M19 5L17 3" className="stroke-current" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M5 19L7 21" className="stroke-current" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M19 19L17 21" className="stroke-current" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-2xl font-extrabold tracking-tight">
                <span className="text-foreground">Launch</span>
                <span className="relative text-primary">
                    <span className="absolute -top-[1.1rem] left-[0.15em] text-2xl font-medium" aria-hidden="true">^</span>
                    Spark
                </span>
            </span>
        </div>
    );
};

export default Logo;