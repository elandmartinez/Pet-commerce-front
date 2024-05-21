import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "./components/NavBar/Navbar";

const roboto = Roboto({
  weight: ["100", "300", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"]
})

export const metadata = {
  title: "Pet-commerce",
  description: "Todo lo que tu peludo necesita, aqui",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} relative bg-mainBgColor`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
