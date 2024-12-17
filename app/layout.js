import { Rubik } from "next/font/google";
import "./globals.css";
import Navigation from "./_components/Navigation";
import { Toaster } from "react-hot-toast";

const font = Rubik({
  subsets: ["latin"],
  // weight: ["400"],
});

export const metadata = {
  title: {
    template: "%s - Ecoms",
    default: "Welcome - Ecoms",
  },
  description:
    "Browse all kinds of products ranging from everyday appliances to uncommon solutions to problems",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-white`}>
        <Navigation />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              border: "1px solid black",
            },
          }}
        />
        <main>{children}</main>
      </body>
    </html>
  );
}
