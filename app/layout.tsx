import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JDOB Construction — Backyard Projects, Carpentry & Repairs",
  description:
    "JDOB Construction helps Toronto homeowners with backyard construction, gazebos, decks, fences, sauna bases, carpentry, and handyman repairs. Request a free estimate.",
  openGraph: {
    title: "JDOB Construction — Backyard Projects, Carpentry & Repairs",
    description:
      "Backyard construction, carpentry, and home repair built with care. Serving Toronto & GTA.",
    url: "https://jdob.ca",
    siteName: "JDOB Construction",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
