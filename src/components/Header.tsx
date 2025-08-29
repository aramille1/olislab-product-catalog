"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useBag } from "@/contexts/BagContext";

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const { totalQuantity } = useBag();

  // Scroll-based navbar show/hide
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Hide navbar if scrolling down beyond 50px, show if scrolling up
      if (currentScrollPos > lastScrollPos && currentScrollPos > 50) {
        setIsVisible(false);
      } else if (currentScrollPos < lastScrollPos) {
        setIsVisible(true);
      }
      setLastScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollPos]);

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
