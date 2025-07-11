"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { tripSchema } from "@/lib/schema";
import { useBooking } from "@/context/BookingContext";
import { Trip, Coordinates } from "@/types/booking";
import { useState, useCallback, Suspense, useRef, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useDebouncedCallback } from "use-debounce";
import { RefObject } from "react";
import dynamic from "next/dynamic";
const MapView = dynamic(() => import("./ui/MapComponent"), { ssr: false });

declare global {
  interface Window {
    google: typeof google;
  }
}

type Step2FormProps = {
  formRef: RefObject<HTMLFormElement | null>;
};

export default function Step2Form({ formRef }: Step2FormProps) {
  const { updateBookingData, bookingData } = useBooking();
  const [isHourly, setIsHourly] = useState(bookingData.trip.hourly ?? false);
  const [stopCount, setStopCount] = useState(
    bookingData.trip.stops?.length || 0
  );
  const [distance, setDistance] = useState<string>(
    bookingData.trip.distance || "0.0 miles"
  );
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isAirportPickup, setIsAirportPickup] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useForm<Trip>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      ...bookingData.trip,
      hourly: bookingData.trip.hourly ?? false,
      flightnumber: bookingData.trip.flightnumber || "",
      passengers: bookingData.trip.passengers || 1,
      kids: bookingData.trip.kids || 0,
      bags: bookingData.trip.bags || 0,
      dateTime: bookingData.trip.dateTime || "",
      pickup: bookingData.trip.pickup || "",
      dropoff: bookingData.trip.dropoff || "",
      stops: bookingData.trip.stops || [],
      durationHours: bookingData.trip.durationHours || 0,
      durationMinutes: bookingData.trip.durationMinutes || 0,
      distance: bookingData.trip.distance || "0.0 km",
      pickupLatLng: bookingData.trip.pickupLatLng || undefined,
      dropoffLatLng: bookingData.trip.dropoffLatLng || undefined,
    },
    mode: "onChange",
  });

  const pickup = watch("pickup");
  const dropoff = watch("dropoff");
  const pickupLatLng = watch("pickupLatLng") as Coordinates | undefined;
  const dropoffLatLng = watch("dropoffLatLng") as Coordinates | undefined;

  // Debounce context updates to prevent infinite loop
  const debouncedUpdateBookingData = useDebouncedCallback((trip: Trip) => {
    updateBookingData({ trip });
  }, 300);

  // Update context only when specific fields change
  const handleFieldChange = useCallback(() => {
    const values = getValues();
    debouncedUpdateBookingData({
      ...values,
      distance,
    });
  }, [getValues, debouncedUpdateBookingData, distance]);

  // Calculate distance using Google Maps Directions API
  const calculateDistance = useCallback(() => {
    if (pickupLatLng && dropoffLatLng) {
      const toRad = (value: number) => (value * Math.PI) / 180;
      const R = 3958.8; // Earth's radius in miles

      const dLat = toRad(dropoffLatLng.lat - pickupLatLng.lat);
      const dLon = toRad(dropoffLatLng.lng - pickupLatLng.lng);
      const lat1 = toRad(pickupLatLng.lat);
      const lat2 = toRad(dropoffLatLng.lat);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
          Math.sin(dLon / 2) *
          Math.cos(lat1) *
          Math.cos(lat2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const newDistance = (R * c).toFixed(1); // distance in miles

      setDistance(`${newDistance} miles`);
    } else {
      setDistance("0.0 km");
    }
  }, [pickupLatLng, dropoffLatLng, debouncedUpdateBookingData]);

  // Trigger distance calculation when coordinates change
  const debouncedCalculateDistance = useDebouncedCallback(
    calculateDistance,
    500
  );

  if (pickupLatLng && dropoffLatLng) {
    debouncedCalculateDistance();
  }

  // useEffect(() => {
  //   if (window.google && pickup) {
  //     const geocoder = new window.google.maps.Geocoder();
  //     geocoder.geocode({ address: pickup }, (results, status) => {
  //       if (status === "OK" && results && results.length > 0) {
  //         const placeTypes = results[0].types;
  //         setIsAirportPickup(placeTypes.includes("airport"));
  //         if (!placeTypes.includes("airport")) {
  //           setValue("flightnumber", "", { shouldValidate: true });
  //         }
  //       }
  //     });
  //   }
  // }, [pickup, setValue]);

  // Custom validation for transfer type (pickup and dropoff cannot be same)
  const validateTransfer = (data: Trip) => {
    if (
      !isHourly &&
      data.pickup === data.dropoff &&
      data.pickup &&
      data.dropoff
    ) {
      setError("pickup", {
        type: "manual",
        message: "Pickup and dropoff cannot be the same for a transfer trip.",
      });
      setError("dropoff", {
        type: "manual",
        message: "Pickup and dropoff cannot be the same for a transfer trip.",
      });
      return false;
    }
    clearErrors(["pickup", "dropoff"]);
    return true;
  };

  const handleTripTypeToggle = useCallback(
    (hourly: boolean) => {
      setIsHourly(hourly);
      setValue("hourly", hourly, { shouldValidate: true });
      if (!hourly) {
        setStopCount(0);
        setValue("stops", [], { shouldValidate: true });
        setValue("durationHours", 0, { shouldValidate: true });
        setValue("durationMinutes", 0, { shouldValidate: true });
      }
      handleFieldChange();
    },
    [setValue, handleFieldChange]
  );

  const onSubmit = (data: Trip) => {
    updateBookingData({ trip: { ...data, distance }, step: 3 });
  };

  const addStop = () => {
    setStopCount((prev) => prev + 1);
    const currentStops = getValues("stops") || [];
    setValue("stops", [...currentStops, ""], { shouldValidate: true });
    handleFieldChange();
  };

  const removeStop = (index: number) => {
    const currentStops = getValues("stops") || [];
    const updatedStops = currentStops.filter((_, i) => i !== index);
    setValue("stops", updatedStops, { shouldValidate: true });
    setStopCount((prev) => Math.max(prev - 1, 0));
    handleFieldChange();
  };

  const handlePlaceSelect = useCallback(
    (place: google.maps.places.PlaceResult, field: "pickup" | "dropoff") => {
      if (place.geometry?.location) {
        const latLng = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setValue(field, place.formatted_address || "", {
          shouldValidate: true,
        });
        setValue(`${field}LatLng`, latLng, { shouldValidate: true });
        handleFieldChange();
      }
    },
    [setValue, handleFieldChange]
  );

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;

      // Show scroll to bottom button after some scroll
      setShowScrollButton(scrollTop > clientHeight * 0.2);
    }
  };

  const scrollToBottom = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto bg-white dark:bg-transparent p-4 sm:p-6 rounded-2xl flex flex-col text-gray-900 dark:text-gray-100"
      ref={scrollContainerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-labelledby="trip-details"
      onScroll={handleScroll}
    >
      <h3
        id="trip-details"
        className="text-lg sm:text-xl lg:text-3xl font-medium text-center dark:text-gray-100 mb-3"
      >
        Enter Your Trip Details
      </h3>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="flex bg-gray-100 dark:bg-gray-600 rounded-xl">
          <button
            type="button"
            className={`flex-1 rounded-l-lg font-semibold py-3 transition ${
              !isHourly
                ? "bg-[#33A7FF] text-white"
                : "bg-transparent text-gray-800 dark:text-gray-100"
            }`}
            onClick={() => handleTripTypeToggle(false)}
            aria-pressed={!isHourly}
          >
            Transfer
          </button>
          <button
            type="button"
            className={`flex-1 rounded-r-lg font-semibold py-3 transition ${
              isHourly
                ? "bg-[#33A7FF] text-white"
                : "bg-transparent text-gray-800 dark:text-gray-100"
            }`}
            onClick={() => handleTripTypeToggle(true)}
            aria-pressed={isHourly}
          >
            Hourly
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Input
              type="text"
              label="Pickup Location"
              placeholder="Enter pickup location"
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-gray-400 dark:bg-[#181818] dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
              {...register("pickup")}
              onFocus={() => {
                if (window.google) {
                  const input = document.querySelector(
                    `input[name="pickup"]`
                  ) as HTMLInputElement;
                  const autocomplete =
                    new window.google.maps.places.Autocomplete(input, {
                      types: ["geocode"],
                    });
                  autocomplete.addListener("place_changed", () =>
                    handlePlaceSelect(autocomplete.getPlace(), "pickup")
                  );
                }
              }}
              aria-invalid={errors.pickup ? "true" : "false"}
            />
            {errors.pickup && (
              <p className="text-sm text-red-500 dark:text-red-400">
                {errors.pickup.message}
              </p>
            )}
          </div>
          <div>
            <Input
              type="text"
              label="Dropoff Location"
              placeholder="Enter dropoff location"
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-gray-400 dark:bg-[#181818] dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
              {...register("dropoff")}
              onFocus={() => {
                if (window.google) {
                  const input = document.querySelector(
                    `input[name="dropoff"]`
                  ) as HTMLInputElement;
                  const autocomplete =
                    new window.google.maps.places.Autocomplete(input, {
                      types: ["geocode"],
                    });
                  autocomplete.addListener("place_changed", () =>
                    handlePlaceSelect(autocomplete.getPlace(), "dropoff")
                  );
                }
              }}
              aria-invalid={errors.dropoff ? "true" : "false"}
            />
            {errors.dropoff && (
              <p className="text-sm text-red-500 dark:text-red-400">
                {errors.dropoff.message}
              </p>
            )}
          </div>
        </div>

        {isAirportPickup && (
          <div>
            <Input
              type="text"
              label="Flight Number"
              placeholder="e.g., AA123"
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-gray-400 dark:bg-[#181818] dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
              {...register("flightnumber")}
              aria-invalid={errors.flightnumber ? "true" : "false"}
            />
            {errors.flightnumber && (
              <p className="text-sm text-red-500 dark:text-red-400">
                {errors.flightnumber.message}
              </p>
            )}
          </div>
        )}

        <div>
          <Input
            label="Pickup Date & Time"
            id="dateTimeInput"
            type="datetime-local"
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-gray-400 dark:bg-[#181818] dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
            {...register("dateTime")}
            onChange={handleFieldChange}
            aria-invalid={errors.dateTime ? "true" : "false"}
          />
          {errors.dateTime && (
            <p className="text-sm text-red-500 dark:text-red-400">
              {errors.dateTime.message}
            </p>
          )}
        </div>

        {isHourly && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  label="Duration (Hours)"
                  type="number"
                  min={0}
                  className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-gray-400 dark:bg-[#181818] dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
                  {...register("durationHours", { valueAsNumber: true })}
                  onChange={handleFieldChange}
                  aria-invalid={errors.durationHours ? "true" : "false"}
                />
                {errors.durationHours && (
                  <p className="text-sm text-red-500 dark:text-red-400">
                    {errors.durationHours.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  label="Duration (Minutes)"
                  type="number"
                  min={0}
                  max={59}
                  className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-gray-400 dark:bg-[#181818] dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
                  {...register("durationMinutes", { valueAsNumber: true })}
                  onChange={handleFieldChange}
                  aria-invalid={errors.durationMinutes ? "true" : "false"}
                />
                {errors.durationMinutes && (
                  <p className="text-sm text-red-500 dark:text-red-400">
                    {errors.durationMinutes.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              {Array.from({ length: stopCount }).map((_, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center gap-2"
                >
                  <Input
                    label={`Stop ${index + 1}`}
                    placeholder={`Enter Stop ${index + 1} location`}
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-gray-400 dark:bg-[#181818] dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
                    {...register(`stops.${index}`)}
                    aria-invalid={errors.stops?.[index] ? "true" : "false"}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="p-3.5 mt-6 bg-red-200 text-red-800 rounded-md hover:bg-red-300 dark:bg-red-300 dark:text-red-900 dark:hover:bg-red-400"
                    onClick={() => removeStop(index)}
                    aria-label={`Remove Stop ${index + 1}`}
                  >
                    <FaMinus />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-600"
                onClick={addStop}
              >
                <FaPlus /> Add Stop
              </Button>
            </div>
          </div>
        )}

        {/* {pickupLatLng && dropoffLatLng && ( */}
        <Suspense fallback={<p>Loading map...</p>}>
          <MapView pickup={pickupLatLng} dropoff={dropoffLatLng} />
        </Suspense>
        {/* )} */}

        {!isHourly && distance && (
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-gray-100">
              Approximate Distance:
            </strong>{" "}
            {distance}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Input
              label="Passengers"
              type="number"
              min={1}
              max={99}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-gray-400 dark:bg-[#181818] dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
              {...register("passengers", { valueAsNumber: true })}
              onChange={handleFieldChange}
              onKeyUp={(e) => {
                const value = Number(e.currentTarget.value);
                if (value > 99) {
                  setValue("passengers", 99, { shouldValidate: true });
                }else if (value < 1){
                  setValue("passengers", 1, { shouldValidate: true });
                }
              }}
              aria-invalid={errors.passengers ? "true" : "false"}
            />
            {errors.passengers && (
              <p className="text-sm text-red-500 dark:text-red-400">
                {errors.passengers.message}
              </p>
            )}
          </div>
          <div>
            <Input
              label="Kids"
              type="number"
              min={0}
              max={99}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-gray-400 dark:bg-[#181818] dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
              {...register("kids", { valueAsNumber: true })}
              onChange={handleFieldChange}
              onKeyUp={(e) => {
                const value = Number(e.currentTarget.value);
                if (value > 99) {
                  setValue("kids", 99, { shouldValidate: true });
                }
              }}
              aria-invalid={errors.kids ? "true" : "false"}
            />
            {errors.kids && (
              <p className="text-sm text-red-500 dark:text-red-400">
                {errors.kids.message}
              </p>
            )}
          </div>
          <div>
            <Input
              label="Bags"
              type="number"
              min={0}
              max={99}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-gray-400 dark:bg-[#181818] dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
              {...register("bags", { valueAsNumber: true })}
              onChange={handleFieldChange}
              onKeyUp={(e) => {
                const value = Number(e.currentTarget.value);
                if (value > 99) {
                  setValue("bags", 99, { shouldValidate: true });
                }
              }}
              aria-invalid={errors.bags ? "true" : "false"}
            />
            {errors.bags && (
              <p className="text-sm text-red-500 dark:text-red-400">
                {errors.bags.message}
              </p>
            )}
          </div>
          {showScrollButton && (
            <button
              type="button"
              onClick={scrollToBottom}
              className="fixed right-6 bottom-6 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg z-30"
              aria-label="Scroll to bottom"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
}
