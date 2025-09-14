import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme";

const roboto = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nguyen Duc Loc Story",
  description:
    "Not everything in life is sunny. Some days you'll feel depressed and alone and don't want to go on. After such days, though, I think you'll become stronger, more resilient, and value life and the people you still have.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="pt-8 lg:pt-16 px-6">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
