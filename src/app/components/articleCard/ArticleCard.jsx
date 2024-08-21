"use client"

import Image from "next/image"
import React from "react"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch } from "react-redux";
import { addProductToCart } from "@/lib/store/slices/cartProductsSlice";
import { useRouter } from "next/navigation";
import { ROUTES, redirectAndDisplayLoadingOverlay } from "@/utils/constants";
import { updateLoadingOverlayValue } from "@/lib/store/slices/loadingOverlaySlice";


//make a toast appear every time a product is added to the cart

export default function ArticleCard ({data, isInCarousel}) {
  const router = useRouter()
  const dispatch = useDispatch()

  const carouselItemStylesClass = "carousel-item"
  //  var shouldApplyCarouselItemStyles = false
  //  if(isInCarousel) shouldApplyCarouselItemStyles = true

  return (
      <article
        onClick={() => {
          //router.push(`${ROUTES.PRODUCT}/${data.productId}`)
          redirectAndDisplayLoadingOverlay(
            router,
            `${ROUTES.PRODUCT}/${data.productId}`,
            dispatch,
            updateLoadingOverlayValue,
            {acive:true}
          )
        }}
        className={`product-article relative flex flex-col justify-start min-w-[200px] h-[250px] rounded-lg bg-white shadow shadow-hoverColor mx-1 pb-4 my-4 border border-hoverColor ${carouselItemStylesClass}`}>
        <div className="w-full h-[62%] border-b-[4px] border-secondaryBgColor bg-hoverColor text-shadowColor flex justify-center items-center rounded-t-lg">
          <Image 
            src={data?.imageUrl}
            width={200}
            height={170}
            className="w-full h-full rounded-t-lg rounded-b-none object-contain"
            alt={data?.name}
          />
        </div>
        <div className="w-full h-[38%] text-[25px] px-4 pt-2">
          <div className="w-full flex justify-between">
            <p className="price-text font-light">${data?.price}</p>
          </div>
          <p className="text-bold text-[15px] text-secondaryColor h-[45px] truncate-2-lines">{data?.name}</p>
        </div>
      </article>
  )
}