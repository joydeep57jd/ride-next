import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { BookingData } from "@/types/booking";
import { customerEmailTemplate, companyEmailTemplate } from "@/templates";

// Define the transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const EMAIL_FROM = process.env.EMAIL_FROM || "no-reply@ridebooking.com";
const COMPANY_EMAIL = process.env.COMPANY_EMAIL || process.env.SECONDARY_COMPANY_EMAIL;

export async function POST(req: NextRequest) {
  try {
    const body: BookingData = await req.json();
    const { bookingId, customer, trip, car, payment, returnTrip } = body;

    // Fast validation
    if (
      !bookingId ||
      !customer?.email ||
      !trip?.pickup ||
      !trip?.dropoff ||
      !payment?.cardNumber
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (returnTrip?.returnDateTime && !returnTrip.returnDropoff) {
      return NextResponse.json(
        { error: "Missing required return trip fields" },
        { status: 400 }
      );
    }

    const toCustomer = {
      from: `Metro DTW Sedan <${EMAIL_FROM}>`,
      to: customer.email,
      subject: `Booking Confirmation - ${bookingId}`,
      text: `Your booking for ${car.type} from ${trip.pickup} to ${
        trip.dropoff
      }${
        returnTrip ? ` with a return from ${returnTrip.returnDropoff}` : ""
      } is confirmed! Booking ID: ${bookingId}`,
      html: customerEmailTemplate(body),
    };

    const toCompany = {
      from: `Metro DTW Sedan <${EMAIL_FROM}>`,
      to: COMPANY_EMAIL,
      subject: `New Booking Notification - ${bookingId} - ${customer.name}`,
      text: `New booking received. Contact ${customer.name} at ${
        customer.countryCode
      }${customer.phone} for payment confirmation. Booking ID: ${bookingId}${
        returnTrip ? ` Includes return from ${returnTrip.returnDropoff}` : ""
      }`,
      html: companyEmailTemplate(body),
    };

    // Send both emails concurrently
    await Promise.all([
      transporter.sendMail(toCustomer),
      transporter.sendMail(toCompany),
    ]);

    return NextResponse.json(
      { message: "Notifications sent successfully", bookingdetails: body },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending notifications:", error);
    return NextResponse.json(
      { error: "Failed to send notifications" },
      { status: 500 }
    );
  }
}
