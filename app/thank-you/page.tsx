"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ThankYouPage() {
  const COMPANY_HOME_URL = process.env.NEXT_PUBLIC_COMPANY_WEBSITE;
  const PHONE_NUMBER = process.env.NEXT_PUBLIC_COMPANY_PHONE || "123-456-7890";
  const CarImages = {
    "Cadillac Escalade": "/Cadillac Escalade.png",
    "Lincoln MKT Sedan": "/Lincoln MKT Sedan.png",
    "Lincoln Aviator": "/Lincoln Aviator.png",
    "Lincoln Navigator": "/Lincoln Navigator.png",
    "Chevy Suburban": "/Chevy Suburban.png",
  };
  const router = useRouter();

  const handleGoToHome = () => {
    window.location.href = COMPANY_HOME_URL || "/";
  };

  const handleGoToNewBooking = () => {
    router.push("/new-booking");
    window.scrollTo(0, 0); // Scroll to top after navigation
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#181818] p-4 sm:p-6 md:p-8 gap-4 mb-8">
      <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
        Thank You
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 text-center">
        For Booking Our Car Service
      </p>
      <p className="text-sm sm:text-md md:text-lg font-semibold text-gray-600 dark:text-gray-400 mb-8 text-center">
        Call us if you have any query : {PHONE_NUMBER}
      </p>
      <div className="mb-8 w-full max-w-xs sm:max-w-sm md:max-w-md">
        <Image
          src={CarImages["Lincoln MKT Sedan"]}
          alt="Car Service Vehicle"
          width={400}
          height={200}
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-xs sm:max-w-sm  md:max-w-md mb-16">
        <button
          onClick={handleGoToHome}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 font-semibold border border-gray-400 bg-transparent text-gray-800 rounded-md hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 transition duration-200"
        >
          GO TO HOME
        </button>
        <button
          onClick={handleGoToNewBooking}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 font-semibold border border-gray-400 bg-transparent text-gray-800 rounded-md hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 transition duration-200"
        >
          NEW BOOKING
        </button>
      </div>
    </div>
  );
}