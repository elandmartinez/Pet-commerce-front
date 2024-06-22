"use client"

import { BASE_ENDPOINT, FETCH_HEADERS, FETCH_METHODS } from "@/utils/constants";

export async function authUser (credentials) {
  try {
    const res = await fetch(`${BASE_ENDPOINT}/login`, {
      method: FETCH_METHODS.POST,
      headers: FETCH_HEADERS,
      body: JSON.stringify(credentials)
    })

    return res.json()

  } catch (error) {
    throw new Error("User Auth failed: ", error)
  }
}