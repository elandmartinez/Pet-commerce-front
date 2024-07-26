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
      className="w-full mt-10 py-10 bg-secondaryBgColor text-third"
    >
      <div className="w-full max-w-[600px] mx-auto flex flex-col text-thirdColor items-center sm:flex-row sm:justify-evenly">
        {FOOTER_LINKS.map((link, index) => (
          <a href={link.url} target="_blank" key={index}>
            <div className="footer-link__cont">
              <p className="footer-link relative underline underline-offset-4 decoration-2">{link.name}</p>
            </div>
          </a>
        ))}
      </div>
      <div className="w-full flex flex-col items-center my-10">
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