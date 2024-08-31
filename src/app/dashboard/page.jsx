"use client"

import { Roboto } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import AuthPageNavbar from "../components/AuthPageNavbar/AuthPageNavbar";
import ArticleCard from "../components/articleCard/ArticleCard";
import { useEffect, useState } from "react";
import { updateProducts } from "@/lib/store/slices/productsSlice";
import { fetchProducts } from "@/lib/services";
import Footer from "../components/Footer/Footer";
import DashboardTitle from "../components/DashboardTitle/DashboardTitle";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay";
import { updateIsRedirecting } from "@/lib/store/slices/isRedirectingSlice";
import ErrorPage from "../components/ErrorPage/ErrorPage";

const roboto = Roboto({
  weight: ["100", "300", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"]
})


export default function Dashboard () {
  const [searchingBarValue, setSearchingBarValue] = useState("")
  const [loadingOverlayStatus, setLoadingOverlayStatus] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const products = useSelector(state => state.products)
  const isRedirecting = useSelector(state => state.isRedirecting)

  useEffect(() => {
    async function getProductsData (token) {
      try {
        const products = await fetchProducts(token);
        
        console.log({fetchedProducts: products})

        dispatch(updateProducts(products))
        return 
      } catch (error) {
        throw new Error("couldn't update products")
      }
    }

    getProductsData(user.token)
  }, [dispatch, user.token])

  console.log({products})

  const filteredBySearchProducts = products.filter(product => {
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

  const isThereSearchingBarValue = searchingBarValue !== ""
  const productsToDisplay = isThereSearchingBarValue ? filteredBySearchProducts : products 
  const isProductsToDisplayEmpty = productsToDisplay.length === 0

  function onSearchUpdate (newSearchValue) {
    setSearchingBarValue(newSearchValue)

    //setting LoadingOverlayStatus to false because this function activates when 
    setLoadingOverlayStatus(false)
  }

  return (
    <>
      <LoadingOverlay active={loadingOverlayStatus} />
      <AuthPageNavbar setLoadingOverlayStatus={setLoadingOverlayStatus} onSearchUpdate={onSearchUpdate}/>
      <main className="w-full min-h-[60%] flex flex-col items-center px-2 pb-10">
        <div className="text-thirdColor text-[30px] mt-10 mb-10 text-center">
          <DashboardTitle
            localStoreProducts={products}
            isProductsToDisplayEmpty={isProductsToDisplayEmpty}
            isThereSearchingBarValue={isThereSearchingBarValue}
            searchValue={searchingBarValue}
          />
        </div>
        <div className={`${roboto.className} w-full grid-styles`}>
          {
            products
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
    </>
  )
}