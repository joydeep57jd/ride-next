import { BookingData } from "@/types/booking";


const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "Metro Detroit Sedan";
const COMPANY_WEBSITE = process.env.NEXT_PUBLIC_COMPANY_WEBSITE || "https://metrodtwsedan.com";
const COMPANY_PHONE = process.env.NEXT_PUBLIC_COMPANY_PHONE || "+1 (734) 945-6067";


export const customerEmailTemplate = (booking: BookingData) => `

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Booking Notification</title>
</head>
<body style="margin: 0; padding: 0; padding-top:20px; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #007bff; border-radius: 8px 8px 0 0;">
        <h1 style="color: #ffffff; margin: 10px 0; font-size: 24px;">Booking Confirmation</h1>
      </td>
    </tr>

    <!-- Greeting -->
    <tr>
      <td style="padding: 20px;">
        <p style="font-size: 16px;">Hello <strong>${booking.customer?.name || 'Customer'}</strong>,</p>
        <p style="font-size: 16px;">
          Thank you for booking with us! Your request has been received. A team member will review it and send a confirmation email shortly. Below are the details of your booking (ID: <strong>${booking.bookingId}</strong>):
        </p>
        <p style="font-size: 16px;">
          Call us at <strong style="color: #000;">${COMPANY_PHONE}</strong> if you have any questions or need assistance with your booking.
        </p>
      </td>
    </tr>

    <!-- Call Button -->
    <tr>
      <td style="padding: 20px; padding-top:0px;">
        <a href="tel:${COMPANY_PHONE}" style="display: inline-block; padding: 12px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; margin:20px 0;">
          Call Metro DTW Sedan
        </a>

    <!-- Booking Info -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="10" style="background-color: #f9f9f9; border-radius: 0; margin:20px 0">
          <tr>
            <td style="font-weight: bold; color: #333;">Customer Name:</td>
            <td style="color: #555;">${booking.customer?.name}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; color: #333;">Phone Number:</td>
            <td style="color: #555;">${booking.customer?.countryCode}${booking.customer?.phone}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; color: #333;">Email:</td>
            <td style="color: #555;">${booking.customer?.email}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; color: #333;">Car Type:</td>
            <td style="color: #555;">${booking.car?.type}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; color: #333;">Pickup Location:</td>
            <td style="color: #555;">
              ${booking.trip?.pickup}
              ${
                booking.trip?.pickupLatLng
                  ? ` (Lat: ${booking.trip.pickupLatLng.lat}, Lng: ${booking.trip.pickupLatLng.lng})`
                  : ""
              }
            </td>
          </tr>
          <tr>
            <td style="font-weight: bold; color: #333;">Drop-off Location:</td>
            <td style="color: #555;">
              ${booking.trip?.dropoff}
              ${
                booking.trip?.dropoffLatLng
                  ? ` (Lat: ${booking.trip.dropoffLatLng.lat}, Lng: ${booking.trip.dropoffLatLng.lng})`
                  : ""
              }
            </td>
          </tr>
          ${
            booking.trip?.flightnumber
              ? `
              <tr>
                <td style="font-weight: bold; color: #333;">Flight Number:</td>
                <td style="color: #555;">${booking.trip.flightnumber}</td>
              </tr>
              `
              : ""
          }
          ${
            booking.trip?.stops?.length
              ? `
              <tr>
                <td style="font-weight: bold; color: #333;">Stops:</td>
                <td style="color: #555;">${booking.trip.stops.join(", ")}</td>
              </tr>
              `
              : ""
          }
          <tr>
            <td style="font-weight: bold; color: #333;">Date & Time:</td>
            <td style="color: #555;">${new Date(booking.trip?.dateTime).toLocaleString()}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; color: #333;">Passengers:</td>
            <td style="color: #555;">${booking.trip?.passengers} (Kids: ${booking.trip?.kids})</td>
          </tr>
          <tr>
            <td style="font-weight: bold; color: #333;">Bags:</td>
            <td style="color: #555;">${booking.trip?.bags}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; color: #333;">Trip Type:</td>
            <td style="color: #555;">${booking.trip?.hourly ? "Hourly" : "Transfer"}</td>
          </tr>
          ${
            booking.trip?.hourly
              ? `
              <tr>
                <td style="font-weight: bold; color: #333;">Duration:</td>
                <td style="color: #555;">${booking.trip.durationHours || 0} hrs, ${booking.trip.durationMinutes || 0} mins</td>
              </tr>
              `
              : ""
          }
          ${
            booking.trip?.distance
              ? `
              <tr>
                <td style="font-weight: bold; color: #333;">Distance:</td>
                <td style="color: #555;">${booking.trip.distance}</td>
              </tr>
              `
              : ""
          }

          <!-- Payment (Sanitized) -->
          <tr>
            <td style="font-weight: bold; color: #333;">Payment Method:</td>
            <td style="color: #555;">${booking.payment?.method}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; color: #333;">Card Number:</td>
            <td style="color: #555;">**** **** **** ${booking.payment?.cardNumber?.slice(-4)}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; color: #333;">Cardholder Name:</td>
            <td style="color: #555;">${booking.payment?.cardholderName}</td>
          </tr>
          ${
            booking.payment?.specialInstructions
              ? `
              <tr>
                <td style="font-weight: bold; color: #333;">Special Instructions:</td>
                <td style="color: #555;">${booking.payment.specialInstructions}</td>
              </tr>
              `
              : ""
          }
          <tr>
            <td style="font-weight: bold; color: #333;">Terms Accepted:</td>
            <td style="color: #555;">Yes</td>
          </tr>

          <!-- Return Trip -->
          ${
            booking.returnTrip
              ? `
              <tr>
                <td colspan="2" style="font-weight: 900; font-size: 18px; color: #333; padding-top: 20px;">
                  Return Reservation
                </td>
              </tr>
              <tr>
                <td style="font-weight: bold; color: #333;">Return Date & Time:</td>
                <td style="color: #555;">${new Date(booking.returnTrip.returnDateTime).toLocaleString()}</td>
              </tr>
              ${
                booking.returnTrip.returnFlightNumber
                  ? `
                <tr>
                  <td style="font-weight: bold; color: #333;">Return Flight Number:</td>
                  <td style="color: #555;">${booking.returnTrip.returnFlightNumber}</td>
                </tr>
                `
                  : ""
              }
              <tr>
                <td style="font-weight: bold; color: #333;">Return Drop-off Location:</td>
                <td style="color: #555;">${booking.returnTrip.returnDropoff}</td>
              </tr>
              `
              : ""
          }

        </table>
      </td>
    </tr>
     <tr>
        <td style="padding: 20px; text-align: center; background-color: #f4f4f4; border-radius: 0 0 8px 8px;">
          <p style="color: #777; font-size: 14px; margin: 0;">
            © ${new Date().getFullYear()} ${COMPANY_NAME}.<br>
            <a href="${COMPANY_WEBSITE}" style="color: #1a73e8; text-decoration: none;">Visit our website</a> | 
            <a href="${COMPANY_WEBSITE}/privacy-policy/" style="color: #1a73e8; text-decoration: none;">Privacy Policy</a>
          </p>
        </td>
      </tr>
  </table>
</body>
</html>


`;
