"use client"

import { useEffect, useState } from "react"
import AuthPageNavbar from "../components/AuthPageNavbar/AuthPageNavbar"
import { useDispatch, useSelector } from "react-redux"
import { fetchOrdersByClientId } from "@/lib/services"
import { udpdateOrders } from "@/lib/store/slices/orderProductsIdsSlice"
import { ROUTES } from "@/utils/constants"
import { useRouter } from "next/navigation"
import { updateOrders } from "@/lib/store/slices/ordersSlice"

const NoOrdersFoundComponent = function () {
  return (
    <>
      <h1 className="text-center font-bold">You dont have any orders yet</h1>
    </>
  )
}

const OrdersComponent = function ({ orders, router }) {
  console.log({orders})
  return (
    <>
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
    const userId = userData.email;
    async function getOrdersByClientId(clientId, token) {
      const newOrders = await fetchOrdersByClientId(clientId, token)
      console.log({newOrders})

      dispatch(updateOrders(newOrders))
      setOrderData(newOrders)

      if(newOrders !== orders) dispatch(udpdateOrders(newOrders))
    }

    getOrdersByClientId(userId, userData.token)
  }, [])

  return (
    <>
      <AuthPageNavbar />
      <main className="w-full min-h-[100%] pt-[100px]">
        <h1 className="text-[20px] font-bold text-center">My Orders</h1>
        <div className="w-[90%] max-w-[500px] mt-6 mb-16 p-2 sm:p-6 mx-auto rounded-xl bg-white shadow-xl shadow-hoverColor sm:w-[90%] lg:w-[80%]">
          {(orderData || orders) ? <OrdersComponent orders={orderData} router={router}/> : <NoOrdersFoundComponent />}
        </div>
      </main>
    </>
  )
}