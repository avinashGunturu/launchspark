
import React, { useState, useEffect, useRef } from 'react';
import CTAButton from './CTAButton';
import { useNotifications } from './NotificationContext.tsx';
import { submitQuoteRequest } from '../utilities/api';

interface LeadModalProps {
    onClose: () => void;
}

const initialFormState = {
    name: '',
    email: '',
    mobile: '',
    pages: '',
    budget: '',
    details: '',
};

type FormState = typeof initialFormState;

const LeadModal: React.FC<LeadModalProps> = ({ onClose }) => {
    const { showSuccess, showError } = useNotifications();
    const [formState, setFormState] = useState<FormState>(initialFormState);
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        if (!formState.pages) newErrors.pages = 'Please select the number of pages.';
        if (!formState.budget) newErrors.budget = 'Please select your budget range.';
        if (!formState.details.trim() || formState.details.length < 10) {
            newErrors.details = 'Please provide at least a brief description (10 characters min).';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate() || isLoading) return;

        setIsLoading(true);

        try {
            const payload = {
                fullName: formState.name,
                email: formState.email,
                mobileNumber: formState.mobile,
                numberOfPages: formState.pages,
                budgetRange: formState.budget,
                projectDescription: formState.details,
            };

            const response = await submitQuoteRequest(payload);
            
            if (response.code === 0) {
                setIsSubmitted(true);
                showSuccess(response.message || 'Quote request sent!');
            } else {
                showError(response.message || 'Failed to send quote request.');
            }
        } catch (error) {
            showError('A network error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const inputClasses = "w-full bg-background border border-border rounded-lg py-3 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition duration-300 shadow-sm";
    const selectClasses = `${inputClasses} appearance-none pr-12`;

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
                className="bg-card w-full max-w-2xl m-4 rounded-xl shadow-2xl border border-border/50 relative flex flex-col max-h-[90vh]"
                style={{ animation: 'fadeInUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards' }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors z-10"
                    aria-label="Close modal"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                <div className="p-6 md:p-8 overflow-y-auto">
                    {isSubmitted ? (
                         <div className="text-center py-8 md:py-12">
                            <div className="mx-auto bg-primary-light text-primary w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                            </div>
                            <h2 id="modal-title" className="text-2xl md:text-3xl font-bold text-foreground mb-4">Submission Received!</h2>
                            <p className="text-muted max-w-md mx-auto">Thank you for your interest. We've received your details and will get back to you within one business day with your free quote.</p>
                            <div className="mt-8">
                                <CTAButton onClick={onClose} variant="secondary">Close</CTAButton>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-6">
                                <h2 id="modal-title" className="text-2xl md:text-3xl font-extrabold text-foreground">Get a Free, No-Obligation Quote</h2>
                                <p className="text-muted mt-2">Fill out the form below, and we'll get back to you within 24 hours.</p>
                            </div>
                            <form onSubmit={handleSubmit} noValidate className="space-y-4">
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                               </div>
                               <div>
                                    <label htmlFor="mobile" className="block text-muted mb-2 font-medium">Mobile Number</label>
                                    <input type="tel" id="mobile" name="mobile" required onChange={handleChange} value={formState.mobile} className={`${inputClasses} ${errors.mobile ? 'border-red-500 focus:ring-red-500/50' : ''}`} aria-invalid={!!errors.mobile} aria-describedby={errors.mobile ? "mobile-error" : undefined}/>
                                    {errors.mobile && <p id="mobile-error" className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="pages" className="block text-muted mb-2 font-medium">Number of Pages</label>
                                        <div className="relative">
                                            <select id="pages" name="pages" required onChange={handleChange} value={formState.pages} className={`${selectClasses} ${errors.pages ? 'border-red-500 focus:ring-red-500/50' : ''}`} aria-invalid={!!errors.pages} aria-describedby={errors.pages ? "pages-error" : undefined}>
                                                <option value="" disabled>Select an option</option>
                                                <option value="1-3">1-3 Pages</option>
                                                <option value="4-6">4-6 Pages</option>
                                                <option value="7+">7+ Pages</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted">
                                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                        {errors.pages && <p id="pages-error" className="text-red-500 text-sm mt-1">{errors.pages}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="budget" className="block text-muted mb-2 font-medium">Your Budget</label>
                                        <div className="relative">
                                            <select id="budget" name="budget" required onChange={handleChange} value={formState.budget} className={`${selectClasses} ${errors.budget ? 'border-red-500 focus:ring-red-500/50' : ''}`} aria-invalid={!!errors.budget} aria-describedby={errors.budget ? "budget-error" : undefined}>
                                                <option value="" disabled>Select a range</option>
                                                <option value="<500">Under $500</option>
                                                <option value="500-1000">$500 - $1000</option>
                                                <option value="1000-2000">$1000 - $2000</option>
                                                <option value="2000+">$2000+</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted">
                                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                        {errors.budget && <p id="budget-error" className="text-red-500 text-sm mt-1">{errors.budget}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="details" className="block text-muted mb-2 font-medium">Tell us about your project</label>
                                    <textarea id="details" name="details" rows={4} required onChange={handleChange} value={formState.details} className={`${inputClasses} ${errors.details ? 'border-red-500 focus:ring-red-500/50' : ''}`} aria-invalid={!!errors.details} aria-describedby={errors.details ? "details-error" : undefined}></textarea>
                                    {errors.details && <p id="details-error" className="text-red-500 text-sm mt-1">{errors.details}</p>}
                                </div>
                                <div className="text-right pt-4">
                                    <CTAButton type="submit" disabled={isLoading}>{isLoading ? 'Submitting...' : 'Get My Free Quote'}</CTAButton>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeadModal;