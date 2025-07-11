"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  CarFront,
  CarFrontIcon,
  CarIcon,
  Home,
  Mail,
  Map,
  MapPin,
  Phone,
  PhoneIcon,
  Search,
  User,
} from "lucide-react";
import Image from "next/image";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import HomeIcon from "./icons/HomeIcon";
import BriefcaseIcon from "./icons/ServiceIcon";
import PhoneIconClipped from "./icons/CallNaw";
import CustomIcon from "./icons/RateIcon";
import CarFIcon from "./icons/Fleet";
import useIsMobile from "@/hooks/useIsMobile";

function TabIcon({
  Icon,
  label,
  onClick,
}: {
  Icon: React.ElementType;
  label: string;
  onClick: () => void;
}) {
  const isCallNow = label === "Call Now";

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center w-[68px] text-xs text-gray-600 hover:text-blue-600 transition ${
        isCallNow ? "mb-8" : ""
      }`}
    >
      <Icon className={`${isCallNow ? "w-12 h-12 mb-2" : "w-5 h-5"} mb-1`} />
      <span className="text-center font-medium tracking-tight">{label}</span>
    </button>
  );
}
const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "Metro DTW Sedan";
const COMPANY_WEBSITE = process.env.NEXT_PUBLIC_COMPANY_WEBSITE || "https://metrodtwsedan.com";
const COMPANY_PHONE = process.env.NEXT_PUBLIC_COMPANY_PHONE || "+1 (734) 945-6067";
const COMPANY_EMAIL = process.env.NEXT_PUBLIC_COMPANY_EMAIL || "info@metrodtwsedan.com";
const COMPANY_ADDRESS = process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "Canton, MI 48187";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const isMobile = useIsMobile();
  // Uncomment the line above to enable mobile detection
  return isMobile ? (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t border-gray-200 shadow-md flex items-center justify-between px-2 sm:px-4 md:hidden w-full">
      <div className="flex justify-around items-center w-full max-w-md mx-auto">
        <TabIcon
          Icon={HomeIcon}
          label="Home"
          onClick={() => window.open(COMPANY_WEBSITE, "_self")}
        />
        <TabIcon
          Icon={BriefcaseIcon}
          label="Services"
          onClick={() => window.open(`${COMPANY_WEBSITE}/services`, "_self")}
        />
        <TabIcon
          Icon={PhoneIconClipped}
          label="Call Now"
          onClick={() => window.open(`tel:${COMPANY_PHONE}`, "_self")}
        />
        <TabIcon
          Icon={CarFIcon}
          label="Fleet"
          onClick={() => window.open(`${COMPANY_WEBSITE}/fleet`, "_self")}
        />
        <TabIcon
          Icon={CustomIcon}
          label="Rates"
          onClick={() => window.open(`${COMPANY_WEBSITE}/rates`, "_self")}
        />
      </div>
    </footer>
  ) : (
    <footer className="w-full bg-[url('/footer-banner.png')] bg-cover bg-center bg-white text-gray-800 shadow-md dark:bg-none dark:bg-white dark:text-gray-800 dark:shadow-lg">
      {/* Grid layout */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        {/* Logo & Description */}
        <div>
          <div className="mb-4">
            <Image
              src="/graynew.png"
              alt="logo"
              width={100}
              height={58}
              priority
            />
          </div>
          <p className="text-[#6E6E6E] dark:text-gray-800 leading-relaxed">
            Provides premium, reliable transportation services across Southeast
            Michigan. Specializing in airport transfers, corporate travel, and
            special events.
          </p>
          <ul className="flex gap-3 mt-4">
            <li className="w-9 h-9 rounded-full bg-[#4c4848] dark:bg-gray-700 flex justify-center items-center">
              <a href="https://www.facebook.com/metrodtwsedan" target="_blank">
                <FaFacebook className="text-white text-[18px]" />
              </a>
            </li>
            <li className="w-9 h-9 rounded-full bg-[#4c4848] dark:bg-gray-700 flex justify-center items-center">
              <a href="https://www.instagram.com/metrodtwsedan/" target="_blank">              
                <BsInstagram className="text-white text-[18px]" />
              </a>
            </li>
            <li className="w-9 h-9 rounded-full bg-[#4c4848] dark:bg-gray-700 flex justify-center items-center">
               <a href="https://x.com/MetroDTWSedan" target="_blank"> 
              <FaTwitter className="text-white text-[18px]" />
              </a>
            </li>
            <li className="w-9 h-9 rounded-full bg-[#4c4848] dark:bg-gray-700 flex justify-center items-center">
              <a href="https://www.yelp.com/biz/metro-dtw-sedan-canton" target="_blank">              
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                  viewBox="0 0 384 512"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M42.9 240.32l99.62 48.61c19.2 9.4 16.2 37.51-4.5 42.71L30.5 358.45a22.79 22.79 0 0 1-28.21-19.6 197.16 197.16 0 0 1 9-85.32 22.8 22.8 0 0 1 31.61-13.21zm44 239.25a199.45 199.45 0 0 0 79.42 32.11A22.78 22.78 0 0 0 192.94 490l3.9-110.82c.7-21.3-25.5-31.91-39.81-16.1l-74.21 82.4a22.82 22.82 0 0 0 4.09 34.09zm145.34-109.92l58.81 94a22.93 22.93 0 0 0 34 5.5 198.36 198.36 0 0 0 52.71-67.61A23 23 0 0 0 364.17 370l-105.42-34.26c-20.31-6.5-37.81 15.8-26.51 33.91zm148.33-132.23a197.44 197.44 0 0 0-50.41-69.31 22.85 22.85 0 0 0-34 4.4l-62 91.92c-11.9 17.7 4.7 40.61 25.2 34.71L366 268.63a23 23 0 0 0 14.61-31.21zM62.11 30.18a22.86 22.86 0 0 0-9.9 32l104.12 180.44c11.7 20.2 42.61 11.9 42.61-11.4V22.88a22.67 22.67 0 0 0-24.5-22.8 320.37 320.37 0 0 0-112.33 30.1z" />
                </svg>
              </a>
            </li>
            <li className="w-9 h-9 rounded-full bg-[#4c4848] dark:bg-gray-700 flex justify-center items-center">
              <a href="https://www.tripadvisor.com/Attraction_Review-g42139-d24093605-Reviews-Metro_DTW_Sedan-Detroit_Michigan.html" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                  viewBox="0 0 576 512"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M528.91,178.82,576,127.58H471.66a326.11,326.11,0,0,0-367,0H0l47.09,51.24A143.911,143.911,0,0,0,241.86,390.73L288,440.93l46.11-50.17A143.94,143.94,0,0,0,575.88,285.18h-.03A143.56,143.56,0,0,0,528.91,178.82ZM144.06,382.57a97.39,97.39,0,1,1,97.39-97.39A97.39,97.39,0,0,1,144.06,382.57ZM288,282.37c0-64.09-46.62-119.08-108.09-142.59a281,281,0,0,1,216.17,0C334.61,163.3,288,218.29,288,282.37Zm143.88,100.2h-.01a97.405,97.405,0,1,1,.01,0ZM144.06,234.12h-.01a51.06,51.06,0,1,0,51.06,51.06v-.11A51,51,0,0,0,144.06,234.12Zm287.82,0a51.06,51.06,0,1,0,51.06,51.06A51.06,51.06,0,0,0,431.88,234.12Z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white dark:text-gray-600 font-semibold mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {[
              ["About Us", "/about-us/"],
              ["Fleet", "/fleet/"],
              ["Rates", "/rates/"],
            ].map(([text, link]) => (
              <li key={text}>
                <a
                  href={`${COMPANY_WEBSITE}${link}`}
                  className="block text-[#6E6E6E] dark:text-gray-800 hover:text-white dark:hover:text-gray-600 transition"
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white dark:text-gray-600 font-semibold mb-3">
            Our Services
          </h3>
          <ul className="space-y-2">
            {[
              [
                "Transportation to Detroit Airport",
                "/services/airport-transfers/",
              ],
              ["Detroit Airport Car Service", "/services/car-service/"],
              ["Detroit Airport Taxi Service", "/services/taxi-service/"],
            ].map(([text, link]) => (
              <li key={text}>
                <a
                  href={`${COMPANY_WEBSITE}${link}`}
                  className="block text-[#6E6E6E] dark:text-gray-800 hover:text-white dark:hover:text-gray-600 transition"
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white dark:text-gray-600 font-semibold mb-3">
            Connect
          </h3>
          <ul className="space-y-3 text-[#6E6E6E] dark:text-gray-800">
            <li className="flex justify-start items-center gap-2">
              <MapPin className="shrink-0 mt-1" />
              <span>{COMPANY_ADDRESS}</span>
            </li>
            <li className="flex justify-start items-center gap-2">
              <Mail className="shrink-0 mt-1" />
              <div>
                <p>Email address:</p>
                <p className="text-xs">{COMPANY_EMAIL}</p>
              </div>
            </li>
            <li className="flex justify-start items-center gap-2">
              <Phone className="shrink-0 mt-1" />
              <div>
                <p>Contact No:</p>
                <p className="text-xs">{COMPANY_PHONE}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-[#6E6E6E] dark:text-gray-800 border-t border-[#4c4848] dark:border-gray-600 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
        <p>
          © {currentYear} {COMPANY_NAME} | All rights reserved.
        </p>
        <ul className="flex flex-wrap justify-center gap-4">
          {[
            ["Privacy Policy", "/privacy-policy/"],
            ["Terms & Condition", "/terms-condition/"],
            ["Disclaimer", "/disclaimer/"],
            ["Contact Us", "/contact-us/"],
          ].map(([text, link]) => (
            <li key={text}>
              <a
                href={`${COMPANY_WEBSITE}${link}`}
                className="hover:text-white dark:hover:text-gray-600 transition"
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
