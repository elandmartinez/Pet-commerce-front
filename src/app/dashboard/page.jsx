"use client"

import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  weight: ["400"],
  subsets: ["latin"]
})


export default function Dashboard () {
  return (
    <main className="w-full h-full flex flex-col items-center">
      <div className={`${pacifico.className} text-thirdColor text-[30px] mt-10 text-center`} >
        <h1 className="text-[30px] mb-6" >What does your pet need today?</h1>
        <h2 className="text-[20px]" >We have for you...</h2>
      </div>
    </main>
  )
}