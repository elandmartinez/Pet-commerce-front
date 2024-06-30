"use client"

import { Pacifico, Roboto } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import AuthPageNavbar from "../components/AuthPageNavbar/AuthPageNavbar";
import ArticleCard from "../components/articleCard/ArticleCard";
import { getProducts } from "@/services/productService";
import { useEffect, useState } from "react";
import { updateProducts } from "@/lib/store/slices/productsSlice";

const roboto = Roboto({
  weight: ["100", "300", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"]
})

export default function Dashboard () {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    async function getProductsData (token) {
      try {
        const products = await getProducts(token);
        
        dispatch(updateProducts(products))
        return 
      } catch (error) {
        
      }
    }

    getProductsData(user.token)
  }, [])

  return (
    <>
      <AuthPageNavbar />
      <main className="w-full h-full flex flex-col items-center px-2 pb-10">
        <div className="text-thirdColor text-[30px] mt-10 mb-10 text-center" >
          <h1 className="text-[30px] mb-6" >What does your pet need today?</h1>
          <h2 className="text-[20px]" >We have for you...</h2>
        </div>
        <div className={`${roboto.className} w-full grid-styles`}>
          {
            products
            ?
            (
              products?.map((productData) => {
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
    </>
  )
}