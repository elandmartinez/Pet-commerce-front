"use client"

import AuthPageNavbar from "@/app/components/AuthPageNavbar/AuthPageNavbar"
import ErrorPage from "@/app/components/ErrorPage/ErrorPage"
import Footer from "@/app/components/Footer/Footer"
import LoadingOverlay from "@/app/components/LoadingOverlay/LoadingOverlay"
import ArticleCard from "@/app/components/articleCard/ArticleCard"
import AuthPageManager from "@/app/middlewareComponents/AuthPageManager"
import { updateIsRedirecting } from "@/lib/store/slices/isRedirectingSlice"
import { Roboto } from "next/font/google"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const roboto = Roboto({
  weight: ["100", "300", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"]
})

export default function Page({params}) {
  const [loadingOverlayStatus, setLoadingOverlayStatus] = useState(false)
  const products = useSelector(state => state.products)
  const category = params.category
  const dispatch = useDispatch()
  const isRedirecting = useSelector(state => state.isRedirecting)

  const categoryProducts = products.filter(product => product.category === category)

  //if the state of redirecting is true, we dont want this page to actually render, so we interrumpt it
  if(isRedirecting) {
    //this setTimeout is for making the update of the isRedirecting status after the render of the ErrorPage
    //so the ErrorPage is shown and then the user gets redirected to the actual page it needs to be
    setTimeout(() => {
      dispatch(updateIsRedirecting(false))
    }, 1)
    return (<ErrorPage />)
  }

  return (
    <AuthPageManager>
      <AuthPageNavbar setLoadingOverlayStatus={setLoadingOverlayStatus}/>
      <LoadingOverlay active={loadingOverlayStatus}/>
      <main className="w-full min-h-[56%]">
        <div className="text-thirdColor text-[30px] mt-10 mb-10 text-center" >
            <h1 className="text-[30px] mb-6" >"{category}" products</h1>
            <h2 className="text-[15px]" >Result: {categoryProducts.length}</h2>
          </div>
          <div className={`${roboto.className} w-full grid-styles`}>
            {
              categoryProducts
              ?
              (
                categoryProducts?.map((productData) => {
                  return (
                    <ArticleCard data={productData} key={productData.productId} setLoadingOverlayStatus={setLoadingOverlayStatus}/>
                  )
                })
              )
              :
              null
            }
          </div>
      </main>
      <Footer />
    </AuthPageManager>
  )
}