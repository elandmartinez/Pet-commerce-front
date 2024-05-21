'use client'

import { nonAuthRequiredPages } from "@/utils/constants"
import NonAuthPageNavbar from "./NonAuthPageNavbar/NonAuthPageNavbar"
import AuthPageNavbar from "./AuthPageNavbar/AuthPageNavbar";

export default function Navbar () {
  const currentUrlPathname = window.location.pathname;
  const isLoadingOnAuthRequiredPage = nonAuthRequiredPages.some(pagePath => pagePath === currentUrlPathname)

  return (
    <nav className="relative text-thirdColor top-0 w-full">
      {isLoadingOnAuthRequiredPage ? <NonAuthPageNavbar /> : <AuthPageNavbar />}
    </nav>
  )
}