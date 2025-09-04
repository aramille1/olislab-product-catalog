"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useBag } from "@/contexts/BagContext";

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { totalQuantity } = useBag();

    // Handle scroll events to show/hide header based on scroll direction and position
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Early exit: if scroll position hasn't changed, do nothing (for edge cases)
    if (currentScrollY === lastScrollY.current) return;

    // Determine scroll direction and whether header should be hidden
    const scrollingDown = currentScrollY > lastScrollY.current;
    const shouldHide = scrollingDown && currentScrollY > 100; // Hide when scrolling down past 100px threshold

    // Update header visibility: show when scrolling up, hide when scrolling down
    setIsVisible(!shouldHide);

    // Store current scroll position for next comparison
    lastScrollY.current = currentScrollY;
  };

  // Set up scroll event listener - runs only once when component mounts
  useEffect(() => {
    handleScroll();   // Initial call to set header visibility based on current scroll position
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array ensures this runs only once

  // Show header whenever items are added to the shopping bag
  useEffect(() => {
    // If bag has items, ensure header is visible so user can access their bag
    if (totalQuantity > 0) setIsVisible(true);
  }, [totalQuantity]); // Re-run whenever totalQuantity changes

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[995] transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex justify-between items-center px-4 sm:px-6 py-4">
        {/* Left Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/blackLogo.png"
              alt="Oli&apos;s Lab"
              width={35}
              height={20}
              priority
              className="w-[35px] h-[20px] object-contain"
            />
          </Link>
        </div>

        {/* Center Menu Button */}
        <button
          className="absolute left-[40%] font-bold text-xs uppercase tracking-wide cursor-pointer hover:opacity-80 transition-opacity max-sm:left-[15%]"
          onClick={() => console.log('Menu clicked')}
        >
          MENU
        </button>

        {/* Right Navigation */}
        <nav className="flex items-center">
          <Link
            href="/shop"
            className="hidden min-[440px]:block ml-5 font-bold text-xs uppercase  hover:opacity-80 transition-opacity no-underline"
          >
            SHOP
          </Link>

          <Link
            href="/signup"
            className="hidden sm:block ml-5 font-bold text-xs uppercase  hover:opacity-80 transition-opacity no-underline"
          >
            SIGN UP
          </Link>

          <button
            className="ml-10 font-bold text-xs uppercase  hover:opacity-80 transition-opacity flex items-center cursor-pointer"
            onClick={() => console.log('Cart clicked')}
          >
            BAG
            <span
              className="ml-[5px] px-[7.4px] py-[2px] bg-black rounded-full text-[#f7f6e6]  font-bold text-xs bg-contain bg-center bg-no-repeat"
            >
              {totalQuantity}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
