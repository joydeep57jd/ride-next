import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "@/components";
import { BookingProvider } from "@/context/BookingContext";
import Script from "next/script"; // ✅ Import Next.js Script

export const metadata: Metadata = {
  title: 'Ride Reservation | Metro DTW Sedan',
  description: 'Book smarter, ride faster with our reliable ride reservation service.',
  openGraph: {
    title: 'Ride Reservation App Home',
    description: 'Start your journey with our easy-to-use ride booking platform.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="Book smarter, ride faster with our reliable ride reservation service." />
        <meta name="keywords" content="ride reservation, cab booking, taxi service, transportation, ride sharing" />
        <meta name="author" content="Metro DTW Sedan" />
        <meta property="og:title" content="Ride Reservation App Home" />
        <meta property="og:description" content="Start your journey with our easy-to-use ride booking platform." />
        <meta property="og:image" content="/og-image.jpg" />
      </head>
      <body className="bg-gray-50 text-gray-900">
        {/* Header */}
        <Header />
        {/* Main Content */}
        <BookingProvider>{children}</BookingProvider>
        {/* Footer */}
        <Footer/>
      </body>
      <script
        src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`}
        async
      ></script>
       {/* ✅ Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QS6S1V1872"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QS6S1V1872');
          `}
        </Script>
    </html> 
  );
}
