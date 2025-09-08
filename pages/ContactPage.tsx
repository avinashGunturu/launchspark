
import React, { useState } from 'react';
import CTAButton from '../components/CTAButton';
import FaqAccordion from '../components/FaqAccordion';
import { useNotifications } from '../components/NotificationContext.tsx';
import { submitContactForm } from '../utilities/api';

const ContactInfoItem: React.FC<{ icon: JSX.Element; title: string; children: React.ReactNode; href?: string }> = ({ icon, title, children, href }) => {
    const content = (
        <div className="flex items-center space-x-4 p-4 rounded-lg transition-colors hover:bg-muted-light">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-bold text-foreground">{title}</h3>
                <p className="text-muted">{children}</p>
            </div>
        </div>
    );

    return href ? <a href={href} className="group">{content}</a> : <div className="group">{content}</div>;
};

const faqData = [
    {
        question: "What's the starting price for a website?",
        answer: "Our professional single-page 'Spark' websites start at just $79. This is a perfect, budget-friendly option for new businesses to establish a high-quality online presence. For more complex needs, we offer detailed quotes after a brief consultation."
    },
    {
        question: "How long does it take to build a website?",
        answer: "It depends on the scope. For our single-page 'Spark' sites, we can go live in as little as 5 business days once we have all your content. Larger multi-page websites typically take 2-4 weeks. The final timeline is always dependent on project complexity and your feedback speed."
    },
    {
        question: "What is your development process like?",
        answer: "We follow a simple three-step process: 1) Discovery & Strategy, where we understand your goals. 2) Design & Development, where we bring your vision to life. 3) Review & Launch, where we refine the site based on your feedback and go live. It's collaborative and transparent from start to finish."
    },
    {
        question: "Do you provide support after the website is launched?",
        answer: "Absolutely! We offer optional monthly maintenance and support plans to keep your site secure, updated, and running smoothly. We believe in being your long-term digital partner, not just a one-time service."
    }
];

const initialFormState = { name: '', email: '', mobile: '', service: 'launchpad', inquiry: '' };
type FormState = typeof initialFormState;

const ContactPage: React.FC = () => {
    const { showSuccess, showError } = useNotifications();
    const [formState, setFormState] = useState<FormState>(initialFormState);
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
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
        if (!formState.inquiry.trim() || formState.inquiry.length < 10) {
            newErrors.inquiry = 'Please provide a brief message (at least 10 characters).';
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
                serviceOfInterest: formState.service,
                projectDescription: formState.inquiry,
            };
            const response = await submitContactForm(payload);

            if (response.code === 0) {
                setIsSubmitted(true);
                showSuccess(response.message || 'Your message has been sent successfully!');
            } else {
                showError(response.message || 'An unknown error occurred.');
            }
        } catch (error) {
            showError('A network error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const inputClasses = "w-full bg-card border border-border rounded-lg py-3 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition duration-300 shadow-sm";
    const selectClasses = `${inputClasses} appearance-none pr-12`;

    return (
        <div className="main-page-fade pt-28 pb-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4">Ready to Start Your Project?</h1>
                    <p className="text-xl text-muted max-w-3xl mx-auto">Let's build your digital masterpiece together.</p>
                </div>

                <div className="grid md:grid-cols-5 gap-12 max-w-6xl mx-auto">
                    <div className="md:col-span-3 bg-card p-8 rounded-xl shadow-xl border border-border">
                        {isSubmitted ? (
                            <div className="bg-primary/10 border border-primary text-foreground p-8 rounded-lg text-center h-full flex flex-col justify-center">
                                <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
                                <p>Your message has been sent. We will be in touch within 24 hours to discuss your project.</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col items-center md:items-start text-center md:text-left mb-8">
                                    <div className="bg-primary-light text-primary rounded-lg w-14 h-14 flex items-center justify-center mb-5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.455.09-.934.09-1.423A2.98 2.98 0 017.5 15.25a2.98 2.98 0 012.25-2.98c.976 0 1.94-.393 2.597-1.106A5.98 5.98 0 0015.75 6c.126 0 .253.009.379.026A5.98 5.98 0 0021 12z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-3xl font-bold text-foreground">Let's Start a Conversation</h2>
                                    <p className="text-muted mt-2 max-w-lg">
                                        Have a project in mind? Whether it's a simple idea or a complex challenge, we're here to listen. Tell us what you're thinking, and let's explore how we can bring it to life together.
                                    </p>
                                </div>
                                <form onSubmit={handleSubmit} noValidate className="space-y-6">
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
                                        <label htmlFor="service" className="block text-muted mb-2 font-medium">Service of Interest</label>
                                        <div className="relative">
                                            <select id="service" name="service" onChange={handleChange} value={formState.service} className={selectClasses}>
                                                <option value="launchpad">LaunchPad Package</option>
                                                <option value="growth">Growth Package</option>
                                                <option value="scale">Scale Package</option>
                                                <option value="other">Other Inquiry</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted">
                                                <svg className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="inquiry" className="block text-muted mb-2 font-medium">Tell us about your project</label>
                                        <textarea id="inquiry" name="inquiry" rows={5} required onChange={handleChange} value={formState.inquiry} className={`${inputClasses} ${errors.inquiry ? 'border-red-500 focus:ring-red-500/50' : ''}`} aria-invalid={!!errors.inquiry} aria-describedby={errors.inquiry ? "inquiry-error" : undefined}></textarea>
                                        {errors.inquiry && <p id="inquiry-error" className="text-red-500 text-sm mt-1">{errors.inquiry}</p>}
                                    </div>
                                    <div className="text-right pt-2">
                                        <CTAButton type="submit" disabled={isLoading}>{isLoading ? 'Sending...' : 'Send Your Message'}</CTAButton>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <ContactInfoItem 
                            href="mailto:launchsaprk.in@gmail.com"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>}
                            title="Email Us"
                        >
                            launchsaprk.in@gmail.com
                        </ContactInfoItem>
                         <ContactInfoItem 
                            href="tel:+1234567890"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>}
                            title="Call Us"
                        >
                            +1 (234) 567-890
                        </ContactInfoItem>
                        <div className="w-full h-48 bg-muted-light rounded-lg flex items-center justify-center text-muted border border-border">
                            [Map Embed Placeholder]
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <section className="py-28">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">Have Questions?</h2>
                            <p className="text-muted mt-4 max-w-2xl mx-auto text-lg">Find quick answers to common questions below.</p>
                        </div>
                        <div className="max-w-3xl mx-auto space-y-4">
                            {faqData.map((faq, index) => (
                                <FaqAccordion key={index} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ContactPage;