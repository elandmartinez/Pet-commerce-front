"use client"

import { ErrorMessage, Form, Formik } from "formik"
import AuthPageNavbar from "../components/AuthPageNavbar/AuthPageNavbar"
import { DEFAULT_ORDER_STATUS, PAYMENT_FORM_INITIAL_VALUES, ROUTES } from "@/utils/constants";
import { paymentFormSchema } from "@/utils/schemas";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { postOrder } from "@/lib/services";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { cleanOrderProducts } from "@/lib/store/slices/orderProductsSlice";
import { cleanCartProducts } from "@/lib/store/slices/cartProductsSlice";
import Footer from "../components/Footer/Footer";
import AuthPageManager from "../middlewareComponents/AuthPageManager";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay";
import { useState } from "react";
import { updateIsRedirecting } from "@/lib/store/slices/isRedirectingSlice";
import ErrorPage from "../components/ErrorPage/ErrorPage";

export default function Payment () {
  const [loadingOverlayStatus, setLoadingOverlayStatus] = useState(false)
  const router = useRouter()
  const orderProducts = useSelector(state => state.orderProducts)
  const user = useSelector(state => state.user)
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

  console.log({orderProducts})

  return (
    <AuthPageManager>
      <ToastContainer />
      <AuthPageNavbar setLoadingOverlayStatus={setLoadingOverlayStatus} />
      <LoadingOverlay active={loadingOverlayStatus} />
      <main className="w-full pb-10 text-mainColor min-h-[60%]">
        <div className="w-[90%] max-w-[400px] p-8 pt-[20px] mt-[100px] mb-16 bg-white rounded-xl mx-auto ">
          <Formik
            initialValues={PAYMENT_FORM_INITIAL_VALUES}
            validationSchema={paymentFormSchema}
            onSubmit={async (values, {setSubmitting}) => {
              setSubmitting(false)
              const currentDate = new Date()
              const purchaseDate = `${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()}`
              const cardLastFourNumbers = values.paymentCardNumber.split(' ')[2]
              const orderData = {
                purchaseDate,
                status: DEFAULT_ORDER_STATUS,
                cardOwnerName: values.paymentCardOwnerName,
                cardLastFourNumbers,
                clientId: user.email,
                orderProducts: orderProducts
              }
              orderData.orderProducts = JSON.stringify(orderData.orderProducts)

              try {
                debugger
                setLoadingOverlayStatus(true)
                await postOrder(orderData, user.token)
                toast.success("Your Order was processed succesfully")
                setLoadingOverlayStatus(false)

                dispatch(cleanOrderProducts())
                dispatch(cleanCartProducts())
                setTimeout(() => {
                  router.push(ROUTES.DASHBOARD)
                }, 3000)
              } catch (error) {
                setLoadingOverlayStatus(false)
                throw new Error(error)
              }
            }}
          >
            {({isSubmitting, setValues, values}) => (
              <Form className="w-full">
                <div className="w-full flex flex-col items-center">
                  <h2 className="text-[25px] mb-4">Address</h2>
                  <div className="w-full">

                    <div className="my-1 w-full">
                      <TextField
                        className="w-full"
                        id="addressStreet"
                        name="addressStreet" type="name" label="street" variant="standard"
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setValues({...values, addressStreet: newValue})
                        }}
                        value={values.addressStreet}
                      />
                      <ErrorMessage className="mt-1 text-warningColor" name="addressStreet" component="div" />
                    </div>

                    <div className="my-1 w-full">
                      <TextField
                        className="w-full"
                        id="addresCity"
                        name="addresCity" type="name" label="city" variant="standard"
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setValues({...values, addressCity: newValue})
                        }}
                        value={values.addressCity}
                      />
                      <ErrorMessage className="mt-1 text-warningColor" name="addressCity" component="div" />
                    </div>

                    <div className="my-1 w-full">
                      <TextField
                        className="w-full"
                        id="addressRegion"
                        name="addressRegion" type="name" label="Region" variant="standard"
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setValues({...values, addressRegion: newValue})
                        }}
                        value={values.addressRegion}
                      />
                      <ErrorMessage className="mt-1 text-warningColor" name="addressRegion" component="div" />
                    </div>

                    <div className="my-1 w-full">
                      <TextField
                        className="w-full"
                        id="addressCountry"
                        name="addressCountry" type="name" label="Address country" variant="standard"
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setValues({...values, addressCountry: newValue})
                        }}
                        value={values.addressCountry}
                      />
                      <ErrorMessage className="mt-1 text-warningColor" name="addressCountry" component="div" />
                    </div>
                  </div>

                  <h2 className="text-[25px] mb-4 mt-10">Payment Data</h2>
                  <div className="w-full">
                    <div className="my-1 w-full">
                      <TextField
                        className="w-full"
                        id="paymentCardNumber"
                        name="paymentCardNumber" type="name" label="card number" variant="standard"
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setValues({...values, paymentCardNumber: newValue})
                        }}
                        value={values.paymentCardNumber}
                      />
                      <ErrorMessage className="mt-1 text-warningColor" name="paymentCardNumber" component="div" />
                    </div>

                    <div className="my-1 w-full">
                      <TextField
                        className="w-full"
                        id="paymentCardOwnerName"
                        name="paymentCardOwnerName" type="name" label="owner name" variant="standard"
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setValues({...values, paymentCardOwnerName: newValue})
                        }}
                        value={values.paymentCardOwnerName}
                      />
                      <ErrorMessage className="mt-1 text-warningColor" name="paymentCardOwnerName" component="div" />
                    </div>

                    <div className="my-1 w-full">
                      <TextField
                        className="w-full"
                        id="paymentCardCVV"
                        name="paymentCardCVV" type="number" label="CVV" variant="standard"
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setValues({...values, paymentCardCVV: newValue})
                        }}
                        value={values.paymentCardCVV}
                      />
                      <ErrorMessage className="mt-1 text-warningColor" name="paymentCardCVV" component="div" />
                    </div>

                    <div className="my-1 w-full">
                      <TextField
                        className="w-full"
                        id="paymentCardExpirationDate"
                        name="paymentCardExpirationDate" type="name" label="expiration date" variant="standard"
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setValues({...values, paymentCardExpirationDate: newValue})
                        }}
                        value={values.paymentCardExpirationDate}
                      />
                      <ErrorMessage className="mt-1 text-warningColor" name="paymentCardExpirationDate" component="div" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className=" p-2 px-4 mt-10 bg-secondaryBgColor rounded-lg text-thirdColor font-bold text-lg
                    hover:bg-thirdColor hover:text-secondaryBgColor transition-all"
                    disabled={isSubmitting}
                  >
                    Complete Process
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </main>
      <Footer />
    </AuthPageManager>
  )
}