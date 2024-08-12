"use client"

import { useEffect, useState } from "react"
import AuthPageNavbar from "../components/AuthPageNavbar/AuthPageNavbar"
import { useDispatch, useSelector } from "react-redux"
import { fetchOrdersByClientId } from "@/lib/services"
import { ROUTES } from "@/utils/constants"
import { useRouter } from "next/navigation"
import { updateOrders } from "@/lib/store/slices/ordersSlice"
import Footer from "../components/Footer/Footer"
import AuthPageManager from "../middlewareComponents/AuthPageManager"

const NoOrdersFoundComponent = function () {
  return (
    <>
      <h1 className="text-center text-secondaryColor text-[30px] font-thin">You dont have any orders yet</h1>
    </>
  )
}

const OrdersComponent = function ({ orders, router }) {
  return (
    <>
    <div className="min-w-[400px] flex flex-col items-center px-2">
      {orders.map((order, index) => (
        <article
          onClick={() => {
            router.push(`${ROUTES.MY_ORDERS}/${order.orderId}`)
          }}
          key={index} className="w-full bg-hoverColor rounded-xl p-2 px-4 my-4 flex justify-between items-center transition hover:scale-[1.02]"
        >
          <p className="text-[15px] font-bold">
            {order.purchaseDate}
            <span className="text-[15px] text-ocre ml-2">{order.status}</span>
          </p>
          
          <p className="font-bold">
          {order.cardLastFourNumbers}
          </p>
        </article>            
        ))}
      </div>
    </>
  )
}

export default function MyOrders () {
  const [orderData, setOrderData] = useState([])
  const dispatch = useDispatch()
  const router = useRouter()
  const orders = useSelector(state => state.orders)
  const userData = useSelector(state => state.user)
  useEffect(() => {
    const customerId = userData.id;
    async function getOrdersByClientId(clientId, token) {

      //java server app way to get new orders
      const newOrders = await fetchOrdersByClientId(clientId, token)
      
      //node.js server app way to get new Orders
      /* const {body: newOrders} = await fetchOrdersByClientId(clientId, token) */

      dispatch(updateOrders(newOrders))
      setOrderData(newOrders)

      if(newOrders !== orders) dispatch(updateOrders(newOrders))
    }

    getOrdersByClientId(customerId, userData.token)
  }, [])

  const areThereOrders = orders.length > 0 || orderData.length > 0

  return (
    <AuthPageManager>
      <AuthPageNavbar />
      <main className="w-full min-h-[60%] pt-[100px]">
        <h1 className="text-[20px] font-bold text-center">My Orders</h1>
        <div className="w-[90%] max-w-[500px] mt-6 mb-16 p-2 sm:p-6 mx-auto rounded-xl bg-white shadow-xl shadow-hoverColor sm:w-[90%] lg:w-[80%]">
          {areThereOrders ? <OrdersComponent orders={orderData} router={router}/> : <NoOrdersFoundComponent />}
        </div>
      </main>
      <Footer />
    </AuthPageManager>
  )
}