
import React from 'react';
import type { ServicePackage } from '../types';
import CTAButton from '../components/CTAButton';
import FaqAccordion from '../components/FaqAccordion';

interface ServicesPageProps {
    openModal: () => void;
}

const servicePackages: ServicePackage[] = [
    {
        name: 'The Spark',
        price: 'Starts at $79',
        description: 'Perfect for validating a new idea with a professional, single-page website that makes a strong first impression.',
        features: ['Single Page Website', 'Mobile-First Design', 'Contact Form Integration', 'Basic SEO Setup'],
        idealFor: 'New ventures & MVPs',
    },
    {
        name: 'LaunchPad',
        price: '$499',
        description: 'Establish your online presence with a foundational multi-page website designed to inform and convert visitors.',
        features: ['Up to 3 Pages', 'All Spark features', 'Social Media Links', 'Image Gallery'],
        idealFor: 'Small businesses & professionals',
    },
    {
        name: 'Growth',
        price: '$799',
        description: 'Scale your business with a content-driven website that attracts and engages your target audience.',
        features: ['Up to 5 Pages', 'All LaunchPad features', 'CMS for Blog/Updates', 'Advanced On-Page SEO'],
        idealFor: 'Growing businesses & service providers',
    },
    {
        name: 'Scale',
        price: '$1299+',
        description: 'A comprehensive solution for market leaders, featuring custom functionality and e-commerce capabilities.',
        features: ['7+ Pages', 'All Growth features', 'E-commerce Functionality', 'Priority Strategy & Support'],
        idealFor: 'Established brands & online stores',
    },
];

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

const ServiceCard: React.FC<{ pkg: ServicePackage; isFeatured?: boolean; openModal: () => void; }> = ({ pkg, isFeatured, openModal }) => (
    <div className={`group relative bg-card ${isFeatured ? 'shadow-glow-primary border-primary' : 'shadow-lg hover:shadow-xl border-border hover:border-primary/50'} p-8 rounded-xl transform hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 h-full flex flex-col border`}>
        {isFeatured && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Most Popular</div>}
        <div className="flex flex-col flex-grow">
            <h3 className="text-2xl font-bold text-primary">{pkg.name}</h3>
            <p className="text-muted mt-1 text-sm font-medium">{pkg.idealFor}</p>
            <p className="text-muted my-6 flex-grow">{pkg.description}</p>
            <ul className="space-y-3 text-foreground mb-8">
                {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        {feature}
                    </li>
                ))}
            </ul>
            <div className="mt-auto">
              <CTAButton onClick={openModal} variant={isFeatured ? 'primary' : 'secondary'} className="w-full text-center">
                  Get a Quote
              </CTAButton>
            </div>
        </div>
    </div>
);

const AddonCard: React.FC<{ icon: JSX.Element; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-card p-6 rounded-xl border border-border transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-2 transform">
        <div className="flex items-center justify-center bg-primary-light text-primary rounded-lg w-14 h-14 mb-5 mx-auto">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-foreground text-center mb-2">{title}</h3>
        <p className="text-muted text-sm text-center leading-relaxed">{children}</p>
    </div>
);


const ServicesPage: React.FC<ServicesPageProps> = ({ openModal }) => {
    return (
        <div className="main-page-fade pt-28 pb-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4">Find the Perfect Plan to Launch & Grow</h1>
                    <p className="text-xl text-muted max-w-3xl mx-auto mb-8">Transparent solutions designed for your business needs, from a simple launchpad to a full-scale digital storefront.</p>
                     <div className="inline-block bg-primary-light border border-primary/30 rounded-full px-6 py-3 animate-fade-in-up" style={{ animationDelay: '200ms', opacity: 0 }}>
                        <p className="font-semibold text-foreground text-lg">
                            <span className="text-primary mr-2">🚀</span>
                            Professional Website Plans Starting from Just <span className="font-extrabold text-primary">$79!</span>
                        </p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto items-stretch">
                    <ServiceCard pkg={servicePackages[0]} openModal={openModal} />
                    <ServiceCard pkg={servicePackages[1]} isFeatured={true} openModal={openModal} />
                    <ServiceCard pkg={servicePackages[2]} openModal={openModal} />
                    <ServiceCard pkg={servicePackages[3]} openModal={openModal} />
                </div>

                {/* Fast-Track Section */}
                <section className="mt-28">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
                            <div className="grid md:grid-cols-2 items-center gap-8">
                                <div className="p-8 md:p-12 order-2 md:order-1">
                                    <div className="inline-flex items-center bg-primary-light text-primary font-bold text-sm px-4 py-2 rounded-full mb-5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                        </svg>
                                        <span>Fast-Track Your Launch</span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                                        Inspired by Our Work? <span className="block bg-gradient-to-r from-primary to-[#00B88A] text-transparent bg-clip-text">Get it Faster & For Less.</span>
                                    </h2>
                                    <p className="text-muted text-lg mb-8 leading-relaxed">
                                        Love a design from our portfolio? We can customize it with your brand, content, and colors. This approach speeds up delivery significantly and, as a bonus, you'll receive a special discount!
                                    </p>
                                    <CTAButton to="/portfolio">Browse Designs & Save</CTAButton>
                                </div>
                                <div className="relative min-h-[300px] md:h-full order-1 md:order-2 group">
                                    <div className="absolute w-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform transition-all duration-500 ease-in-out group-hover:scale-105">
                                         <img src="https://picsum.photos/600/800?random=10" alt="Portfolio example 3" className="rounded-xl shadow-2xl border-4 border-card transform -rotate-6 group-hover:rotate-0" />
                                    </div>
                                    <div className="absolute w-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform transition-all duration-500 ease-in-out delay-100 group-hover:scale-105">
                                        <img src="https://picsum.photos/600/400?random=11" alt="Portfolio example 1" className="rounded-xl shadow-2xl border-4 border-card transform rotate-6 group-hover:rotate-0" />
                                    </div>
                                     <div className="absolute w-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform transition-all duration-500 ease-in-out delay-200 group-hover:scale-105">
                                         <img src="https://picsum.photos/600/600?random=12" alt="Portfolio example 2" className="rounded-xl shadow-2xl border-4 border-card transform rotate-2 group-hover:rotate-0" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="mt-28 bg-card shadow-xl p-10 rounded-xl border border-border max-w-5xl mx-auto text-center">
                     <h2 className="text-3xl font-bold text-foreground mb-4">Don't See a Perfect Fit? Let's Build a Custom Solution.</h2>
                     <p className="text-muted max-w-2xl mx-auto mb-8">
                        If your project requires e-commerce, advanced integrations, or unique functionality, we're here to build it. We specialize in creating tailor-made websites that solve complex business challenges.
                     </p>
                     <CTAButton onClick={openModal}>Discuss Your Project</CTAButton>
                </div>

                <div className="mt-28">
                    <h2 className="text-4xl font-extrabold text-foreground text-center mb-4">Enhance Your Website With Powerful Add-Ons</h2>
                     <p className="text-lg text-muted text-center max-w-2xl mx-auto mb-16">Supercharge your online presence with our powerful, optional add-ons.</p>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <AddonCard
                            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.455.09-.934.09-1.423A2.98 2.98 0 017.5 15.25a2.98 2.98 0 012.25-2.98c.976 0 1.94-.393 2.597-1.106A5.98 5.98 0 0015.75 6c.126 0 .253.009.379.026A5.98 5.98 0 0021 12z" /></svg>}
                            title="Live Chat Integration"
                        >
                            Engage customers on your site via WhatsApp, Messenger, and other platforms.
                        </AddonCard>
                        <AddonCard
                            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 1.5m1-1.5l1 1.5m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" /></svg>}
                            title="Advanced Analytics"
                        >
                            Gain deep visitor insights with Google Analytics & performance dashboards.
                        </AddonCard>
                        <AddonCard
                            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>}
                            title="Professional Copywriting"
                        >
                            Compelling, SEO-friendly content that tells your story and converts visitors.
                        </AddonCard>
                        <AddonCard
                            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.25 21.75l-.648-1.178a3.375 3.375 0 00-2.312-2.312L12 17.25l1.178-.648a3.375 3.375 0 002.312-2.312L16.25 13.5l.648 1.178a3.375 3.375 0 002.312 2.312L20.25 18l-1.178.648a3.375 3.375 0 00-2.312 2.312z" /></svg>}
                            title="Logo & Brand Kit Design"
                        >
                            Establish a memorable brand identity with a professional logo and visual guidelines.
                        </AddonCard>
                        <AddonCard
                            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.471-2.471a1.125 1.125 0 011.591 0L21 12.25M11.42 15.17l-4.217-4.217-2.471 2.471a1.125 1.125 0 000 1.591l3.957 3.957a1.125 1.125 0 001.591 0zM11.42 15.17L9.25 13.5m5.25 5.25l-2.471-2.471a1.125 1.125 0 010-1.591l3.957-3.957a1.125 1.125 0 011.591 0L21 12.25M9.25 13.5L5.033 9.283m0 0a3 3 0 10-4.243 4.243l4.242-4.242z" /></svg>}
                            title="Maintenance & Support"
                        >
                            Keep your site secure, updated, and running smoothly with monthly support plans.
                        </AddonCard>
                         <AddonCard
                            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>}
                            title="Email Marketing Setup"
                        >
                            Build your audience and manage relationships with integrated email & CRM tools.
                        </AddonCard>
                    </div>
                </div>

                <div className="mt-28">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">Frequently Asked Questions</h2>
                        <p className="text-muted mt-4 max-w-2xl mx-auto text-lg">Find quick answers to common questions below.</p>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqData.map((faq, index) => (
                            <FaqAccordion key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                    <div className="text-center mt-16">
                        <p className="text-lg text-muted max-w-xl mx-auto mb-8">Still have questions? We're happy to walk you through the options.</p>
                        <CTAButton onClick={openModal}>Let's Talk</CTAButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;