# Metro DTW Booking App Documentation

## Overview

The **Metro DTW Booking App** is a web-based taxi reservation platform built with Next.js. It features a seamless multi-step booking workflow, Google Maps integration, and secure payment processing. Built with a modern React stack and modular components, it is optimized for performance and scalability.

---

## Tech Stack

### Frontend

- **Next.js** – React framework with SSR/SSG support
- **TypeScript** – Type safety and better tooling
- **Tailwind CSS** – Utility-first CSS framework
- **Framer Motion** – Smooth form animations and transitions

### Mapping & Location Services

- **Google Maps JavaScript API**
  - Uses `google.maps.places.PlaceAutocompleteElement`
  - Requires `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in `.env`

### Forms & Validation

- **React Hook Form** – Form state management
- **Zod** – Schema-based validation

### State Management

- **React Context API** – Global state management via `BookingContext`

---

## Environment Variables

Create a `.env` file at the root with the following:

```env
# Google Maps API Key (Places API enabled)
GOOGLE_MAPS_API_KEY=

# Email credentials for sending notifications
EMAIL_PASS=
EMAIL_USER=
EMAIL_FROM=
COMPANY_EMAIL=

# Public environment variables for frontend usage
NEXT_PUBLIC_COMPANY_NAME=
NEXT_PUBLIC_COMPANY_ADDRESS=
NEXT_PUBLIC_COMPANY_PHONE=
NEXT_PUBLIC_COMPANY_WEBSITE=
```
