"use client";

import { motion } from "framer-motion";
import { useBooking } from "@/context/BookingContext";
import Step1Form from "@/components/Step1Form";
import Step2Form from "@/components/Step2Form";
import Step3Form from "@/components/Step3Form";
import Step4Form from "@/components/Step4Form";
import DefaultStepper from "@/components/DefaultStepper";
import SummaryView from "@/components/Summary";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import MessageCard from "@/components/ui/MessageCard";

export default function RidePage() {
  const { bookingData, updateBookingData } = useBooking();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "failure";
    text: string;
    bookingId?: string;
  } | null>(null);

  // Generate booking ID on mount
  useEffect(() => {
    const fetchBookingId = async () => {
      try {
        const response = await axios.get("/api/get-new-bookingId");
        const bookingId = response.data.bookingId;
        updateBookingData({ bookingId });
      } catch (error) {
        console.error("Failed to fetch booking ID:", error);
        // Fallback: Generate a temporary ID
        const companyPrefix = "MDS";
        const randomNum = Math.floor(1000 + Math.random() * 900000);
        const bookingId = `${companyPrefix}${randomNum
          .toString()
          .padStart(6, "0")}`;
        updateBookingData({ bookingId });
      }
    };
    fetchBookingId();
  }, []);

  // Handle "Prev" button
  const handlePrev = () => {
    if (bookingData.step > 1) {
      updateBookingData({ step: bookingData.step - 1 });
      setMessage(null);
    }
  };

  // Handle "Next" button
  const handleNext = async () => {
    setIsLoading(true);
    setMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    formRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    try {
      if (bookingData.step <= 4 && formRef.current) {
        formRef.current.requestSubmit();
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({
        type: "failure",
        text: "Error processing booking. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return bookingData.step <= 4 ? (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 w-full h-full flex flex-col overflow-y-auto overflow-hidden pt-0 pb-24 md:px-0 md:pb-2 transition-colors duration-300 bg-white dark:bg-[#282929] dark:bg-gradient-to-br dark:from-[#1e1f1f] dark:to-[#282929] scrollbar-hide"
    >
      <div className="p-4 bg-[#33A7FF] dark:bg-[#33A7FF] text-white text-center">
        <h1 className="text-2xl font-bold">MDS Reservations</h1>
        <p className="text-sm">Book Your Reservations</p>
      </div>
      {/* Stepper Header */}
      <div className="px-auto lg:pt-2 flex items-center justify-center">
        <DefaultStepper />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-1 md:px-2 md:pt-1 md:pb-2 lg:p-4">
        {bookingData.step === 1 && <Step1Form formRef={formRef} />}
        {bookingData.step === 2 && <Step2Form formRef={formRef} />}
        {bookingData.step === 3 && <Step3Form formRef={formRef} />}
        {bookingData.step === 4 && <Step4Form formRef={formRef} />}
      </div>

      {/* Consolidated Buttons */}
      <div className="bottom-0 w-full flex justify-center items-center gap-4 p-4 dark:from-[#1e1f1f] dark:to-[#282929]">
        <Button
          type="button"
          variant="outline"
          className={`w-auto px-6 py-2 bg-[#002e52] text-white rounded-md hover:bg-[#00518F] dark:bg-[#6b6f71] dark:text-white dark:hover:bg-[#00518F] ${
            bookingData.step === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePrev}
          disabled={bookingData.step === 1}
        >
          Back
        </Button>
        <Button
          type="button"
          variant="solid"
          className={`w-auto px-6 py-2 rounded-md font-semibold transition-colors ${
            isLoading
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : bookingData.step <= 4
              ? "bg-[#33A7FF] text-white hover:bg-[#00518F] dark:bg-[#33A7FF] dark:hover:bg-[#00518F]"
              : "bg-green-700 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500"
          }`}
          onClick={handleNext}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin h-5 w-5 inline-block" />
          ) : bookingData.step === 5 ? (
            "Confirm"
          ) : (
            "Next"
          )}
        </Button>
      </div>
    </motion.div>
  ) : (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gradient-to-br dark:bg-[#282929] w-full h-full flex flex-col overflow-hidden transition-colors duration-300 flex-1 overflow-y-auto p-1 pb-20 md:px-2 md:pt-1 md:pb-2 scrollbar-hide"
    >
      <SummaryView />
    </motion.div>
  );
}
