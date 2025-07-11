import { BookingData } from "@/types/booking";


const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "Metro Detroit Sedan";
const COMPANY_WEBSITE = process.env.NEXT_PUBLIC_COMPANY_WEBSITE || "https://metrodtwsedan.com";
const COMPANY_PHONE = process.env.NEXT_PUBLIC_COMPANY_PHONE || "+1 (734) 945-6067";


export const customerEmailTemplate = (booking: BookingData) => `

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Booking Confirmation</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
      <tr>
        <td align="center">
          <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
            <!-- Header -->
            <tr>
              <td style="background-color: #007bff; color: white; padding: 20px; text-align: center; font-size: 22px; font-weight: bold;">
                Booking Confirmation
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 20px; color: #333333;">
                <p style="font-size: 16px;">Hello <strong>${booking.customer.name}</strong>,</p>
                <p style="font-size: 16px;">
                  Thank you for booking with us! Your request has been received. A team member will review it and send a confirmation email shortly. Below are the details of your booking (ID: <strong>${booking.bookingId}</strong>):
                </p>
                <p style="font-size: 16px;">
                  Call us at <strong style="color: #000;">${COMPANY_PHONE}</strong> if you have any questions or need assistance with your booking.
                </p>
              </td>
            </tr>

            <!-- Button -->
            <tr>
              <td style="padding: 20px; text-align: left;">
                <a
                  href="tel:${COMPANY_PHONE}"
                  style="display: inline-block; padding: 12px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px;"
                >
                  Call Metro DTW Sedan
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

`;
