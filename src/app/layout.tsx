import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Open Source Contributor Directory | Global Developer Showcase",
  description: "A community-driven directory showcasing open source contributors, developers, designers, and maintainers worldwide.",
  keywords: ["Open Source", "Contributors", "Developers", "Next.js", "React", "TypeScript", "Tailwind CSS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
