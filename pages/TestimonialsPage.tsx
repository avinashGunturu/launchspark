
import React from 'react';
import type { Testimonial } from '../types';
import CTAButton from '../components/CTAButton';

interface TestimonialsPageProps {
    openModal: () => void;
}

const testimonialsData: Testimonial[] = [
    {
        quote: "LaunchSpark transformed our online presence. Their attention to detail and commitment to our vision was unparalleled. We've seen a 200% increase in inquiries since launch.",
        author: 'Eleanor Vance',
        company: 'CEO, Elysian Wellness',
        imageUrl: 'https://picsum.photos/100/100?random=20'
    },
    {
        quote: "The process was seamless and professional from start to finish. Our new website is not only beautiful but incredibly fast. It perfectly represents our brand's quality.",
        author: 'Marcus Thorne',
        company: 'Founder, Apex Legal',
        imageUrl: 'https://picsum.photos/100/100?random=21'
    },
    {
        quote: "Working with them was a game-changer. They understood our needs as a small business and delivered a high-end site at an affordable price. Highly recommended!",
        author: 'Clara Dubois',
        company: 'Owner, The Gilded Spoon',
        imageUrl: 'https://picsum.photos/100/100?random=22'
    },
    {
        quote: "Their expertise is evident. The user experience is intuitive, and our clients constantly compliment the new site's clean design and ease of use.",
        author: 'Julian Croft',
        company: 'Principal, Innovate Arch.',
        imageUrl: 'https://picsum.photos/100/100?random=23'
    },
     {
        quote: "I was impressed by their speed and efficiency. We went from concept to a live, beautiful website in just under two weeks. The results speak for themselves.",
        author: 'Sofia Reyes',
        company: 'Founder, Artisan Roast Co.',
        imageUrl: 'https://picsum.photos/100/100?random=24'
    },
    {
        quote: "They are true partners in success. Not only did they build a fantastic website, but they also provided valuable insights to help our business grow online.",
        author: 'Leo Chen',
        company: 'Director, Serene Landscapes',
        imageUrl: 'https://picsum.photos/100/100?random=25'
    }
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div className="group relative bg-card p-8 rounded-xl border border-border shadow-lg transform transition-transform duration-300 hover:-translate-y-2 h-full flex flex-col">
        <div className="absolute top-0 left-0 -mt-4 -ml-2 text-primary/10 text-9xl font-serif select-none z-0">
            “
        </div>
        <div className="relative z-10 flex flex-col flex-grow">
            <p className="text-lg italic text-foreground leading-relaxed mb-6 flex-grow">
                {testimonial.quote}
            </p>
            <div className="flex items-center mt-auto">
                <img src={testimonial.imageUrl} alt={testimonial.author} className="w-14 h-14 rounded-full mr-4 border-2 border-primary/30"/>
                <div>
                    <p className="font-bold text-lg text-foreground">{testimonial.author}</p>
                    <p className="text-muted">{testimonial.company}</p>
                </div>
            </div>
        </div>
    </div>
);

const GuaranteeItem: React.FC<{ icon: JSX.Element; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-card p-8 rounded-xl border border-border text-center transform hover:-translate-y-2 transition-transform duration-300 shadow-md hover:shadow-lg">
        <div className="mx-auto bg-primary-light text-primary rounded-lg w-14 h-14 flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-muted leading-relaxed">{children}</p>
    </div>
);

const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ openModal }) => {
    return (
        <div className="main-page-fade pt-28 pb-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4">Trusted by Ambitious Brands, Just Like Yours.</h1>
                    <p className="text-xl text-muted max-w-3xl mx-auto">See how we've helped founders and business owners turn their vision into a high-performing reality.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {testimonialsData.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} />
                    ))}
                </div>

                {/* Guarantee Section */}
                <section className="py-28">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">Our Launch-Ready Guarantee</h2>
                            <p className="text-muted mt-4 max-w-2xl mx-auto text-lg">We stand behind our work with a rock-solid promise. Your success is our benchmark.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            <GuaranteeItem
                                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                                title="Satisfaction Promise"
                            >
                                We're not happy until you're thrilled. We offer unlimited revisions during the design phase to ensure the final product perfectly matches your vision.
                            </GuaranteeItem>
                            <GuaranteeItem
                                 icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a16.5 16.5 0 00-1.62-7.01l-2.11-4.22a1.5 1.5 0 00-2.86 0L5.84 9.99a16.503 16.503 0 00-1.62 7.01m5.84-2.56a16.5 16.5 0 01-5.84 2.56m11.68 0a16.5 16.5 0 01-5.84-2.56" /></svg>}
                                 title="Performance Promise"
                            >
                                Your website will be fast, responsive, and optimized for search engines from day one, providing a seamless experience for your visitors.
                            </GuaranteeItem>
                            <GuaranteeItem
                                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L12 15.25l5.571-3m-5.571 0l-5.571 3m11.142 0l-5.571 3" /></svg>}
                                title="Future-Ready Promise"
                            >
                                We build on a modern, scalable foundation, making it easy to update, manage, and expand your site as your business grows.
                            </GuaranteeItem>
                        </div>
                    </div>
                </section>

                {/* Beyond the Code Section */}
                <section className="pb-28">
                    <div className="container mx-auto px-6">
                        <div className="max-w-3xl mx-auto text-center">
                             <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
                                <span className="bg-gradient-to-r from-primary to-[#00B88A] text-transparent bg-clip-text">
                                    Beyond the Code: Your Vision, Amplified
                                </span>
                            </h2>
                            <p className="text-muted text-xl leading-relaxed">
                                A website is more than just lines of code; it's the digital heartbeat of your brand. We're not just building a website, we're building the stage for your success story. We listen, we collaborate, and we translate your ambition into a digital experience that connects, engages, and inspires.
                            </p>
                        </div>
                    </div>
                </section>


                <div className="text-center">
                    <CTAButton onClick={openModal}>Become Our Next Success Story</CTAButton>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsPage;