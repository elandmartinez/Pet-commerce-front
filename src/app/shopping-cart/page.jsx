'use client'

import { useDispatch, useSelector } from "react-redux"
import AuthPageNavbar from "../components/AuthPageNavbar/AuthPageNavbar"
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Image from "next/image"
import { Button } from "@mui/material";
import { useState } from "react";
import { updateCartProducts } from "@/lib/store/slices/cartProductsSlice";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/constants";
import { udpdateOrderProducts } from "@/lib/store/slices/orderProductsSlice";
import Footer from "../components/Footer/Footer";
import AuthPageManager from "../middlewareComponents/AuthPageManager";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay";
import { updateIsRedirecting } from "@/lib/store/slices/isRedirectingSlice";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import { updateLastPageVisited } from "@/lib/store/slices/lastPageVisitedSlice";

function CartProducts ({setLoadingOverlayStatus, cartProducts, handleDeleteProduct, totalProductsPrice}) {
  const dispatch = useDispatch()
  const isRedirecting = useSelector(state => state.isRedirecting)

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
    <>
      {cartProducts?.map((product, index) => (
        <article key={index} className="relative w-full max-h-[500px] rounded-xl bg-hoverColor my-4 py-4 px-4
        sm:px-10">

          <div className="w-full h-full mx-auto flex flex-col justify-between">
            <div className="w-full h-full">

              <div className="w-full bg-hoverColor text-shadowColor flex justify-center items-center rounded-t-lg">
                <Image 
                  src={product?.imageUrl}
                  width={150}
                  height={120}
                  className="w-full h-[300px] rounded-t-lg rounded-b-none object-contain sm:max-w-[150px] sm:max-h-[]"
                  alt={product?.name}
                />
              </div>


            </div>
              <div className="h-full flex flex-col justify-between text-[20px] font-bold ml-1">
                <p className="text-[22px] mt-2">{product.name}</p>
                <p className="text-ocre">Price: ${product.price}</p>
              </div>

            <div className="w-full flex justify-between items-center self-end">

              <p className="text-secondaryColor">Amount: {product.amountInTheCart}</p>

              <div onClick={() => {handleDeleteProduct(product.productId)}} className="p-2 transition-all rounded-full hover:bg-warningHoverColor">
                <DeleteIcon sx={{fill: "var(--red)"}}/>
              </div>
            </div>
          </div>

        </article>
      ))}
    </>
    
  )
}

function NoCartProducts () {
  return (
    <div className="min-h-[300px] w-full flex flex-col items-center justify-center">
      <ShoppingCartIcon sx={{width: "100%", height: "100%", maxWidth: "400px", fill: "var(--background-transparent-gray)"}}/>
      <h2 className="text-[20px] text-center text-shadowColor">No products in the cart</h2>
    </div>
  )
}

export default function ShoppingCart () {
  const router = useRouter()
  const [loadingOverlayStatus, setLoadingOverlayStatus] = useState(false)
  const cartProducts = useSelector(state => state.cartProducts)
  const dispatch = useDispatch()
  const [cartProductsState, setCartProductsState] = useState(cartProducts)
  const totalProductsPrice = cartProducts.reduce((acc, curr) => {
    return acc += (curr.price * curr.amountInTheCart)
  }, 0).toFixed(2)

  function handleDeleteProduct (productId) {
    const updatedCartProducts = [] 
    cartProductsState.forEach(product => {
      const newProduct = {...product} 
      if(productId === newProduct.productId) {
        if(newProduct.amountInTheCart === 1) return
        newProduct.amountInTheCart = product.amountInTheCart - 1
      } 
      updatedCartProducts.push(newProduct)
    });
    setCartProductsState(updatedCartProducts)
    dispatch(updateCartProducts(updatedCartProducts))
  }

  const isCartEmpty = cartProductsState.length === 0
  return (
    <AuthPageManager>
      <AuthPageNavbar setLoadingOverlayStatus={setLoadingOverlayStatus} />
      <LoadingOverlay active={loadingOverlayStatus} />
      <main className="w-full min-h-[60%]" >
        <div className="w-full min-h-[100%] pt-[100px] mb-16" >
          <h1 className="text-[20px] font-bold text-center" >My Articles</h1>
          <div className="w-[90%] max-w-[550px] mt-6 mb-16 p-6 sm:p-6 mx-auto rounded-xl bg-white shadow-xl shadow-hoverColor sm:w-[90%] lg:w-[80%]
            md:max-w-[900px]
            2xl:max-w-[1330px]">

            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 md:gap-4 2xl:grid-cols-3" >
              {!isCartEmpty ? <CartProducts setLoadingOverlayStatus={setLoadingOverlayStatus} cartProducts={cartProductsState} handleDeleteProduct={handleDeleteProduct} totalProductsPrice={totalProductsPrice} /> : <NoCartProducts />}
            </div>
            <div className="mt-10">
              <p className="font-bold text-[20px] text-ocre text-center mb-8">Total Price: ${totalProductsPrice}</p>
              <Button sx={{
                  width: "100%",
                  height: "50px",
                  fontWeight: "700", 
                  backgroundColor: "var(--secondary-bg-color)",
                  ":hover": {
                    backgroundColor: "var(--shadow-color)"
                    }
                }}
                onClick={() => {
                  const orderProducts = cartProducts.map(product => {
                    return {
                      productId: product.productId,
                      amount: product.amountInTheCart
                    }
                  })

                  setLoadingOverlayStatus(true)
                  dispatch(udpdateOrderProducts(orderProducts))
                  dispatch(updateLastPageVisited(ROUTES.SHOPPING_CART))
                  router.push(ROUTES.PAYMENTS)
                }}
              >
                Buy products
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </AuthPageManager>
  )
}