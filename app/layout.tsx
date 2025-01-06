import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "ssint-registry-app",
  description: "Verified, Secured, Trusted",
  icons: {
    icon: [
      { url: 'https://cloud.appwrite.io/v1/storage/buckets/6775a4990027d4965a7d/files/677c242a0027112e0541/view?project=67756cb000335c15693f&project=67756cb000335c15693f&mode=admin', sizes: '192x192', type: 'image/png' }]}
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
