"use client"

import { persistor } from "@/lib/store"
import { PersistGate } from "redux-persist/integration/react"
import { AUTH_REQUIRED_PAGES, NO_AUTH_REQUIRED_PAGES, ROUTES } from "@/utils/constants";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function AuthPageManager ({children}) {
  const user = useSelector(state => state.user)
  const router = useRouter()
  
  //we get the current pathname of the url
  const currentUrlPathname = window.location.pathname;
 
  //we get the variable that will be the decisive one for deciding which navbar to render
  const isLoadingOnAuthRequiredPage = AUTH_REQUIRED_PAGES.some(pagePath => currentUrlPathname.includes(pagePath))
  const isLoadingOnNoAuthRequiredPage = NO_AUTH_REQUIRED_PAGES.some(pagePath => currentUrlPathname.includes(pagePath))

  //here we redirect to login if user is trying to access a page that requires to be logged and user is not logged
  if(isLoadingOnAuthRequiredPage && (user?.token === "")) {
    router.push(ROUTES.LOGIN)
  }

  //here we redirect to dashboard if user is trying to access a page that requires to not be logged and user is logged
  if(isLoadingOnNoAuthRequiredPage && user?.token) {
    router.push(ROUTES.DASHBOARD)
  }

  return (
    <PersistGate load={0} persistor={persistor}>
      <div className="w-full h-full">
        {/* move this navbar back to the layout module */}
        {children}
      </div>
    </PersistGate>
  )
}