'use client'

import { nonAuthRequiredPages } from "@/utils/constants"
import NonAuthPageNavbar from "./NonAuthPageNavbar/NonAuthPageNavbar"
import AuthPageNavbar from "./AuthPageNavbar/AuthPageNavbar";


//here i implement a logic where depending on the url it loads a navbar or another
//one is a simple one with just the logo an the other one has all the functionalities for a logged user
export default function Navbar () {

  //we get the current pathname of the url
  const currentUrlPathname = window.location.pathname;

  //we get the variable that will be the decisive one for deciding which navbar to render
  const isLoadingOnAuthRequiredPage = nonAuthRequiredPages.some(pagePath => pagePath === currentUrlPathname)

  return (
    <nav className="relative p-4 sm:pb-1 flex flex-col items-center text-thirdColor top-0 bg-secondaryBgColor w-full">
      {isLoadingOnAuthRequiredPage ? <NonAuthPageNavbar /> : <AuthPageNavbar />}
    </nav>
  )
}