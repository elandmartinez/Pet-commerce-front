'use client'

import { Pacifico } from "next/font/google"
import Link from "next/link"
import pawLogo from "../../../assets/paw-logo.svg"
import { FOOTER_LINKS } from "@/utils/dummyData"

const pacifico = Pacifico({
  weight: ["400"],
  subsets: ["latin"]
})

export default function Footer () {
  return (
    <footer
      className="w-full mt-10 py-6 bg-secondaryBgColor text-third flex flex-col sm:flex-row justify-center"
    >
      <div className="flex flex-col text-thirdColor items-center sm:justify-evenly sm:order-2">
        {FOOTER_LINKS.map((link, index) => (
          <a href={link.url} target="_blank" key={index}>
            <div className="footer-link__cont">
              <p className="footer-link relative underline underline-offset-4 decoration-2">{link.name}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="flex flex-col items-center mt-4 mb-4 sm:order-1 sm:mr-10 lg:mr-16">
        <img
          src={pawLogo.src}
          alt={"Pet commerce logo"}
          className="w-20 h-20 fill-thirdColor mb-2 sm:w-24 sm:h-24"
        />
        <h2 className={`${pacifico.className} text-[20px] text-thirdColor sm:text-[30px]`}>Pet-commerce</h2>
      </div>
    </footer>
  )
}