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
import AuthPageManager from "../middlewareComponents/AuthPageManager";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay";

const roboto = Roboto({
  weight: ["100", "300", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"]
})


export default function Dashboard () {
  const [searchingBarValue, setSearchingBarValue] = useState("")
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  const user = useSelector((state) => state.user)

  const filteredBySearchProducts = products.filter(product => {
    return product.name.includes(searchingBarValue)
  })
  const isThereSearchingBarValue = searchingBarValue !== ""
  const productsToDisplay = isThereSearchingBarValue ? filteredBySearchProducts : products 
  const isProductsToDisplayEmpty = productsToDisplay.length === 0

  function onSearchUpdate (newSearchValue) {
    setSearchingBarValue(newSearchValue)
  }

  useEffect(() => {
    async function getProductsData (token) {
      try {
        const products = await fetchProducts(token);
        
        dispatch(updateProducts(products))
        return 
      } catch (error) {
        
      }
    }

    getProductsData(user.token)
  }, [])

  return (
    <AuthPageManager>
      <AuthPageNavbar onSearchUpdate={onSearchUpdate} />
      <LoadingOverlay message={"Loading..."} />
      <main className="w-full flex flex-col items-center px-2 pb-10">
        <div className="text-thirdColor text-[30px] mt-10 mb-10 text-center">
          <DashboardTitle
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
                  <ArticleCard data={productData} key={productData.productId}/>
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