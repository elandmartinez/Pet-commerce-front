"use client"

import AuthPageNavbar from "@/app/components/AuthPageNavbar/AuthPageNavbar"
import Footer from "@/app/components/Footer/Footer"
import ArticleCard from "@/app/components/articleCard/ArticleCard"
import { Roboto } from "next/font/google"
import { useSelector } from "react-redux"

const roboto = Roboto({
  weight: ["100", "300", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"]
})

export default function Page({params}) {
  const products = useSelector(state => state.products)
  const category = params.category

  const categoryProducts = products.filter(product => product.category === category)
  return (
    <>
      <AuthPageNavbar />
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
    </>
  )
}