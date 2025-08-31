
import React, { useRef, useEffect } from 'react';
import CTAButton from '../components/CTAButton';
import HeroMetrics from '../components/HeroMetrics';
import FaqAccordion from '../components/FaqAccordion';

interface HomePageProps {
    openModal: () => void;
}

const BenefitCard: React.FC<{ icon: JSX.Element; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="group bg-card p-8 rounded-xl border border-border hover:border-primary/50 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer">
        <div className="bg-primary-light text-primary rounded-lg w-12 h-12 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-muted leading-relaxed">{children}</p>
    </div>
);

const ProcessStep: React.FC<{ num: string; title: string; children: React.ReactNode }> = ({ num, title, children }) => (
  <div className="relative pl-12">
      <div className="absolute left-0 top-1 flex items-center justify-center w-8 h-8 rounded-full bg-primary-light text-primary font-bold ring-8 ring-background">{num}</div>
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted">{children}</p>
  </div>
);

const AnimatedProcessStep: React.FC<{ num: string; title: string; children: React.ReactNode; delay?: number }> = ({ num, title, children, delay = 0 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = React.useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <ProcessStep num={num} title={title}>
                {children}
            </ProcessStep>
        </div>
    );
};

const ApproachCard: React.FC<{ icon: JSX.Element; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-card p-8 rounded-xl border border-border text-center transform hover:-translate-y-2 transition-transform duration-300 shadow-md hover:shadow-lg">
        <div className="mx-auto bg-primary-light text-primary rounded-lg w-14 h-14 flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-muted leading-relaxed">{children}</p>
    </div>
);

const FeaturedWorkCard: React.FC<{ title: string; sector: string; imageUrl: string }> = ({ title, sector, imageUrl }) => (
    <div className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer">
        <img src={imageUrl} alt={`A preview of the ${title} website project.`} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <p className="text-primary">{sector}</p>
        </div>
    </div>
);

const DifferentiatorItem: React.FC<{ icon: JSX.Element; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
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

const GuaranteeItem: React.FC<{ icon: JSX.Element; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-card p-8 rounded-xl border border-border text-center transform hover:-translate-y-2 transition-transform duration-300 shadow-md hover:shadow-lg">
        <div className="mx-auto bg-primary-light text-primary rounded-lg w-14 h-14 flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-muted leading-relaxed">{children}</p>
    </div>
);

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


const HomePage: React.FC<HomePageProps> = ({ openModal }) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const heroContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (gridRef.current) {
                gridRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
            }
        };

        const handleMouseMove = (event: MouseEvent) => {
            if (heroContentRef.current) {
                const { clientX, clientY } = event;
                const { innerWidth, innerHeight } = window;
                const moveX = (clientX - innerWidth / 2) / (innerWidth / 2) * -15;
                const moveY = (clientY - innerHeight / 2) / (innerHeight / 2) * -15;
                heroContentRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const headlineLine1 = "Expertly Crafted Websites.".split(" ");
    const headlineLine2 = "Launched at Startup Speed.".split(" ");

    return (
        <div className="main-page-fade">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute bottom-0 left-[-20%] right-[-20%] top-[20%] animate-aurora">
                            <div style={{
                                backgroundImage: `radial-gradient(ellipse at 50% -50%, hsla(165, 100%, 50%, 0.3) 0px, transparent 50%),
                                                radial-gradient(ellipse at 50% 150%, hsla(165, 100%, 50%, 0.3) 0px, transparent 50%)`,
                                height: "200%",
                                width: "200%",
                                position: "absolute",
                                top: "-50%",
                                left: "-50%",
                            }}></div>
                        </div>
                    </div>
                    <div 
                        ref={gridRef}
                        className="absolute inset-0 bg-grid-pattern opacity-30 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)]">
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent"></div>
                </div>
                
                <div ref={heroContentRef} className="container relative z-10 mx-auto px-6 transition-transform duration-300 ease-out">
                    <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0ms', opacity: 0 }}>
                        <div className="inline-block bg-primary-light border border-primary/30 rounded-full px-6 py-3">
                            <p className="font-semibold text-foreground text-lg">
                                <span className="text-primary mr-2">🚀</span>
                                Professional Website Plans Starting from Just <span className="font-extrabold text-primary">$79!</span>
                            </p>
                        </div>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-extrabold text-foreground mb-6 leading-tight tracking-tighter">
                        <span className="block">
                            {headlineLine1.map((word, index) => (
                                <span key={index} className="inline-block mr-3 md:mr-5 overflow-hidden pb-2">
                                    <span className="inline-block animate-reveal-word" style={{ animationDelay: `${200 + index * 100}ms`, opacity: 0 }}>
                                        {word}
                                    </span>
                                </span>
                            ))}
                        </span>
                        <span className="block">
                             {headlineLine2.map((word, index) => (
                                <span key={index} className="inline-block mr-3 md:mr-5 overflow-hidden pb-2">
                                    <span className="inline-block animate-reveal-word" style={{ animationDelay: `${200 + (headlineLine1.length + index) * 100}ms`, opacity: 0 }}>
                                        {word.includes("Startup") || word.includes("Speed.") ? (
                                            <span className="bg-gradient-to-r from-primary to-[#00B88A] text-transparent bg-clip-text">
                                                {word}
                                            </span>
                                        ) : (
                                            word
                                        )}
                                    </span>
                                </span>
                            ))}
                        </span>
                    </h1>
                    <div className="overflow-hidden">
                        <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto mb-10 animate-reveal-word" style={{ animationDelay: '1000ms', opacity: 0 }}>
                            Fast, professional, and future-proof websites for startups and new businesses. Let's build your success online.
                        </p>
                    </div>
                    <div className="animate-reveal-word" style={{ animationDelay: '1100ms', opacity: 0 }}>
                        <CTAButton onClick={openModal}>Launch Your Project</CTAButton>
                    </div>
                    <HeroMetrics delay={1200} />
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-28 bg-background">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">The LaunchSpark Advantage</h2>
                        <p className="text-muted mt-4 max-w-2xl mx-auto text-lg">We build websites that drive results, simply and effectively.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <BenefitCard
                            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>}
                            title="Clean & Modern Code"
                        >
                            Built on the latest technologies for a fast, secure, and future-proof website that performs flawlessly.
                        </BenefitCard>
                         <BenefitCard
                            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>}
                            title="Built for Speed"
                        >
                            We optimize every aspect of your site for lightning-fast load times, keeping your visitors engaged and happy.
                        </BenefitCard>
                         <BenefitCard
                            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>}
                            title="Fully Responsive"
                        >
                           Your site will look and work perfectly on all devices—desktops, tablets, and smartphones. Guaranteed.
                        </BenefitCard>
                        <BenefitCard
                            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691L15 12.001M9 12.001L15 12.001" /></svg>}
                            title="Simple to Manage"
                        >
                            Need to update content? We integrate an optional, user-friendly CMS so you can make changes easily.
                        </BenefitCard>
                    </div>
                </div>
            </section>
            
            {/* Process Section */}
            <section className="py-28">
                 <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                           <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">A Simple Path to a Stunning Website</h2>
                           <p className="text-muted text-lg">Our process is designed to be clear, collaborative, and centered around your goals. We handle the technical complexities so you can focus on your business.</p>
                           <div className="relative space-y-10 border-l-2 border-dashed border-border/70 ml-4 pt-4 pb-4">
                                <AnimatedProcessStep num="1" title="Discovery & Strategy">We start by understanding your business, audience, and goals to create a strategic plan.</AnimatedProcessStep>
                                <AnimatedProcessStep num="2" title="Design & Development" delay={150}>We craft a beautiful design and bring it to life with clean, efficient code.</AnimatedProcessStep>
                                <AnimatedProcessStep num="3" title="Review & Launch" delay={300}>You provide feedback, we refine, and then we launch your new website to the world.</AnimatedProcessStep>
                           </div>
                        </div>
                        <div className="rounded-xl overflow-hidden shadow-2xl [perspective:1000px]">
                            <img 
                                src="https://picsum.photos/800/1000?random=101" 
                                alt="Our process" 
                                className="w-full h-full object-cover transition-transform duration-500 ease-out hover:[transform:rotateY(-10deg)_scale(1.1)]" 
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Beyond the Code Section */}
            <section className="py-28 bg-muted-light/50">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center">
                         <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
                            Beyond the Code: Your Vision, Amplified
                        </h2>
                        <p className="text-muted text-xl leading-relaxed mb-10">
                            A website is more than just lines of code; it's the digital heartbeat of your brand. We're not just building a website, we're building the stage for your success story. We listen, we collaborate, and we translate your ambition into a digital experience that connects, engages, and inspires.
                        </p>
                        <CTAButton onClick={openModal}>Share Your Vision</CTAButton>
                    </div>
                </div>
            </section>

            {/* Our Approach Section */}
            <section className="py-28">
                <div className="container mx-auto px-6">
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
                </div>
            </section>
            
            {/* Fast-Track Section */}
            <section className="py-28">
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
            
            {/* Featured Work Section */}
            <section className="py-28 bg-background">
                 <div className="container mx-auto px-6">
                     <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">Success Stories We've Written</h2>
                        <p className="text-muted mt-4 max-w-2xl mx-auto text-lg">We're proud of the work we do and the results we deliver for our clients.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeaturedWorkCard title="Elysian Wellness" sector="Health & Wellness" imageUrl="https://picsum.photos/600/800?random=10" />
                        <FeaturedWorkCard title="Apex Legal Advisors" sector="Professional Services" imageUrl="https://picsum.photos/600/400?random=11" />
                        <FeaturedWorkCard title="The Gilded Spoon" sector="Hospitality" imageUrl="https://picsum.photos/600/600?random=12" />
                    </div>
                     <div className="text-center mt-12">
                        <CTAButton to="/portfolio" variant="primary">View More of Our Work</CTAButton>
                    </div>
                </div>
            </section>

             {/* Differentiators Section */}
            <section className="py-28">
                 <div className="container mx-auto px-6">
                     <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <img src="https://picsum.photos/800/800?random=102" alt="Why choose us" className="rounded-xl shadow-2xl" />
                        </div>
                        <div className="space-y-12">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">Why LaunchSpark is Different</h2>
                            <DifferentiatorItem
                                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                                title="Speed Without Compromise"
                            >
                                We've streamlined our process to launch your professional website in weeks, not months, without sacrificing quality.
                            </DifferentiatorItem>
                             <DifferentiatorItem
                                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 01-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                                title="Transparent, Flat-Rate Pricing"
                            >
                                No hidden fees or surprise costs. Our clear, upfront pricing lets you budget with confidence.
                            </DifferentiatorItem>
                             <DifferentiatorItem
                                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a7.5 7.5 0 01-7.5 0c-1.255 0-2.443.29-3.5.832" /></svg>}
                                title="Your Success Partner"
                            >
                                We're more than just developers; we're a dedicated partner invested in your long-term growth and success.
                            </DifferentiatorItem>
                        </div>
                     </div>
                </div>
            </section>
            
            {/* Guarantee Section */}
            <section className="py-28 bg-muted-light">
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

            {/* FAQ Section */}
            <section className="py-28">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">Frequently Asked Questions</h2>
                        <p className="text-muted mt-4 max-w-2xl mx-auto text-lg">Quick answers to common questions about our process, pricing, and services.</p>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqData.map((faq, index) => (
                            <FaqAccordion key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </div>
            </section>


             {/* Final CTA */}
            <section className="py-28">
                 <div className="container mx-auto px-6">
                    <div className="bg-gradient-to-r from-primary to-[#00B88A] text-white rounded-xl p-12 text-center shadow-glow-primary">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Ready to Launch Your Vision?</h2>
                        <p className="text-xl max-w-2xl mx-auto mb-8">
                           Let's build a website that not only looks great but also grows your business. Get your free, no-obligation quote today.
                        </p>
                        <CTAButton onClick={openModal} variant="secondary">Let's Get Started</CTAButton>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HomePage;