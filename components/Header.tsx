"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const COMPANY_WEBSITE = process.env.NEXT_PUBLIC_COMPANY_WEBSITE || "https://metrodtwsedan.com";
const COMPANY_BOOKING_WEBSITE = process.env.NEXT_PUBLIC_COMPANY_BOOKING_WEBSITE || "https://metrodtwsedan.zenithprods.com";


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 250);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`bg-white text-gray-800 shadow-md sticky top-0 z-50 transition-all duration-300`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:py-4 p-0">
        <a
          href={COMPANY_WEBSITE}
          className="text-2xl font-extrabold tracking-tight text-gray-800"
        >
          <div className="logo">
            <Image
              src="/logo-new-3.png"
              alt="Metro DTW Sedan Logo"
              width={100}
              height={58}
            />
          </div>
        </a>
        <div className="hidden md:flex space-x-6 text-sm text-black">
          {/* Services with Dropdown */}
          {/* <div className="relative group">
            <button className="hover:text-[#00A0FF] dark:hover:text-[#33A7FF] transition focus:outline-none">
              Services
            </button>
            <div className="absolute right-0 mt-2 w-[170px] bg-white dark:bg-black border border-gray-200 dark:border-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform -translate-y-2 transition-all duration-200 z-50">
              <a
                href={`${COMPANY_WEBSITE}/transportation-to-detroit-airport/`}
                className="block px-4 py-2 text-sm text-black dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Airport Transportation
              </a>
              <a
                href={`${COMPANY_WEBSITE}/detroit-airport-car-service/`}
                className="block px-4 py-2 text-sm text-black dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Airport Car Service
              </a>
              <a
                href={`${COMPANY_WEBSITE}/detroit-airport-taxi-service/`}
                className="block px-4 py-2 text-sm text-black dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Airport Taxi Service
              </a>
            </div>
          </div> */}

          <div className="relative inline-block">
  <div className="group">
    <button className="hover:text-[#00A0FF] dark:hover:text-[#33A7FF] transition focus:outline-none">
      Services
    </button>

    <div className="absolute right-0 mt-2 w-[170px] bg-white dark:bg-black border border-gray-200 dark:border-black rounded-md shadow-lg 
                opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 
                transform -translate-y-2 transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
      <a
        href={`${COMPANY_WEBSITE}/transportation-to-detroit-airport/`}
        className="block px-4 py-2 text-sm text-black dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Airport Transportation
      </a>
      <a
        href={`${COMPANY_WEBSITE}/detroit-airport-car-service/`}
        className="block px-4 py-2 text-sm text-black dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Airport Car Service
      </a>
      <a
        href={`${COMPANY_WEBSITE}/detroit-airport-taxi-service/`}
        className="block px-4 py-2 text-sm text-black dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Airport Taxi Service
      </a>
    </div>
  </div>
</div>


          {/* Other Nav Items */}
          <a
            href={`${COMPANY_WEBSITE}/fleet/`}
            className="hover:text-[#00A0FF] dark:hover:text-[#33A7FF] transition"
          >
            Fleet
          </a>
          <a
            href={`${COMPANY_WEBSITE}/rates/`}
            className="hover:text-[#00A0FF] dark:hover:text-[#33A7FF] transition"
          >
            Rates
          </a>
          <a 
            href={`${COMPANY_BOOKING_WEBSITE}/`}
            className="text-[#00A0FF] dark:text-[#33A7FF] transition">
            Reservations
          </a>
        </div>

        {/* <button
          className="md:hidden text-gray-800 dark:text-gray-100"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X color="#000"/> : <Menu color="#000"/>}
        </button> */}
      </nav>

      {/* {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-black px-4 py-3 space-y-2 text-sm text-gray-800 dark:text-gray-100">
          <a
            href="https://metrodtwsedan.com/"
            className="block hover:text-[#00A0FF] dark:hover:text-[#33A7FF] transition"
          >
            Services
          </a>
          <a
            href="https://metrodtwsedan.com/fleet/"
            className="block hover:text-[#00A0FF] dark:hover:text-[#33A7FF] transition"
          >
            Fleet
          </a>
          <a
            href="https://metrodtwsedan.com/rates/"
            className="block hover:text-[#00A0FF] dark:hover:text-[#33A7FF] transition"
          >
            Rates
          </a>
          <a
            href="https://reservations.wizardcomm.in/new-booking"
            className="block text-[#00A0FF] dark:hover:text-[#33A7FF] transition"
          >
            Reservations
          </a>
        </div>
      )} */}
    </header>
  );
}
