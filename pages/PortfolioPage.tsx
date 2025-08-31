
import React, { useState, useMemo } from 'react';
import type { PortfolioItem } from '../types';
import CTAButton from '../components/CTAButton';
import PortfolioDetailModal from '../components/PortfolioDetailModal';
import ReplicationModal from '../components/ReplicationModal';

interface PortfolioPageProps {
    openModal: () => void;
}

const allProjects: PortfolioItem[] = [
    { id: 1, title: 'Elysian Wellness Spa', sector: 'Health & Wellness', category: 'wellness', imageUrl: 'https://picsum.photos/600/800?random=10', description: 'A serene and calming website designed for a luxury spa, focusing on user-friendly booking and a tranquil visual experience.', priceRange: '$1200 - $1800', liveUrl: 'https://example.com' },
    { id: 2, title: 'Apex Legal Advisors', sector: 'Professional Services', category: 'corporate', imageUrl: 'https://picsum.photos/600/400?random=11', description: 'A sharp, professional, and trustworthy website for a legal firm, designed to instill confidence and provide clear information to potential clients.', priceRange: '$900 - $1500', liveUrl: 'https://example.com' },
    { id: 3, title: 'The Gilded Spoon', sector: 'Hospitality', category: 'hospitality', imageUrl: 'https://picsum.photos/600/600?random=12', description: 'An elegant and appetizing website for a fine-dining restaurant, featuring online reservations, menu showcases, and a rich gallery.', priceRange: '$1000 - $1600', liveUrl: 'https://example.com' },
    { id: 4, title: 'Innovate Architecture', sector: 'Real Estate', category: 'corporate', imageUrl: 'https://picsum.photos/600/400?random=13', description: 'A modern, visually-driven portfolio site for an architecture firm, highlighting their projects with high-resolution imagery and clean layouts.', priceRange: '$1500 - $2500', liveUrl: 'https://example.com' },
    { id: 5, title: 'Serene Landscapes', sector: 'Local Services', category: 'wellness', imageUrl: 'https://picsum.photos/600/800?random=14', description: 'A vibrant and inviting website for a landscaping company, designed to showcase their work and generate local leads through a prominent contact form.', priceRange: '$800 - $1300', liveUrl: 'https://example.com' },
    { id: 6, title: 'Artisan Roast Collective', sector: 'E-Commerce', category: 'hospitality', imageUrl: 'https://picsum.photos/600/600?random=15', description: 'A stylish and functional e-commerce platform for a specialty coffee roaster, with a seamless checkout process and subscription options.', priceRange: '$2000+', liveUrl: 'https://example.com' },
];

const filters = [
    { name: 'All', value: 'all' },
    { name: 'Corporate', value: 'corporate' },
    { name: 'Wellness', value: 'wellness' },
    { name: 'Hospitality', value: 'hospitality' },
];

const PortfolioCard: React.FC<{ item: PortfolioItem; onSelect: () => void; }> = ({ item, onSelect }) => (
    <button
        onClick={onSelect}
        className="group relative block w-full overflow-hidden rounded-xl shadow-lg cursor-pointer text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 aspect-[4/3] transition-transform duration-300 hover:-translate-y-2"
        aria-label={`View details for ${item.title}`}
    >
        <img src={item.imageUrl} alt={`Thumbnail for the ${item.title} project.`} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6">
             <h3 className="text-2xl font-bold text-white transition-transform duration-300 transform translate-y-2 group-hover:translate-y-0">{item.title}</h3>
             <p className="text-primary transition-transform duration-300 delay-75 transform translate-y-2 group-hover:translate-y-0">{item.sector}</p>
        </div>
    </button>
);


const PortfolioPage: React.FC<PortfolioPageProps> = ({ openModal }) => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
    const [replicationProject, setReplicationProject] = useState<PortfolioItem | null>(null);

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'all') return allProjects;
        return allProjects.filter(p => p.category === activeFilter);
    }, [activeFilter]);

    const handleReplicate = (item: PortfolioItem) => {
        setSelectedProject(null); // Close detail modal first
        setReplicationProject(item); // Then open replication modal
    };

    return (
        <>
            <div className="main-page-fade pt-28 pb-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4">See Our Work in Action</h1>
                        <p className="text-xl text-muted max-w-3xl mx-auto">Crafting success stories for businesses like yours.</p>
                    </div>
                    
                    <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
                        {filters.map(filter => (
                            <button
                                key={filter.value}
                                onClick={() => setActiveFilter(filter.value)}
                                className={`px-5 py-2 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ease-in-out transform ${
                                    activeFilter === filter.value 
                                    ? 'bg-primary text-white shadow-md scale-105' 
                                    : 'bg-card text-muted hover:bg-muted-light hover:text-foreground border border-border hover:scale-105'
                                }`}
                            >
                                {filter.name}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map(item => (
                            <PortfolioCard key={item.id} item={item} onSelect={() => setSelectedProject(item)} />
                        ))}
                    </div>

                    <div className="mt-24">
                        <div className="bg-gradient-to-r from-primary to-[#00B88A] text-white rounded-xl p-12 text-center shadow-glow-primary">
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">See a Project That Inspires You?</h2>
                            <p className="text-xl max-w-2xl mx-auto mb-8">
                               Let's adapt a style you love or create something entirely new for your brand. Your vision is our next masterpiece.
                            </p>
                            <CTAButton onClick={openModal} variant="secondary">Discuss Your Inspired Idea</CTAButton>
                        </div>
                    </div>
                </div>
            </div>
            {selectedProject && <PortfolioDetailModal item={selectedProject} onClose={() => setSelectedProject(null)} onReplicate={handleReplicate} />}
            {replicationProject && <ReplicationModal item={replicationProject} onClose={() => setReplicationProject(null)} />}
        </>
    );
};

export default PortfolioPage;