# Schemas

This document outlines all Zod-based schemas used for validating booking form data in the Metro DTW Booking App.

---

## 1. `customerSchema`

- **File**: `src/lib/schema.ts`
- **Purpose**: Validates customer information entered in StepForm1.
- **Fields**:
  - `name`: Required, string, max 100 characters
  - `email`: Required, valid email format
  - `phone`: Required, minimum 10 digits
  - `countryCode`: Required string

---

## 2. `tripSchema`

- **File**: `src/lib/schema.ts`
- **Purpose**: Validates trip details in StepForm2.
- **Fields**:
  - `pickup`: Required string
  - `dropoff`: Required string
  - `pickupLatLng`: Optional object with `{ lat: number, lng: number }`
  - `dropoffLatLng`: Optional object with `{ lat: number, lng: number }`
  - `dateTime`: Required future date (string)
  - `flightNumber`: Optional string
  - `passengers`: Required, number (1–99)
  - `kids`: Optional number (0–99)
  - `bags`: Optional number (0–99)
  - `hourly`: Boolean
  - `durationHours`: Optional number (min 0)
  - `durationMinutes`: Optional number (0–59)
  - `stops`: Optional array of strings
  - `distance`: Optional string

---

## 3. `returnTripSchema`

- **File**: `src/lib/schema.ts`
- **Purpose**: Validates return trip data if a round trip is selected.
- **Fields**:
  - `returnDateTime`: Required future date (string)
  - `returnFlightNumber`: Optional string
  - `returnDropoff`: Required string
  - `returnDropoffLatLng`: Optional object with `{ lat: number, lng: number }`

---

## 4. `carSchema`

- **File**: `src/lib/schema.ts`
- **Purpose**: Validates car selection in StepForm3.
- **Fields**:
  - `type`: Required string (e.g., Sedan, SUV)
  - `transferRate`: Number (min 0)
  - `hourlyRate`: Number (min 0)
  - `quantity`: Number (1–10)
  - `capacity`: Number (min 1)

---

## 5. `paymentSchema`

- **File**: `src/lib/schema.ts`
- **Purpose**: Validates payment information in StepForm4 (or future PaymentForm).
- **Fields**:
  - `method`: Enum (`"credit"` or `"debit"`)
  - `cardNumber`: String, 15–16 digits
  - `expiryDate`: String in MM/YY format, future date required
    - Includes logic to cap months at 12
  - `cvv`: String, 3–4 digits
  - `cardholderName`: Required string
  - `billingPostalCode`: String, 5–10 characters
  - `specialInstructions`: Optional string

---

📌 [Back to Home](README.md)