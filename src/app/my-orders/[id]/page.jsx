"use client"

import AuthPageNavbar from "@/app/components/AuthPageNavbar/AuthPageNavbar"
import ErrorPage from "@/app/components/ErrorPage/ErrorPage"
import Footer from "@/app/components/Footer/Footer"
import LoadingOverlay from "@/app/components/LoadingOverlay/LoadingOverlay"
import AuthPageManager from "@/app/middlewareComponents/AuthPageManager"
import { fetchProduct } from "@/lib/services"
import { updateIsRedirecting } from "@/lib/store/slices/isRedirectingSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Page ({params}) {
  const [loadingOverlayStatus, setLoadingOverlayStatus] = useState(false)
  const [orderProducts, setOrderProducts] = useState()
  const {token: userToken} = useSelector(state => state.user)
  const orders = useSelector(state => state.orders)
  const dispatch = useDispatch()
  const isRedirecting = useSelector(state => state.isRedirecting)

  const localOrderData = orders.find(order => order.orderId === parseInt(params.id)) || {}

  useEffect(() => {
    async function getOrderProducts() {
      const productFetches = []
      localOrderData.productsIds.forEach(async productId => {
        const productFetch = fetchProduct(userToken, productId)
        productFetches.push(productFetch)
      });

      const productOrders = await Promise.all([...productFetches])
      setOrderProducts(productOrders)
    }

    getOrderProducts()
  }, [localOrderData.productsIds, userToken])

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
      <LoadingOverlay active={loadingOverlayStatus} />
      <main className="w-full min-h-[60%] pt-[100px]">
        <h1 className="mt-16 mb-4 text-center text-mainColor text-[25px]">Order No. {localOrderData.orderId}</h1>
        <div className="w-[90%] max-w-[500px] mb-16 p-4 mx-auto rounded-xl bg-white shadow-xl shadow-hoverColor sm:w-[90%]">
          <div className="w-full flex justify-between">
            <div className="h-full w-[45%] flex flex-col justify-between">
              <h1 className="min-h-[70px] my-2 text-[17px] flex flex-col">Purchase date: <span className="text-secondaryColor">{localOrderData.purchaseDate}</span></h1>
              <h2 className="min-h-[70px] my-2 text-[17px] flex flex-col">Status: <span className="text-secondaryColor">{localOrderData.status}</span></h2>
            </div>
            <div className="h-full w-[45%] flex flex-col justify-between">
              <h2 className="min-h-[70px] my-2 text-[17px] flex flex-col">Card owner name: <span className="text-secondaryColor">{localOrderData.cardOwnerName}</span></h2>
              <h2 className="min-h-[70px] my-2 text-[17px] flex flex-col">Card last four numbers: <span className="text-secondaryColor">{localOrderData.cardLastFourNumbers}</span></h2>
            </div>
          </div>
          <div className="w-full">
            <h1 className="text-secondaryColor text-[20px] text-center my-4">Order products</h1>
            <div className="w-full">
              {orderProducts?.map((product, index) => {
                return (
                  <div key={index} className="w-full bg-hoverColor rounded-xl my-3 px-4 py-6 flex justify-between sm:justify-evenly items-start">
                    <p className="text-[15px] max-w-[150px] flex flex-col">Name: <span className="text-secondaryColor">{product.name}</span></p>
                    <div>
                      <p className="mx-1 mb-2 flex flex-col">Price: <span className="text-secondaryColor">{product.price}</span></p>
                      <p className="mx-1 flex flex-col">Provider: <span className="text-secondaryColor">{product.provider}</span></p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </AuthPageManager>
  )
}