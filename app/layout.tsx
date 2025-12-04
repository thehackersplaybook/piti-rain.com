import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Piti Rain - Meditation Practice by Aditya Patange",
  description: "A customized meditation practice designed by Arhat and Zen Master Aditya Patange to help people access bliss states in daily life through simple movements and actions arising from situation practice and metta (loving-kindness).",
  keywords: ["meditation", "piti", "metta", "loving-kindness", "Aditya Patange", "Zen", "mindfulness", "bliss"],
  authors: [{ name: "Aditya Patange" }],
  creator: "Aditya Patange Productions",
  publisher: "Aditya Patange Productions",
  openGraph: {
    title: "Piti Rain - Meditation Practice",
    description: "Access bliss states in daily life through situation practice and metta",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
