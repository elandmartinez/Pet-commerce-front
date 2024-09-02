"use client"

import Image from "next/image"
import React from "react"
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { updateLastPageVisited } from "@/lib/store/slices/lastPageVisitedSlice";

//make a toast appear every time a product is added to the cart

export default function ArticleCard ({data, setLoadingOverlayStatus}) {
  const currentPath = window.location.pathname.split("/")[1]
  const dispatch = useDispatch()
  const router = useRouter()

  const carouselItemStylesClass = "carousel-item"

  return (
      <article
        onClick={() => {
          setLoadingOverlayStatus({active: true})
          dispatch(updateLastPageVisited(currentPath))
          router.push(`${ROUTES.PRODUCT}/${data.productId}`)
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