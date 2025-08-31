
import React from 'react';
import CTAButton from '../components/CTAButton';

interface AboutPageProps {
    openModal: () => void;
}

const TimelineItem: React.FC<{ year: string; title: string; children: React.ReactNode }> = ({ year, title, children }) => (
    <div className="relative pl-8 sm:pl-12 py-4 group">
        <div className="absolute left-[2px] h-full w-px bg-border group-hover:bg-primary/50 transition-colors"></div>
        <div className="absolute left-[-5px] top-1/2 -mt-1.5 h-3 w-3 rounded-full bg-border border-2 border-background group-hover:bg-primary transition-all duration-300 group-hover:scale-125"></div>
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">{year}</p>
        <h3 className="text-xl font-bold text-foreground mt-1">{title}</h3>
        <p className="text-muted mt-2">{children}</p>
    </div>
);

const ApproachCard: React.FC<{ icon: JSX.Element; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-card p-8 rounded-xl border border-border text-center transform hover:-translate-y-2 transition-transform duration-300 shadow-md hover:shadow-lg">
        <div className="mx-auto bg-primary-light text-primary rounded-lg w-14 h-14 flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-muted leading-relaxed">{children}</p>
    </div>
);

const PhilosophyItem: React.FC<{ icon: JSX.Element; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 bg-primary-light text-primary rounded-lg w-12 h-12 flex items-center justify-center">
            {icon}
        </div>
        <div>
            <h3 className="text-lg font-bold text-foreground">{title}</h3>
            <p className="text-muted mt-1">{children}</p>
        </div>
    </div>
);


const AboutPage: React.FC<AboutPageProps> = ({ openModal }) => {
    return (
        <div className="main-page-fade pt-32 pb-24">
            <div className="container mx-auto px-6">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4">Your Partner in Digital Growth</h1>
                    <p className="text-xl text-muted max-w-3xl mx-auto">We're a team dedicated to making the web simple and accessible for businesses at every stage.</p>
                </div>
                
                <div className="my-20 flex justify-center">
                    <img src="https://picsum.photos/1200/800?random=103" alt="A modern and clean office space representing LaunchSpark's workspace." className="rounded-xl shadow-xl w-full max-w-5xl object-cover h-96"/>
                </div>

                 <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="bg-card p-8 rounded-xl border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:-translate-y-2 text-left">
                        <div className="text-primary mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 15.91a4.5 4.5 0 01-6.364 0 4.5 4.5 0 010-6.364 4.5 4.5 0 016.364 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-3">Our Mission</h3>
                        <p className="text-muted leading-relaxed">
                           To launch ambitious brands into the digital world with websites that are not just beautiful, but are powerful engines for growth, eliminating technical barriers for every new venture.
                        </p>
                    </div>
                    
                    <div className="bg-card p-8 rounded-xl border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:-translate-y-2 text-left">
                        <div className="text-primary mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.62-3.75M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-3">Values That Drive Results</h3>
                        <p className="text-muted leading-relaxed">
                            No hidden fees, no confusing jargon. We believe in transparent partnership and are committed to delivering a product that exceeds your expectations.
                        </p>
                    </div>

                     <div className="bg-card p-8 rounded-xl border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:-translate-y-2 text-left">
                        <div className="text-primary mb-5">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-3">Our Expertise</h3>
                        <p className="text-muted leading-relaxed">
                           We build lightning-fast, intuitive websites that capture attention and are meticulously engineered to turn your visitors into loyal customers.
                        </p>
                    </div>
                </div>


                {/* Our Approach Section */}
                <section className="py-28">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">Solutions for Every Ambition</h2>
                        <p className="text-muted mt-4 max-w-2xl mx-auto text-lg">Whether you're just starting out or ready to scale, we have a solution that fits your budget and your goals.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <ApproachCard 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.362z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.362zM15.362 5.214A8.252 8.252 0 0012 3a8.25 8.25 0 00-3.362 2.214m6.724 0a8.287 8.287 0 010 4.772" /></svg>}
                            title="The Spark: Your First Step"
                        >
                            Have an idea? Let's get it online. We create stunning, single-page websites starting from just <span className="font-bold text-foreground">$79</span>, perfect for making a professional first impression.
                        </ApproachCard>
                        <ApproachCard
                             icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25a2.25 2.25 0 002.25-2.25v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25v2.25A2.25 2.25 0 006 20.25z" /></svg>}
                             title="The Growth Engine: For Business"
                        >
                           As you evolve, your site should too. Our packages provide the multi-page functionality, CMS integration, and SEO foundation you need to attract customers.
                        </ApproachCard>
                        <ApproachCard
                            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg>}
                            title="The Custom Build: Advanced Projects"
                        >
                            For unique needs, we offer advanced solutions. From e-commerce platforms to complex integrations, we build robust websites that drive significant results.
                        </ApproachCard>
                    </div>
                </section>

                {/* Core Philosophy Section */}
                <section className="pb-20">
                    <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
                        <div className="space-y-12">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">The Principles That Guide Our Work</h2>
                             <PhilosophyItem
                                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>}
                                title="Performance is Paramount"
                            >
                                A slow website is a lost customer. We obsess over load times and optimization to ensure your site is lightning-fast, keeping visitors engaged.
                            </PhilosophyItem>
                             <PhilosophyItem
                                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>}
                                title="Design with Purpose"
                            >
                                Beauty meets function in everything we create. Our designs are clean, intuitive, and focused on guiding your visitors towards meaningful action.
                            </PhilosophyItem>
                             <PhilosophyItem
                                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>}
                                title="Built to Last"
                            >
                                We use modern, scalable technologies to build a future-proof foundation for your online presence, ensuring it can grow and adapt with your business.
                            </PhilosophyItem>
                        </div>
                         <div>
                            <img src="https://picsum.photos/800/1000?random=104" alt="A designer sketching a website layout, representing thoughtful planning." className="rounded-xl shadow-2xl" />
                        </div>
                    </div>
                </section>

                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Journey</h2>
                    <div className="relative">
                        <TimelineItem year="2021" title="LaunchSpark Begins">Founded with a clear mission: make professional websites accessible to all new businesses.</TimelineItem>
                        <TimelineItem year="2022" title="50+ Businesses Launched">Helped over fifty entrepreneurs take their first successful step online.</TimelineItem>
                        <TimelineItem year="2024" title="Growth Packages Introduced">Expanded our services to help our clients scale their websites as their businesses grow.</TimelineItem>
                    </div>
                </div>

                <div className="text-center mt-20">
                    <CTAButton onClick={openModal}>Let's Build Your Website Together</CTAButton>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;