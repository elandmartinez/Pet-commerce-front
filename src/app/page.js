"use client"

import { useRouter } from "next/navigation"
import { useState } from "react";


export default function Home() {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);

  const pushUrl = (url) => {
    router.push(url)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Hey, do you have an account with us? log in</p>
      {isLogged ? <p>Dashboard</p> : pushUrl("/login")}
    </main>
  );
}
