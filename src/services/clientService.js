"use client"

import { BASE_ENDPOINT, FETCH_HEADERS, FETCH_METHODS } from "@/utils/constants"

export async function postClient (bodyRequest) {
  try {
    const res = await fetch(`${BASE_ENDPOINT}/clients/post-client`, {
      method: FETCH_METHODS.POST,
      headers: FETCH_HEADERS,
      body: JSON.stringify(bodyRequest)
    })
    
    return res.json()
  } catch (error) {
    return new Error("Something went wrong when creating a client")
  }



}
