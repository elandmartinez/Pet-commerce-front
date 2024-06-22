import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "./components/NavBar/Navbar";
import ReduxProvider from "@/lib/provider/index";

//here we obtain the roboto font and specify the weight, styles,
//and subsets that we want to get it with
const roboto = Roboto({
  weight: ["100", "300", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"]
})

//metadata neccessary for next to apply to the page
export const metadata = {
  title: "Pet-commerce",
  description: "Todo lo que tu peludo necesita, aqui",
};

//here is the root component
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} relative bg-mainBgColor text-mainColor`}>
        <ReduxProvider>
          {/* the navbar component goes above all the other component rendering no matter what page is */}
          <Navbar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
