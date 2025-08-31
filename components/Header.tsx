import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import CTAButton from './CTAButton';
import ThemeToggleButton from './ThemeToggleButton';
import Logo from './Logo';

interface HeaderProps {
  openModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ openModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/about', text: 'About' },
    { to: '/services', text: 'Services' },
    { to: '/portfolio', text: 'Work' },
    { to: '/testimonials', text: 'Reviews' },
    { to: '/contact', text: 'Contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-foreground hover:text-primary transition-colors duration-300" 
          aria-label="LaunchSpark Home"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Logo />
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition-colors duration-300 hover:text-primary ${
                  isActive ? 'text-primary font-semibold' : 'text-foreground font-medium'
                }`
              }
            >
              {link.text}
            </NavLink>
          ))}
        </div>
        <div className="hidden md:flex items-center space-x-2">
           <ThemeToggleButton />
           <CTAButton onClick={openModal} className="animate-pulse-glow">Get a Free Quote</CTAButton>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-foreground focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md py-4 border-t border-border">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block text-center py-2 transition-colors duration-300 hover:text-primary ${
                  isActive ? 'text-primary font-semibold' : 'text-foreground'
                }`
              }
            >
              {link.text}
            </NavLink>
          ))}
          <div className="mt-4 flex items-center justify-center space-x-4">
             <CTAButton onClick={openModal} className="animate-pulse-glow">Get a Free Quote</CTAButton>
             <ThemeToggleButton />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;