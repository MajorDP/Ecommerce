import { Rubik } from "next/font/google";
import "./globals.css";
import Navigation from "./_components/Navigation";

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
        <main>{children}</main>
      </body>
    </html>
  );
}
