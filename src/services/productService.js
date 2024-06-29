"use client"

import { BASE_ENDPOINT, FETCH_HEADERS, FETCH_METHODS } from "@/utils/constants"

export async function getProducts (token) {
  try {
    const res = await fetch(`${BASE_ENDPOINT}/products/get`, {
      method: FETCH_METHODS.GET,
      headers: {
        ...FETCH_HEADERS,
        "Authorization": `Bearer ${token}`
      }
    })

    return res.json()
  } catch (error) {
    throw new Error ("An error ocurred when doing the request", error)
  }
}

