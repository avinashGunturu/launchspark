
import React, { useState, useEffect, useRef } from 'react';
import CTAButton from './CTAButton';
import type { PortfolioItem } from '../types';

interface ReplicationModalProps {
    item: PortfolioItem;
    onClose: () => void;
}

const initialFormState = {
    name: '',
    email: '',
    mobile: '',
    notes: '',
};

type FormState = typeof initialFormState;

const ReplicationModal: React.FC<ReplicationModalProps> = ({ item, onClose }) => {
    const [formState, setFormState] = useState<FormState>(initialFormState);
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
        if (errors[name as keyof FormState]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
        }
    };

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof FormState, string>> = {};
        if (!formState.name.trim()) newErrors.name = 'Full name is required.';
        if (!formState.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
            newErrors.email = 'Email address is invalid.';
        }
        if (!formState.mobile.trim()) {
            newErrors.mobile = 'Mobile number is required.';
        } else if (!/^\+?[0-9\s-]{10,15}$/.test(formState.mobile)) {
            newErrors.mobile = 'Please enter a valid mobile number.';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log('Replication Request submitted:', { ...formState, project: item.title, priceRange: item.priceRange });
            setIsSubmitted(true);
        }
    };
    
    const inputClasses = "w-full bg-background border border-border rounded-lg py-3 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition duration-300 shadow-sm";
    const disabledInputClasses = `${inputClasses} bg-muted-light cursor-not-allowed text-muted`;

    return (
        <div 
            className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/50 backdrop-blur-md"
            style={{ animation: 'fadeIn 0.3s ease-out forwards' }}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="replication-modal-title"
        >
            <div
                ref={modalRef}
                className="bg-card w-full max-w-lg m-4 rounded-xl shadow-2xl border border-border/50 relative flex flex-col max-h-[90vh]"
                style={{ animation: 'fadeInUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards' }}
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors z-10" aria-label="Close modal">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                <div className="p-6 md:p-8 overflow-y-auto">
                    {isSubmitted ? (
                         <div className="text-center py-8">
                            <div className="mx-auto bg-primary-light text-primary w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                            </div>
                            <h2 id="replication-modal-title" className="text-2xl font-bold text-foreground mb-4">Request Sent!</h2>
                            <p className="text-muted max-w-md mx-auto">Thank you for your interest in the '{item.title}' design. We will contact you shortly to discuss the next steps.</p>
                            <div className="mt-8">
                                <CTAButton onClick={onClose} variant="secondary">Close</CTAButton>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-6">
                                <h2 id="replication-modal-title" className="text-2xl font-extrabold text-foreground">Request This Design</h2>
                                <p className="text-muted mt-2">Enter your details below to get started.</p>
                            </div>
                            <form onSubmit={handleSubmit} noValidate className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="projectName" className="block text-muted mb-2 font-medium text-sm">Project Name</label>
                                        <input type="text" id="projectName" name="projectName" value={item.title} disabled className={disabledInputClasses} />
                                    </div>
                                    <div>
                                        <label htmlFor="priceRange" className="block text-muted mb-2 font-medium text-sm">Estimated Price</label>
                                        <input type="text" id="priceRange" name="priceRange" value={item.priceRange} disabled className={disabledInputClasses} />
                                    </div>
                                </div>
                                <hr className="border-border !my-6" />
                                <div>
                                    <label htmlFor="name" className="block text-muted mb-2 font-medium">Full Name</label>
                                    <input type="text" id="name" name="name" required onChange={handleChange} value={formState.name} className={`${inputClasses} ${errors.name ? 'border-red-500 focus:ring-red-500/50' : ''}`} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
                                    {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-muted mb-2 font-medium">Email Address</label>
                                    <input type="email" id="email" name="email" required onChange={handleChange} value={formState.email} className={`${inputClasses} ${errors.email ? 'border-red-500 focus:ring-red-500/50' : ''}`} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
                                    {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label htmlFor="mobile" className="block text-muted mb-2 font-medium">Mobile Number</label>
                                    <input type="tel" id="mobile" name="mobile" required onChange={handleChange} value={formState.mobile} className={`${inputClasses} ${errors.mobile ? 'border-red-500 focus:ring-red-500/50' : ''}`} aria-invalid={!!errors.mobile} aria-describedby={errors.mobile ? "mobile-error" : undefined}/>
                                    {errors.mobile && <p id="mobile-error" className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                                </div>
                                <div>
                                    <label htmlFor="notes" className="block text-muted mb-2 font-medium">Additional Notes (Optional)</label>
                                    <textarea id="notes" name="notes" rows={3} onChange={handleChange} value={formState.notes} className={inputClasses}></textarea>
                                </div>
                                <div className="text-right pt-4">
                                    <CTAButton type="submit">Submit Request</CTAButton>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReplicationModal;