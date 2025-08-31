
import React, { useState, useEffect, useRef } from 'react';

const MetricItem: React.FC<{ value: number; label: string; suffix?: string; duration?: number }> = ({ value, label, suffix = '', duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    let start = 0;
                    const end = value;
                    if (start === end) return;

                    let startTime: number | null = null;
                    const step = (timestamp: number) => {
                        if (!startTime) startTime = timestamp;
                        const progress = Math.min((timestamp - startTime) / duration, 1);
                        setCount(Math.floor(progress * end));
                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        }
                    };
                    window.requestAnimationFrame(step);
                    observer.unobserve(ref.current!);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [value, duration]);

    return (
        <div ref={ref} className="text-center">
            <p className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tighter">
                {count}{suffix}
            </p>
            <p className="text-sm text-muted uppercase tracking-widest mt-1">{label}</p>
        </div>
    );
};

interface HeroMetricsProps {
  delay?: number;
}

const HeroMetrics: React.FC<HeroMetricsProps> = ({ delay = 1000 }) => {
    return (
        <div className="relative z-10 mt-16 animate-reveal-word" style={{ animationDelay: `${delay}ms`, opacity: 0 }}>
             <div className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg">
                <div className="grid grid-cols-3 divide-x divide-border/50">
                    <MetricItem value={50} suffix="+" label="Projects Launched" />
                    <MetricItem value={98} suffix="%" label="Client Satisfaction" />
                    <MetricItem value={1} suffix=" Wk" label="Avg. Launch Time" />
                </div>
            </div>
        </div>
    );
};

export default HeroMetrics;