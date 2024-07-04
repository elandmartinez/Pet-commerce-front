"use client"

import Image from "next/image"
import React from "react"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch } from "react-redux";
import { addProductToCart } from "@/lib/store/slices/cartProductsSlice";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/constants";


//make a toast appear every time a product is added to the cart

export default function ArticleCard ({data, isInCarousel}) {
  const router = useRouter()
  const dispatch = useDispatch()

  const carouselItemStylesClass = "carousel-item"
  var shouldApplyCarouselItemStyles = false
  if(isInCarousel) shouldApplyCarouselItemStyles = true

  return (
      <article
        onClick={(e) => {
          router.push(`${ROUTES.PRODUCT}/${data.productId}`)
        }}
        className={`product-article relative flex flex-col justify-start min-w-[200px] h-[250px] rounded-lg bg-white shadow shadow-hoverColor mx-1 pb-4 my-2 border border-hoverColor ${carouselItemStylesClass}`}>
         <div className="add-product-icon absolute top-2 right-2 rounded-full shadow-xl border-[0.5px] border-hoverColor shadow-hoverColor p-1 bg-white" >
          <AddShoppingCartIcon
            sx={{
              transition: "all 200ms",
              fill: "var(--secondary-bg-color)",
              ":active": {
                fill: "var(--white)"
              }
            }}
            onClick={(e) => {
              dispatch(addProductToCart({productData: data, amountToAdd: 1}))
            }}
          />
        </div>
        <div className="w-full h-[62%] bg-hoverColor text-shadowColor flex justify-center items-center rounded-t-lg">
          <Image 
            src={data?.imageUrl}
            width={200}
            height={170}
            className="w-full h-full rounded-t-lg rounded-b-none"
            alt={data?.name}
          />
        </div>
        <div className="w-full text-[25px] px-4 pt-2">
          <p className="price-text font-light">${data?.price}</p>
          <p className="text-bold text-[15px] text-secondaryColor h-[45px] truncate-2-lines">{data?.name}</p>
        </div>
      </article>
  )
}