import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VoteWise - Your Political Engagement Platform",
  description: "Bridging the information gap between Kenyan citizens and electoral candidates.",
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
