"use client"
import AuthPageNavbar from "@/app/components/AuthPageNavbar/AuthPageNavbar"
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import PersonIcon from '@mui/icons-material/Person';
import { PRODUCT_AMOUNT_CHANGE_ACTIONS, ROUTES } from "@/utils/constants";
import ArticleCard from "@/app/components/articleCard/ArticleCard";
import { fetchReviewsByProductId } from "@/lib/services";
import { updateProductReviews } from "@/lib/store/slices/productReviewsSlice";
import { addProductToCart } from "@/lib/store/slices/cartProductsSlice";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Footer from "@/app/components/Footer/Footer";
import AuthPageManager from "@/app/middlewareComponents/AuthPageManager";
import LoadingOverlay from "@/app/components/LoadingOverlay/LoadingOverlay";
import { updateIsRedirecting } from "@/lib/store/slices/isRedirectingSlice";
import ErrorPage from "@/app/components/ErrorPage/ErrorPage";
import { updateLastPageVisited } from "@/lib/store/slices/lastPageVisitedSlice";

const NoReviewsFoundComponent = function () {
  return (
    <>
      <h1 className="text-center text-lg font-light">No reviews found, buy this product and be the first to leave a review!</h1>
    </>
  )
}

const ReviewsComponent = function ({ reviews }) {


  return (
    <>
      {reviews.map((reviewData, index) => {
        return (
          <div className="w-full bg-white rounded-xl p-6 mb-8" key={index}>
            <div className="w-full flex items-center mb-6">
              <div className="w-8 h-8 bg-hoverColor rounded-full mr-4 flex justify-center items-center">
                <PersonIcon />
              </div>
              <h2 className="mx-2 text-secondaryColor">{reviewData.username}</h2>
              <p>rate: {reviewData.score}</p>
            </div>
            <p>
              {reviewData.description}
            </p>
          </div>
        )
      })}
    </>
  )
}


//change product stock (UPDATE) in db when an order is completed

export default function Page ({params}) {
  const [loadingOverlayStatus, setLoadingOverlayStatus] = useState(false)
  const [productReviews, setRpoductReviews] = useState([]);
  const [productAmountToBuy, setProductAmountToBuy] = useState(0)
  const router = useRouter();
  const { token: userToken } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  const localProductData = products.find(product => product.productId === parseInt(params.id))
  const areThereProductReviews = productReviews.length > 0
  const isRedirecting = useSelector(state => state.isRedirecting)

  //function that handles the set of the state productAmountToBuy, it makes sure that the amount is not higher that the current stock, and not lower than 0
  function handleProductAmountToBuyChange (action) {
    switch(action) {
      case "ADD":
        if(productAmountToBuy === localProductData.stock) return
        setProductAmountToBuy(productAmountToBuy + 1)
        break;
      case "REMOVE":
        if(productAmountToBuy === 0) return
        setProductAmountToBuy(productAmountToBuy - 1)
        break;
      default:
    }
  }

  function handleBuyProductsButton () {
    if(productAmountToBuy === 0) {
      toast.error("Amount selected for product is 0, please set at least 1")
      return
    }
    setLoadingOverlayStatus(true)
    dispatch(addProductToCart({productData: localProductData, amountToAdd: productAmountToBuy}))
    dispatch(updateLastPageVisited(ROUTES.PRODUCT))
    router.push(`${ROUTES.SHOPPING_CART}`)

  }


  function handleAddToCartButton () {
    if(productAmountToBuy === 0) {
      toast.error("Amount selected for product is 0, please set at least 1")
      return
    }
    dispatch(addProductToCart({productData: localProductData, amountToAdd: productAmountToBuy}))
    toast.success("The product was added to the cart")
  }


  //here i get the products with the same category to display them on the "related products" section below
  const relatedProducts = products.filter(product => {
    if(product.productId === localProductData.productId) return false
    return product.category === localProductData.category
  })

  //here in the useffect we create a function that calls the service for fetching product reviews,
  //after getting them, we set it into the local "productReviews" state
  useEffect(() => {
    const productId = localProductData.productId
    async function getProductReviews(productId, token) {
      try {
        const reviews = await fetchReviewsByProductId(productId, token)
        const productReviews = reviews.filter(review => review.productId === productId)

        dispatch(updateProductReviews(productReviews))
        setRpoductReviews(productReviews)

      } catch (error) {
        throw new Error(error)
      }
    }

    getProductReviews(productId, userToken)
  }, [dispatch, localProductData?.productId, userToken])

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
      <ToastContainer />
      <AuthPageNavbar setLoadingOverlayStatus={setLoadingOverlayStatus} />
      <LoadingOverlay active={loadingOverlayStatus}/>
      <main className="w-full pb-10 min-h-[60%]">
        {/* product card container */}
        <div className="w-[95%] max-w-[1000px] mt-16 mb-16 p-2 mx-auto rounded-xl bg-white shadow-xl shadow-hoverColor, sm:flex sm:w-[90%] lg:w-[80%]">
          <div className="flex flex-col sm:pr-4 sm:border-r border-shadowColor sm:w-[45%]">
            {/* product image */}
            <div className="w-full max-w-[400px] rounded-xl flex justify-center mx-auto mb-6">
              <Image src={localProductData.imageUrl} alt={localProductData.name} width={400} height={400}
                className="rounded-xl object-contain" priority
              />
            </div>

            <div>
              <div className="w-[100px] mx-auto rounded-xl border border-mainColor flex justify-evenly items-center">
                <button className="clickable w-full h-full rounded-l-xl" onClick={() => {handleProductAmountToBuyChange(PRODUCT_AMOUNT_CHANGE_ACTIONS.REMOVE)}}>
                  <RemoveIcon className="p-2 rounded-l-xl" />
                </button>
                <p className="py-2 px-4 border-x border-mainColor">{productAmountToBuy}</p>
                <button className="clickable w-full h-full rounded-r-xl" onClick={() => {handleProductAmountToBuyChange(PRODUCT_AMOUNT_CHANGE_ACTIONS.ADD)}}>
                  <AddIcon className="p2 reounded-r-xl" />
                </button>
              </div>
              <p className="pt-2 text-center">In stock: {localProductData.stock}</p>
            </div>

            {/* buy button and addToCart button */}
            <div className="w-full my-4 flex flex-col items-center font-normal">
              <div className="mb-2 w-[95%]" onClick={() => {handleBuyProductsButton()}}>
                <Button
                  sx={{
                    backgroundColor: "var(--third-color)",
                    color: "white",
                    width: "100%",
                    height: "60px",
                    fontWeight: "700",
                    transition: "all 200ms",
                    ":hover": {
                      backgroundColor: "var(--third-color)",
                      color: "var(--secondary-bg-color)",
                      scale: "1.01"
                    }
                  }}
                >
                  <p className="mr-2">Buy product</p>
                  <ShoppingCartCheckoutIcon sx={{marginLeft: "10"}}/>
                </Button>
              </div>
              <div className="w-[95%]" onClick={() => {handleAddToCartButton()}}>
                <Button
                  sx={{
                    backgroundColor: "var(--secondary-color)",
                    color: "white",
                    width: "100%",
                    height: "60px",
                    fontWeight: "700",
                    transition: "all 200ms",
                    ":hover": {
                      backgroundColor: "var(--secondary-color)",
                      color: "var(--secondary-bg-color)",
                      scale: "1.01"
                    }
                  }}
                >
                  <p className="mr-2">Add to cart</p>
                  <AddShoppingCartIcon />
                </Button>
              </div>
            </div>
          </div>

          {/* product basic info */}
          <div className="w-full p-4 sm:border-l border-shadowColor sm:ml-6 sm:w-[55%]">
            <h1 className="text-[40px] sm:text-[50px] xl:text-[60px] text-secondaryBgColor">${localProductData.price}</h1>
            <h1 className="text-[25px]">{localProductData.name}</h1>
            <p className="text-secondaryBgColor mt-2">Rate: 4.5/5</p>
            <div className="w-full mt-6 rounded-xl bg-hoverColor text-secondaryColor p-4">

              {/* description */}
              <h2 className="text-[20px] font-bold mb-4">Description</h2>
              <p className="font-normal" >{localProductData.description}</p>
              

              {/* Features */}
              <div className="mt-6 w-full ">
                <h2 className="text-[18px] font-bold">Features</h2>
                <ul className="p-6 list-disc">
                  <li>
                    <span className="font-bold">Dimensions: </span>
                    {localProductData.dimensions}
                  </li>
                  <li>
                    <span className="font-bold">Expiration date: </span>
                    {localProductData.expirationDate || " ' ' "}
                  </li>
                  <li>
                    <span className="font-bold">Elaboration date: </span>
                    {localProductData.elaborationDate}
                  </li>
                  <li>
                    <span className="font-bold">Category: </span>
                    {localProductData.category}
                  </li>
                  <li>
                    <span className="font-bold">Provider: </span>
                    {localProductData.provider}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* related products section */}
        <section className="w-[95%] max-w-[1000px] mt-16 mb-16 p-2 pb-8 mx-auto rounded-xl bg-white shadow-xl shadow-hoverColor sm:w-[90%] lg:w-[80%]">
          <h1 className="text-[20px] text-center mt-4" >Related products</h1>
          <div className="carousel w-full overflow-x-scroll flex py-4">
              {relatedProducts.map((product, index) => (
                <ArticleCard data={product} isInCarousel={true} key={index} setLoadingOverlayStatus={setLoadingOverlayStatus}/>
              ))}
          </div>
        </section>

        {/* reviews section */}
        <section className="w-[95%] max-w-[1000px] mt-10 mb-16 p-2 mx-auto sm:w-[90%] lg:w-[80%]">
          {/* title */}
          <div className="flex w-full items-center mb-10">
            <div className="w-full h-[1px] border border-shadow bg-secodaryColor"></div>
            <h1 className="text-[25px] text-center px-1">Reviews</h1>
            <div className="w-full h-[1px] border border-shadow bg-secondaryColor"></div>
          </div>

          {areThereProductReviews ? <ReviewsComponent reviews={productReviews} /> : <NoReviewsFoundComponent />}
        </section>

      </main>
      <Footer />
    </AuthPageManager>
  )
}