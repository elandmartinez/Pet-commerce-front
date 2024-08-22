'use client'

import { useRouter } from "next/navigation"

export default function Home () {
  const router = useRouter() 

  router.push("/login")

  return (
    <div className="w-full h-full pt-[350px]">
      <h1 className="text-center text-[40px] font-thin">Loading login...</h1>
    </div>
  )
}