
import React, { useEffect, useRef } from 'react';
import CTAButton from './CTAButton';

interface FailureModalProps {
    message: string;
    onClose: () => void;
}

const FailureModal: React.FC<FailureModalProps> = ({ message, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        modalRef.current?.focus();
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/50 backdrop-blur-md"
            style={{ animation: 'fadeIn 0.3s ease-out forwards' }}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="failure-modal-title"
        >
            <div
                ref={modalRef}
                tabIndex={-1}
                className="bg-card w-full max-w-md m-4 rounded-xl shadow-2xl border border-border/50 relative flex flex-col p-8 text-center"
                style={{ animation: 'fadeInUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards' }}
                onClick={(e) => e.stopPropagation()}
            >
                 <div className="mx-auto bg-red-100 dark:bg-red-900/30 text-red-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 id="failure-modal-title" className="text-2xl font-bold text-foreground mb-4">An Error Occurred</h2>
                <p className="text-muted mb-8">{message || 'Something went wrong. Please try again.'}</p>
                <CTAButton onClick={onClose}>Close</CTAButton>
            </div>
        </div>
    );
};

export default FailureModal;
