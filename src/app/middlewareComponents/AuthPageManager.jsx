"use client"

import { persistor } from "@/lib/store"
import { PersistGate } from "redux-persist/integration/react"
import { AUTH_REQUIRED_PAGES, NO_AUTH_REQUIRED_PAGES, ROUTES } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useIsClient } from "@/lib/provider/IsClientSideCtxProvider";
import { updateIsRedirecting } from "@/lib/store/slices/isRedirectingSlice";

export default function AuthPageManager ({children}) {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const router = useRouter()
  const isClient = useIsClient()

  dispatch(updateIsRedirecting(true))

  if(isClient) {  

    dispatch(updateIsRedirecting(false))

    //we get the current pathname of the url
    const currentUrlPathname = window.location.pathname;
  
    //we get the variable that will be the decisive one for deciding which navbar to render
    const isLoadingOnAuthRequiredPage = AUTH_REQUIRED_PAGES.some(pagePath => currentUrlPathname.includes(pagePath))
    const isLoadingOnNoAuthRequiredPage = NO_AUTH_REQUIRED_PAGES.some(pagePath => currentUrlPathname.includes(pagePath))

    //console.log("authing", {isLoadingOnAuthRequiredPage, user})

    //here we redirect to login if user is trying to access a page that requires to be logged and user is not logged
    if(isLoadingOnAuthRequiredPage && !user.token) {
      //console.log("no token")
      dispatch(updateIsRedirecting(true))
      router.push(ROUTES.LOGIN)
    }

    //console.log("passed no token condition")

    //here we redirect to products if user is trying to access a page that requires to not be logged and user is logged
    if(isLoadingOnNoAuthRequiredPage && user?.token) {
      dispatch(updateIsRedirecting(true))
      router.push(ROUTES.PRODUCTS)
    }

    //case for when url is out of existing pages
    if((!isLoadingOnAuthRequiredPage && !isLoadingOnNoAuthRequiredPage) || currentUrlPathname === "" || currentUrlPathname === "/") {
      dispatch(updateIsRedirecting(true))
      router.push(ROUTES.LOGIN)
    }
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