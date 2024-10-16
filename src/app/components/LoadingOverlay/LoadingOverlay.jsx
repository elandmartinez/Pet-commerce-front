"use client"

import { OrbitProgress } from "react-loading-indicators";
import { useSelector } from "react-redux";

//use this overlay only for redirecting inside the application and create another one for when request to server are being procesed

export default function LoadingOverlay ({active}) {
  const currentPath = window.location.pathname
  const lastPageVisited = useSelector(state => state.lastPageVisited)
  const isRedirectingToSamePage = lastPageVisited === currentPath

  if(!active || isRedirectingToSamePage) return null

  return (
    <div className="fixed z-40 top-0 left-0 right-0 bottom-0 bg-backgroundTransparentGray flex justify-center items-center">
      <div className="w-[300px] h-[150px] flex justify-center items-center bg-mainBgColor rounded-lg shadow-hoverColor shadow-xl">
        <OrbitProgress color="rgb(70 205 255)" size="medium" text={"Loading"} textColor="" />
      </div>
    </div>
  )
}