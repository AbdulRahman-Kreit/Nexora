import type { Metadata } from "next";
import localFont from "next/font/local";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
import "./globals.css";

import { FilterProvider } from "@/contexts/FilterProvider";

const clashDisplay = localFont({
  src: [
    {
      path: '../../public/fonts/clash_display/ClashDisplay-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-clash-display',
});

const clashGrotesk = localFont({
  src: [
    {
      path: '../../public/fonts/clash_grotesk/ClashGrotesk-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-clash-grotesk',
});

export const metadata: Metadata = {
  title: "Nexora",
  description: "The next generation of business analytics & data visualization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${clashDisplay.variable} ${clashGrotesk.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <FilterProvider>
        {children}
        </FilterProvider>
      </body>
    </html>
  );
}
