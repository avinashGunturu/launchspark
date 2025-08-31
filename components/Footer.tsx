import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors duration-300">
        {children}
    </a>
);


const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <Logo className="mb-4 justify-center md:justify-start" />
            <p className="text-muted text-sm">Your first step online, made simple. © {new Date().getFullYear()}.</p>
            <div className="flex justify-center md:justify-start space-x-4 mt-6">
                 <SocialIcon href="#">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                 </SocialIcon>
                 <SocialIcon href="#">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                 </SocialIcon>
                 <SocialIcon href="#">
                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.084-.338-.124-.76-.124-1.124 0-1.63.93-3.235 2.145-3.235.91 0 1.481.68 1.481 1.543 0 .914-.582 2.316-.88 3.632-.245 1.084.532 1.954 1.623 1.954 2.052 0 3.442-2.733 3.442-5.914 0-2.555-1.797-4.44-4.227-4.44-2.885 0-4.662 2.167-4.662 4.414 0 .895.334 1.848.742 2.454.084.128.096.183.071.294-.075.332-.245.99-.313 1.25-.09.356-.385.473-.687.33-.87-.42-1.41-1.63-1.41-2.83 0-2.322 1.67-5.22 5.5-5.22 2.91 0 5.034 2.11 5.034 4.88 0 2.99-1.84 5.3-4.444 5.3-.98 0-1.92-.52-2.24-1.124l-.693-2.825c-.26-1.077-.96-2.22-1.336-2.91C7.8 8.85 7.6 8.25 7.6 7.6c0-1.28.91-2.4 2.14-2.4.92 0 1.5.75 1.5 1.5v.04c0 .3-.02.6-.05.85-.1.85.58 1.53.58 1.53s.8-.82.9-1.08c.2-.5.3-1.15.3-1.78 0-1.42-.8-2.6-2-2.6-1.5 0-2.8.95-2.8 2.5 0 .9.3 1.6.7 2.1-.07.3-.2.9-.2 1.1s-.2 1-.2 1l.2.8c.2.8.5 1.5.5 1.5s-.3 1.2-.4 1.5c-.1.3-.2.6-.3 1 0 0-.2.8-.2 1.2 0 .4 0 1 .1 1.3l.1.3s-.2 1.1-.3 1.4c-.1.3-.3.6-.4.9l-.1.3s-.2 1.1-.3 1.4c-.1.3-.3.6-.4.9l-.1.3c-1.2 1-2.2 2.4-2.8 4C3.8 19.3 2 15.9 2 12z" clipRule="evenodd" /></svg>
                 </SocialIcon>
            </div>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-foreground font-bold mb-4">Navigate</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-muted hover:text-primary">About</Link></li>
                <li><Link to="/services" className="text-muted hover:text-primary">Services</Link></li>
                <li><Link to="/portfolio" className="text-muted hover:text-primary">Our Work</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-foreground font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/contact" className="text-muted hover:text-primary">Contact</Link></li>
                <li><Link to="/testimonials" className="text-muted hover:text-primary">Reviews</Link></li>
                <li><Link to="#" className="text-muted hover:text-primary">Privacy Policy</Link></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-foreground font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-muted">
                <li><a href="mailto:contact@launchspark.dev" className="hover:text-primary">contact@launchspark.dev</a></li>
                <li><a href="tel:+1234567890" className="hover:text-primary">+1 (234) 567-890</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;