import { BookingData } from "@/types/booking";

const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "Metro Detroit Sedan";
const COMPANY_WEBSITE = process.env.NEXT_PUBLIC_COMPANY_WEBSITE || "https://metrodtwsedan.com";

export const companyEmailTemplate = (booking: BookingData) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Booking Notification</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <tr>
        <td style="padding: 20px; text-align: center; background-color: #d32f2f; border-radius: 8px 8px 0 0;">
          <h1 style="color: #ffffff; margin: 10px 0; font-size: 24px;">New Booking Notification</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px;">
          <h2 style="color: #333; font-size: 20px; margin-top: 0;">New Booking Received (ID: ${
            booking.bookingId
          }) - ${booking.customer.name}</h2>
          <p style="color: #555; font-size: 16px; line-height: 1.5;">
            A new booking has been made. Please contact the customer to confirm payment and finalize details.
          </p>
          <a href="tel:${`${booking.customer.countryCode}${booking.customer.phone}`}" style="display: inline-block; padding: 12px 24px; background-color: #d32f2f; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 16px; margin: 20px 0;">
            Call Customer
          </a>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="10" style="background-color: #f9f9f9; border-radius: 0; margin: 20px 0;">
            <tr>
              <td style="font-weight: bold; color: #333;">Customer Name:</td>
              <td style="color: #555;">${booking.customer.name}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #333;">Phone Number:</td>
              <td style="color: #555;">${`${booking.customer.countryCode}${booking.customer.phone}`}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #333;">Email:</td>
              <td style="color: #555;">${booking.customer.email}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #333;">Car Type:</td>
              <td style="color: #555;">${booking.car.type}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #333;">Pickup Location:</td>
              <td style="color: #555;">${
                booking.trip.pickup || booking.trip.pickup
              }${
  booking.trip.pickupLatLng || booking.trip.pickupLatLng
    ? ` (Lat: ${
        (booking.trip.pickupLatLng || booking.trip.pickupLatLng)?.lat
      }, Lng: ${(booking.trip.pickupLatLng || booking.trip.pickupLatLng)?.lng})`
    : ""
}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #333;">Drop-off Location:</td>
              <td style="color: #555;">${
                booking.trip.dropoff || booking.trip.dropoff
              }${
  booking.trip.dropoffLatLng || booking.trip.dropoffLatLng
    ? ` (Lat: ${
        (booking.trip.dropoffLatLng || booking.trip.dropoffLatLng)?.lat
      }, Lng: ${
        (booking.trip.dropoffLatLng || booking.trip.dropoffLatLng)?.lng
      })`
    : ""
}</td>
            </tr>
            ${
              booking.trip.flightnumber
                ? `
              <tr>
                <td style="font-weight: bold; color: #333;">Flight Number:</td>
                <td style="color: #555;">${booking.trip.flightnumber}</td>
              </tr>
            `
                : ""
            }
            ${
              booking.trip.stops && booking.trip.stops.length > 0
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
              <td style="color: #555;">${new Date(
                booking.trip.dateTime
              ).toLocaleString()}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #333;">Passengers:</td>
              <td style="color: #555;">${booking.trip.passengers} (Kids: ${
  booking.trip.kids
})</td>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #333;">Bags:</td>
              <td style="color: #555;">${booking.trip.bags}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #333;">Trip Type:</td>
              <td style="color: #555;">${
                booking.trip.hourly ? "Hourly" : "Transfer"
              }</td>
            </tr>
            ${
              booking.trip.hourly
                ? `
              <tr>
                <td style="font-weight: bold; color: #333;">Duration:</td>
                <td style="color: #555;">${
                  booking.trip.durationHours || 0
                } hrs, ${booking.trip.durationMinutes || 0} mins</td>
              </tr>
            `
                : ""
            }
            ${
              booking.trip.distance
                ? `
              <tr>
                <td style="font-weight: bold; color: #333;">Distance:</td>
                <td style="color: #555;">${booking.trip.distance}</td>
              </tr>
            `
                : ""
            }
            <tr>
              <td style="font-weight: bold; color: #333;">Payment Method:</td>
              <td style="color: #555;">${booking.payment.method}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #333;">Card Number:</td>
              <td style="color: #555;">${booking.payment.cardNumber}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #333;">Expiry Date:</td>
              <td style="color: #555;">${booking.payment.expiryDate}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #333;">CVV:</td>
              <td style="color: #555;">${booking.payment.cvv}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #333;">Cardholder Name:</td>
              <td style="color: #555;">${booking.payment.cardholderName}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #333;">Billing Postal Code:</td>
              <td style="color: #555;">${booking.payment.billingPostalCode}</td>
            </tr>
            ${
              booking.payment.specialInstructions
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
                <td style="color: #555;">${new Date(
                  booking.returnTrip.returnDateTime
                ).toLocaleString()}</td>
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
                <td style="color: #555;">${
                  booking.returnTrip.returnDropoff
                }</td>
              </tr>
            `
                : ""
            }
          </table>
          <p style="color: #555; font-size: 16px; line-height: 1.5;">
            Please contact the customer as soon as possible to confirm payment and arrange the ride.
          </p>
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
