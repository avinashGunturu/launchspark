import React, { useEffect, useRef } from 'react';
import type { PortfolioItem } from '../types';
import CTAButton from './CTAButton';

interface PortfolioDetailModalProps {
    item: PortfolioItem;
    onClose: () => void;
    onReplicate: (item: PortfolioItem) => void;
}

const PortfolioDetailModal: React.FC<PortfolioDetailModalProps> = ({ item, onClose, onReplicate }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        const modalNode = modalRef.current;
        if (!modalNode) return;

        const focusableElements = modalNode.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        firstElement?.focus();

        const handleTabKey = (e: KeyboardEvent) => {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        modalNode.addEventListener('keydown', handleTabKey);
        
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            modalNode.removeEventListener('keydown', handleTabKey);
        };
    }, [onClose]);
    
    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-md"
            style={{ animation: 'fadeIn 0.3s ease-out forwards' }}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
             <div
                ref={modalRef}
                className="bg-card w-full max-w-3xl m-4 rounded-xl shadow-2xl border border-border/50 relative flex flex-col max-h-[90vh] overflow-hidden"
                style={{ animation: 'fadeInUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards' }}
                onClick={(e) => e.stopPropagation()}
             >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/70 rounded-full p-2 transition-colors z-20"
                    aria-label="Close modal"
                >
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                
                {/* Scrollable Content */}
                <div className="overflow-y-auto">
                    <div className="relative">
                        <img src={item.imageUrl} alt={`A detailed view of the ${item.title} website project.`} className="w-full h-auto max-h-[50vh] object-cover"/>
                    </div>
                    <div className="p-8 md:p-10">
                        <div className="flex items-center gap-3">
                            <h2 id="modal-title" className="text-3xl font-extrabold text-foreground">{item.title}</h2>
                            {false && item.liveUrl && (
                                <a
                                    href={item.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted hover:text-primary transition-colors"
                                    aria-label={`View live site for ${item.title} (opens in a new tab)`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            )}
                        </div>
                        <p className="text-primary font-semibold mt-1 mb-6">{item.sector}</p>
                        <p className="text-muted leading-relaxed">{item.description}</p>
                    </div>
                </div>

                {/* Action Footer */}
                <div className="p-6 md:p-8 mt-auto border-t border-border bg-card flex-shrink-0">
                     <div className="grid sm:grid-cols-2 gap-6 items-center">
                       <div className="text-center sm:text-left">
                           <p className="text-sm text-muted uppercase tracking-wider font-semibold">Estimated Replication Cost</p>
                           <p className="text-2xl font-bold text-foreground mt-1">{item.priceRange}</p>
                       </div>
                       <CTAButton onClick={() => onReplicate(item)} className="w-full">
                            Replicate This Design
                       </CTAButton>
                    </div>
                </div>
             </div>
        </div>
    );
};

export default PortfolioDetailModal;