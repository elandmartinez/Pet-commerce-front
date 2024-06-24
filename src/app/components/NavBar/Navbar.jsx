'use client'

import NonAuthPageNavbar from "../NonAuthPageNavbar/NonAuthPageNavbar"
import AuthPageNavbar from "../AuthPageNavbar/AuthPageNavbar";
import { AUTH_REQUIRED_PAGES, NO_AUTH_REQUIRED_PAGES } from "@/utils/constants";


//here i implement a logic where depending on the url it loads a navbar or another
//one is a simple one with just the logo an the other one has all the functionalities for a logged user
export default function Navbar () {
  //this styles are for whe the app is loading the 404 page or an actually existing page, this is because, i can't handle 404 page styles
  //and navbar has a height, so that led to a scroll on the page, which with the absolute style prop, is avoided by removing the nav from the normal
  //layout flow of the app rendering
  const page404Navstyles = "absolute p-4 sm:pb-1 flex flex-col items-center text-thirdColor top-0 bg-secondaryBgColor w-full"
  const normalPageNavStyles = "relative p-4 sm:pb-1 flex flex-col items-center text-thirdColor top-0 bg-secondaryBgColor w-full"

  const currentUrlPathname = window.location.pathname;
 
  //we get the variable that will be the decisive one for deciding which navbar to render
  const isLoadingOnAuthRequiredPage = AUTH_REQUIRED_PAGES.some(pagePath => pagePath === currentUrlPathname)

  //we encapsulate the value of being in a 404 page or not by checking that the url pathname doesnt belong to any exisitng page pathname
  const is404Page = !AUTH_REQUIRED_PAGES.some(pagePath => pagePath === currentUrlPathname) && !NO_AUTH_REQUIRED_PAGES.some(pagePath => pagePath === currentUrlPathname) 


  console.log({ isLoadingOnAuthRequiredPage, is404Page })

  return (
    <nav className={is404Page ? page404Navstyles : normalPageNavStyles}>
      {isLoadingOnAuthRequiredPage ? <AuthPageNavbar /> : <NonAuthPageNavbar />}
    </nav>
  )
}