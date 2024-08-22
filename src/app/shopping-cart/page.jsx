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
import { udpdateOrderProductIds } from "@/lib/store/slices/orderProductsIdsSlice";
import { updateOrders } from "@/lib/store/slices/ordersSlice";
import Footer from "../components/Footer/Footer";
import AuthPageManager from "../middlewareComponents/AuthPageManager";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay";

function CartProducts ({setLoadingOverlayStatus, cartProducts, handleDeleteProduct, totalProductsPrice}) {
  const dispatch = useDispatch()
  const router = useRouter()
  return (
    <>
      {cartProducts?.map((product, index) => (
        <article key={index} className= "relative w-full rounded-xl bg-hoverColor my-4 p-3 px-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="w-full flex items-center justify-between text-end sm:text-start">
            <Image className="rounded-xl" src={product.imageUrl} alt={product.name} width={100} height={60} />
            <div className="flex flex-col justify-between ml-4">
              <p className="sm:mb-3">{product.name}</p>
              <p className="text-ocre">${product.price}</p>
            </div>
          </div>
          <div className="w-full flex justify-between items-center p-2 my-2">
            <p className="text-secondaryColor">Amount: {product.amountInTheCart}</p>
            <div onClick={() => {handleDeleteProduct(product.productId)}} className="p-2 transition-all rounded-full hover:bg-warningHoverColor">
              <DeleteIcon sx={{fill: "var(--red)"}}/>
            </div>
          </div>
        </article>
      ))}
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
            const orderProductIds = cartProducts.map(product => product.productId)
            setLoadingOverlayStatus(true)
            dispatch(udpdateOrderProductIds(orderProductIds))
            router.push(ROUTES.PAYMENTS)
          }}
        >
          Buy products
        </Button>
      </div>
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
          <div className="w-[90%] max-w-[700px] mt-6 mb-16 p-6 sm:p-6 mx-auto rounded-xl bg-white shadow-xl shadow-hoverColor sm:w-[90%] lg:w-[80%]" >
            {!isCartEmpty ? <CartProducts setLoadingOverlayStatus={setLoadingOverlayStatus} cartProducts={cartProductsState} handleDeleteProduct={handleDeleteProduct} totalProductsPrice={totalProductsPrice} /> : <NoCartProducts />}
          </div>
        </div>
      </main>
      <Footer />
    </AuthPageManager>
  )
}