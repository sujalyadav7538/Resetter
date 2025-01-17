import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full
      ">
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
          {children}
          <Toaster />

        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
