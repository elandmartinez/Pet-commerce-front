'use client'

import { updateLoadingOverlayValue } from "@/lib/store/slices/loadingOverlaySlice"
import { ROUTES, redirectAndDisplayLoadingOverlay } from "@/utils/constants"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"

export default function Home () {
  const router = useRouter() 
  const dispatch = useDispatch()

  redirectAndDisplayLoadingOverlay(router, ROUTES.LOGIN, dispatch, updateLoadingOverlayValue, {active: true})

  return (
    <>
    </>
  )
}