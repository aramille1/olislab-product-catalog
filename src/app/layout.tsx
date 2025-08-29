import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { ProductsProvider } from "@/contexts/ProductsContext";
import { BagProvider } from "@/contexts/BagContext";
import { Footer } from "@/components/Footer";

const abcDiatype = localFont({
  variable: "--font-abc-diatype",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/ABCDiatype-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ABCDiatype-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

const nbGroteskMono = localFont({
  variable: "--font-nb-grotesk-mono",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/NBGroteskProMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Oli's Lab",
  description: "Oli's Lab web experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${abcDiatype.variable} ${nbGroteskMono.variable} antialiased font-sans bg-background text-foreground`}>
        <ProductsProvider>
          <BagProvider>
            <Header />
            {children}
            <Footer />
          </BagProvider>
        </ProductsProvider>
      </body>
    </html>
  );
}
