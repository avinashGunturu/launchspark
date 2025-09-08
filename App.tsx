
import React, { useState, useEffect } from 'react';
import { NotificationProvider } from './components/NotificationContext';
import { HashRouter, Routes, Route, useLocation, useNavigate,BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ContactPage from './pages/ContactPage';
import FloatingCTA from './components/FloatingCTA';
import WhatsAppIcon from './components/WhatsAppIcon';
import LeadModal from './components/LeadModal';
import { ThemeProvider } from './components/ThemeContext';
import './components/PortfolioDetailModal'; // Ensure component is bundled
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const ForceHomeOnReload: React.FC = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   // This effect runs only once when the app component mounts (i.e., on reload).
  //   // It replaces the current history entry with the home page.
  //   navigate('/', { replace: true });
  // }, [navigate]); // The dependency array ensures it runs only once.

  return null;
};


const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ThemeProvider>
      <NotificationProvider>
        <BrowserRouter>
          <ForceHomeOnReload />
          <ScrollToTop />
          <div className="bg-background min-h-screen font-sans">
            <Header openModal={openModal} />
            <main>
              <Routes>
                <Route path="/" element={<HomePage openModal={openModal} />} />
                <Route path="/about" element={<AboutPage openModal={openModal} />} />
                <Route path="/services" element={<ServicesPage openModal={openModal} />} />
                <Route path="/portfolio" element={<PortfolioPage openModal={openModal} />} />
                <Route path="/testimonials" element={<TestimonialsPage openModal={openModal} />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              </Routes>
            </main>
            <FloatingCTA />
            {/* <WhatsAppIcon /> */}
            <Footer />
            {isModalOpen && <LeadModal onClose={closeModal} />}
          </div>
        </BrowserRouter>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
