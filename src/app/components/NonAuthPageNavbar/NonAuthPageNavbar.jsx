"use client"

import pawLogo from "../../../assets/paw-logo.svg"
import { Pacifico } from "next/font/google";

//we obtain the pacifico font
const pacifico = Pacifico({
  weight: ["400"],
  subsets: ["latin"]
})

//upper nav bar for pages that do not require auth to be in like login and sign-up for now
function NonAuthPageNavbar (){  
  return (
    <div className="relative p-4 sm:pb-1 flex flex-col items-center text-thirdColor top-0 bg-secondaryBgColor w-full">
      <div className={`w-full relative flex flex-col justify-center items-center bg-secondaryBgColor  h-[22%] lg:h-[30%%] max-h-[200px]`}>
        {/* logo element */}
        <img
          src={pawLogo.src}
          className="mx-4 w-16 h-16 fill-thirdColor stroke"
          alt={"Pet-commerce logo"}
          />
        {/* title element */}
        <h1 className={`${pacifico.className} relative italic font-bold text-3xl lg:text-[40px] mb-2 lg:mb-4`} >
          Pet-commerce
        </h1>
      </div>
    </div>
  )
}

export default NonAuthPageNavbar;