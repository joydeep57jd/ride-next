# Components

This section describes the key components of the Metro DTW Booking App, organized by each step in the booking workflow.

---

## 1. StepForm1 – Customer Details

- **File**: `src/components/StepForm1.tsx`
- **Purpose**: Collects customer information (name, email, phone, country code)
- **Validation Schema**: `customerSchema`
- **Dependencies**:
  - `react-hook-form`
  - `zod`
  - `BookingContext`

---

## 2. StepForm2 – Trip Details

- **File**: `src/components/StepForm2.tsx`
- **Purpose**: Collects trip details such as pickup/dropoff location, date/time, flight number, etc.
- **Features**:
  - Uses `google.maps.places.PlaceAutocompleteElement`
  - Detects airport names for flight input
  - Integrates with `MapView` for visualizing routes
- **Validation Schema**: `tripSchema`
- **Dependencies**:
  - `react-hook-form`
  - `zod`
  - `BookingContext`

---

## 3. StepForm3 – Car Selection

- **File**: `src/components/StepForm3.tsx`
- **Purpose**: Lets users choose car type, quantity, and capacity
- **Validation Schema**: `carSchema`
- **Dependencies**:
  - `react-hook-form`
  - `zod`
  - `BookingContext`

---

## 4. StepForm4 – Payment Details

- **File**: `src/components/StepForm4.tsx`
- **Purpose**: Collects card and billing information
- **Validation Schema**: `paymentSchema`
- **Dependencies**:
  - `react-hook-form`
  - `zod`
  - `BookingContext`

---

## 5. MapView

- **File**: `src/components/ui/MapComponent.tsx`
- **Purpose**: Displays an interactive Google Map showing pickup and dropoff markers
- **Features**:
  - Calculates approximate distance
  - Lazy-loaded via `React.Suspense` for performance
- **Dependencies**:
  - Google Maps JavaScript API

---

## 6. ThankYouPage

- **File**: `src/app/thank-you/page.tsx`
- **Purpose**: Displays a confirmation message after successful booking
- **Features**:
  - Responsive design with Tailwind CSS
  - Shows an image (`Cadillac Escalade.png`)
  - Includes navigation links for home or new booking
- **Dependencies**:
  - `next/image`
  - `next/navigation`

---

## 7. SummaryView

- **File**: `src/components/SummaryView.tsx`
- **Purpose**: Presents a summary of the user’s booking before final submission
- **Dependencies**:
  - `BookingContext`
  - `Tailwind CSS`

---

## 8. BookingContext

- **File**: `src/context/BookingContext.tsx`
- **Purpose**: Provides global state for booking across steps
- **Features**:
  - `updateBookingData` method
  - Current step tracking for form navigation
- **Dependencies**:
  - React Context API

---

📌 [Back to Home](README.md)
