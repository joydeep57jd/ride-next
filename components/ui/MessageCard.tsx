"use client";

import { motion } from "framer-motion";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "./Button";

type MessageCardProps = {
  type: "success" | "failure";
  message: string;
  bookingId?: string;
  onDismiss: () => void;
  onRetry?: () => void;
};

export default function MessageCard({
  type,
  message,
  bookingId,
  onDismiss,
  onRetry,
}: MessageCardProps) {
  const isSuccess = type === "success";

  return (
    <motion.div
      className={`fixed inset-0 sm:inset-auto sm:top-4 sm:right-4 sm:left-auto sm:translate-x-0 sm:max-w-md sm:w-[90vw] z-50 border rounded-none sm:rounded-lg p-5 sm:p-4 shadow-2xl flex items-center justify-center sm:block bg-white dark:bg-black
    ${
      isSuccess
        ? "border-green-300 dark:border-green-700"
        : "border-red-300 dark:border-red-700"
    }
  `}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-sm sm:max-w-full">
        <div className="flex items-start gap-4 sm:gap-3">
          {isSuccess ? (
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          ) : (
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
          )}
          <div className="flex-1">
            <h3 className="text-lg sm:text-base font-bold text-gray-900 dark:text-gray-100">
              {isSuccess ? "Booking Confirmed" : "Booking Failed"}
            </h3>
            {isSuccess && (
              <blockquote className="text-sm text-green-700 dark:text-green-300 mt-1 italic">
                “Thanks for Booking with us!”
              </blockquote>
            )}
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              {message}
            </p>
            {bookingId && isSuccess && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                <span className="font-semibold text-[#33A7FF]">
                  Booking ID:
                </span>{" "}
                <span>{bookingId}</span>
              </p>
            )}
          </div>
          <button
            onClick={onDismiss}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 sm:mt-4 flex flex-col sm:flex-row justify-end gap-2">
          {isSuccess ? (
            <Button
              onClick={onDismiss}
              className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md"
            >
              Go Back
            </Button>
          ) : (
            <Button
              onClick={onRetry}
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md"
            >
              Retry
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
