"use client"

import AuthPageNavbar from "@/app/components/AuthPageNavbar/AuthPageNavbar"
import ErrorPage from "@/app/components/ErrorPage/ErrorPage"
import Footer from "@/app/components/Footer/Footer"
import LoadingOverlay from "@/app/components/LoadingOverlay/LoadingOverlay"
import ProductsPageTitle from "@/app/components/ProductsPageTitle/ProductsPageTitle"
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

///fix: onSearchUpdateFunction does not exists on this page, have to decide whether to invoke that function here
//(with all than that involves) or to remove this page from the flow of the application and handle products by category on
//the products too instead of being a diferent page

export default function Page({params}) {
  const [loadingOverlayStatus, setLoadingOverlayStatus] = useState(false)
  const [searchingBarValue, setSearchingBarValue] = useState("")
  const products = useSelector(state => state.products)
  const category = params.category
  const dispatch = useDispatch()
  const isRedirecting = useSelector(state => state.isRedirecting)

  const categoryProducts = products.filter(product => product.category === category)

  const filteredBySearchProducts = categoryProducts.filter(product => {
    return product.name.includes(searchingBarValue)
  })

  //if the state of redirecting is true, we dont want this page to actually render, so we interrumpt it
  if(isRedirecting) {
    //this setTimeout is for making the update of the isRedirecting status after the render of the ErrorPage
    //so the ErrorPage is shown and then the user gets redirected to the actual page it needs to be
    setTimeout(() => {
      dispatch(updateIsRedirecting(false))
    }, 1)
    return (<ErrorPage />)
  }

  function onSearchUpdate (newSearchValue) {
    setSearchingBarValue(newSearchValue)

    // setting LoadingOverlayStatus to false because this function activates when
    setLoadingOverlayStatus(false)
  }

  console.log({searchingBarValue})

  const isThereSearchingBarValue = searchingBarValue !== ""
  const productsToDisplay = isThereSearchingBarValue ? filteredBySearchProducts : categoryProducts
  const isProductsToDisplayEmpty = productsToDisplay.length === 0

  return (
    <AuthPageManager>
      <AuthPageNavbar setLoadingOverlayStatus={setLoadingOverlayStatus} onSearchUpdate={onSearchUpdate}/>
      <LoadingOverlay active={loadingOverlayStatus}/>
      <main className="w-full min-h-[60%] flex flex-col items-center px-2 pb-10">
        <div className="text-thirdColor text-[30px] mt-10 mb-10 text-center" >
          <ProductsPageTitle
            localStoreProducts={products}
            isProductsToDisplayEmpty={isProductsToDisplayEmpty}
            isThereSearchingBarValue={isThereSearchingBarValue}
            searchValue={searchingBarValue}
            isProductsByCategory={true}
            category={category}
          />
        </div>
        <div className={`${roboto.className} w-full grid-styles`}>
          {
            productsToDisplay
            ?
            (
              productsToDisplay?.map((productData) => {
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