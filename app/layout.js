import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "UCS Calculator",
  description: "Inteligentny asystent logistyki UCS",

  openGraph: {
    title: "Inteligentny asystent logistyki UCS",

    description:
      "Analiza kosztów transportu aut USA → Europa. Dane IAA, Copart, routing, kontenery i AI.",

    url: "https://ucs-calculator.vercel.app",

    siteName: "UCS Calculator",

    images: [
      {
        url: "/ucs-social-preview.png",
        width: 1200,
        height: 630,
      },
    ],

    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}