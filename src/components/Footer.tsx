'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import WhiteLogo from '../../public/whiteLogo.svg';

interface FooterProps {
  isComingSoonPage?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isComingSoonPage = false }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showNewsletterForm, setShowNewsletterForm] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showGoToTop, setShowGoToTop] = useState(false);

  // Handle scroll to show/hide go to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const shouldShow = scrollY > 200;
      setShowGoToTop(shouldShow);
    };

    // Initial check
    handleScroll();

    // Add event listeners for different scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const handleNewsletter = () => {
    setShowNewsletterForm(!showNewsletterForm);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async (email: string) => {
    if (!validateEmail(email)) {
      setError(true);
      setErrorMessage('Please enter a valid email address');
      return;
    }

    try {
      setShowNewsletterForm(false);
      setEmail('');
      setError(false);
      setErrorMessage('');
      alert('Successfully subscribed to newsletter!');
    } catch (err) {
      setError(true);
      setErrorMessage('Failed to subscribe. Please try again.');
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setError(false);
    setErrorMessage('');
  };

  const handleEmail = () => {
    const email = 'support@olislab.com';
    const mailtoLink = `mailto:${email}`;
    window.location.href = mailtoLink;
  };

  const handleNavigate = (url: string) => {
    window.open(url, '_blank', 'noopener noreferrer');
  };

  const handleAboutUsNavigation = () => {
    window.location.href = '/about';
  };

  return (
    <>
      {/* Floating Go to Top Button */}
      {showGoToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-0 transform -translate-x-1/2 z-[60] bg-black text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-all duration-300 hover:scale-110"
          aria-label="Go to top"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </button>
      )}

      <div
        id="footer"
        className="bg-cover bg-center bg-no-repeat flex flex-col justify-between p-4 sm:p-5"
        style={{ backgroundImage: 'url(/homePageFooterBackground.jpg)' }}
      >
        {!isComingSoonPage && (
          <div className="bg-[#f7f6e6] flex flex-col lg:flex-row flex-wrap justify-between rounded-xl p-6 sm:p-8 lg:p-12 min-h-[400px] lg:min-h-[487px]">
            {/* Newsletter Section */}
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
              <p className="font-mono text-lg sm:text-xl lg:text-2xl max-w-[400px] mb-6 lg:mb-8">
                Take better care of yourself with Oli&apos;s Lab news & updates
              </p>

              <div className="relative flex items-center">
                <div className="w-2 h-2 bg-black rounded-full absolute top-1/2 transform -translate-y-1/2 z-10"></div>
                {!showNewsletterForm ? (
                  <p
                    onClick={handleNewsletter}
                    className="text-xs uppercase font-sans font-bold ml-4 cursor-pointer hover:text-gray-700 transition-colors"
                  >
                    Register for our newsletter
                  </p>
                ) : (
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
                    <input
                      className="flex-1 border-none bg-transparent uppercase p-3 outline-none text-sm text-[#5D5246] font-sans font-bold leading-[110%] tracking-[-0.14px] opacity-30 w-full sm:w-[279px] h-[54px] flex-shrink-0 ml-4 mb-3 sm:mb-0"
                      type="text"
                      placeholder="Enter your email"
                      autoFocus
                      value={email}
                      onChange={handleEmailChange}
                    />
                    <button
                      onClick={() => handleSubscribe(email)}
                      className="flex w-full sm:w-[118px] p-3 sm:p-[10px_20px] justify-center items-center gap-2 rounded-[41px] bg-black text-[#F7F6E6] text-center font-sans text-xs font-normal leading-5 uppercase border-none hover:bg-gray-800 transition-colors"
                    >
                      Subscribe
                    </button>
                    {error && <p className="text-red-400 text-sm mt-2">{errorMessage}</p>}
                  </div>
                )}
              </div>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col sm:flex-row w-full lg:w-[400px] justify-between gap-6 sm:gap-8 lg:gap-0">
              {/* Shop Section */}
              <div className="w-full sm:w-[100px]">
                <div
                  className="lg:hidden flex justify-between items-center cursor-pointer border-b border-[#7e7063]/20 pb-2"
                  onClick={() => toggleSection('shop')}
                >
                  <p className="font-sans text-xs font-bold uppercase text-[#7e7063]">SHOP</p>
                  <span className="text-lg">
                    {expandedSection === 'shop' ? '−' : '+'}
                  </span>
                </div>
                <p className="hidden lg:block font-sans text-[10px] font-bold uppercase mb-3 text-[#7e7063]">SHOP</p>
                <ul className={`pl-0 list-none flex flex-col gap-3 lg:gap-4 pt-4 lg:pt-5 ${
                  expandedSection === 'shop'
                    ? 'max-h-[500px] overflow-hidden transition-[max-height_0.3s_ease]'
                    : 'max-h-0 overflow-hidden transition-[max-height_0.3s_ease] lg:max-h-[500px] lg:overflow-visible'
                }`}>
                  <li className="font-sans text-xs lg:text-sm uppercase font-bold cursor-pointer hover:text-[#555] transition-colors">Shop</li>
                  <li className="font-sans text-xs lg:text-sm uppercase font-bold cursor-pointer hover:text-[#555] transition-colors">Brands</li>
                  <li className="font-sans text-xs lg:text-sm uppercase font-bold cursor-pointer hover:text-[#555] transition-colors">Journal</li>
                  <li className="font-sans text-xs lg:text-sm uppercase font-bold cursor-pointer hover:text-[#555] transition-colors">Actives</li>
                </ul>
              </div>

              {/* Other Section */}
              <div className="w-full sm:w-[100px]">
                <div
                  className="lg:hidden flex justify-between items-center cursor-pointer border-b border-[#7e7063]/20 pb-2"
                  onClick={() => toggleSection('other')}
                >
                  <p className="font-sans text-xs font-bold uppercase text-[#7e7063]">OTHER</p>
                  <span className="text-lg">
                    {expandedSection === 'other' ? '−' : '+'}
                  </span>
                </div>
                <p className="hidden lg:block font-sans text-[10px] font-bold uppercase mb-3 text-[#7e7063]">OTHER</p>
                <ul className={`pl-0 list-none flex flex-col gap-3 lg:gap-4 pt-4 lg:pt-5 ${
                  expandedSection === 'other'
                    ? 'max-h-[500px] overflow-hidden transition-[max-height_0.3s_ease]'
                    : 'max-h-0 overflow-hidden transition-[max-height_0.3s_ease] lg:max-h-[500px] lg:overflow-visible'
                }`}>
                  <li className="font-sans text-xs lg:text-sm uppercase font-bold cursor-pointer hover:text-[#555] transition-colors">FAQ</li>
                  <li className="font-sans text-xs lg:text-sm uppercase font-bold cursor-pointer hover:text-[#555] transition-colors" onClick={handleAboutUsNavigation}>About Us</li>
                  <li className="font-sans text-xs lg:text-sm uppercase font-bold cursor-pointer hover:text-[#555] transition-colors" onClick={handleEmail}>Contact Us</li>
                </ul>
              </div>

              {/* Social Section */}
              <div className="w-full sm:w-[100px]">
                <div
                  className="lg:hidden flex justify-between items-center cursor-pointer border-b border-[#7e7063]/20 pb-2"
                  onClick={() => toggleSection('social')}
                >
                  <p className="font-sans text-xs font-bold uppercase text-[#7e7063]">SOCIAL</p>
                  <span className="text-lg">
                    {expandedSection === 'social' ? '−' : '+'}
                  </span>
                </div>
                <p className="hidden lg:block font-sans text-[10px] font-bold uppercase mb-3 text-[#7e7063]">SOCIAL</p>
                <ul className={`pl-0 list-none flex flex-col gap-3 lg:gap-4 pt-4 lg:pt-5 ${
                  expandedSection === 'social'
                    ? 'max-h-[500px] overflow-hidden transition-[max-height_0.3s_ease]'
                    : 'max-h-0 overflow-hidden transition-[max-height_0.3s_ease] lg:max-h-[500px] lg:overflow-visible'
                }`}>
                  <li className="font-sans text-xs lg:text-sm uppercase font-bold cursor-pointer hover:text-[#555] transition-colors" onClick={() => handleNavigate("https://www.instagram.com/olis.lab")}>Instagram</li>
                  <li className="font-sans text-xs lg:text-sm uppercase font-bold cursor-pointer hover:text-[#555] transition-colors" onClick={() => handleNavigate("https://www.linkedin.com/company/olis-lab")}>LinkedIn</li>
                </ul>
              </div>
            </div>

            {/* Policy Block */}
            <div className="flex flex-col-reverse sm:flex-row justify-between w-full mt-8 lg:mt-0 lg:self-end">
              <div className="flex items-center justify-center sm:justify-start">
                <p className="font-sans text-xs text-[#7e7063] uppercase font-bold text-center sm:text-left">
                  © all rights reserved OLI&apos;s lab
                </p>
              </div>
              <div className="flex flex-col-reverse sm:flex-row gap-4 sm:gap-10 font-bold mb-4 sm:mb-0">
                <p className="font-sans text-xs uppercase cursor-pointer text-center sm:text-left hover:text-[#555] transition-colors">Terms of Use</p>
                <p className="font-sans text-xs uppercase cursor-pointer text-center sm:text-left hover:text-[#555] transition-colors">Privacy Policy</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer Bottom */}
        <div className="flex flex-col items-center py-16 sm:py-20 lg:py-[100px]">
          <div className="mb-4 sm:mb-5">
            <img src={WhiteLogo.src ? WhiteLogo.src : WhiteLogo} alt="Oli's Lab Logo" className="w-16 sm:w-18" />
          </div>
          <p className="font-mono text-sm text-center text-[#f7f6e6] mb-4 px-4">Take better care of yourself</p>

          {isComingSoonPage && (
            <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
              <Link
                href="https://www.instagram.com/olis.lab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F4F2F2] text-center font-sans text-xs font-bold leading-[110.457%] uppercase no-underline cursor-pointer hover:text-white transition-colors"
              >
                Instagram
              </Link>
              <Link
                href="https://www.linkedin.com/company/olis-lab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F4F2F2] text-center font-sans text-xs font-bold leading-[110.457%] uppercase no-underline cursor-pointer hover:text-white transition-colors"
              >
                LinkedIn
              </Link>
              <Link
                href="https://www.tiktok.com/@olis_lab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F4F2F2] text-center font-sans text-xs font-bold leading-[110.457%] uppercase no-underline cursor-pointer hover:text-white transition-colors"
              >
                TikTok
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
