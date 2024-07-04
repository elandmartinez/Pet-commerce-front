"use client"

import { BASE_ENDPOINT, FETCH_HEADERS, FETCH_METHODS } from "@/utils/constants";


//user service functions

export async function authUser (credentials) {
  try {
    const res = await fetch(`${BASE_ENDPOINT}/login`, {
      method: FETCH_METHODS.POST,
      headers: FETCH_HEADERS,
      body: JSON.stringify(credentials)
    })

    return res.json()

  } catch (error) {
    throw new Error("User auth failed in frontend request function") 
  }
}

//products service functions

export async function fetchProducts (token) {
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
    throw new Error("Get products failed in frontend request function") 
  }
}

export async function fetchProduct (token, productId) {
  try {
    const res = await fetch(`${BASE_ENDPOINT}/products/get/${productId}`, {
      method: FETCH_METHODS.GET,
      headers: {
        ...FETCH_HEADERS,
        "Authorization": `Bearer ${token}`
      }
    })

    return res.json()
  } catch (error) {
    throw new Error(error)
  }
}

//client service functions

export async function postClient (bodyRequest) {
  try {
    const res = await fetch(`${BASE_ENDPOINT}/clients/post-client`, {
      method: FETCH_METHODS.POST,
      headers: FETCH_HEADERS,
      body: JSON.stringify(bodyRequest)
    })
    
    return res.json()
  } catch (error) {
    throw new Error("Create client failed in frontend request function") 
  }
}

//reviews service functions

export async function fetchReviewsByProductId (productId, token) {
  try {
    const res = await fetch(`${BASE_ENDPOINT}/reviews/get-by-product-id/${productId}`, {
      method: FETCH_METHODS.GET,
      headers: {
        ...FETCH_HEADERS,
        "Authorization": `Bearer ${token}`
      },
    })

    return res.json()
  } catch (error) {
    throw new Error("Get reviews failed in frontend request function") 
  }
}

export async function postProductReview (reviewData, token) {
  try {
    const res = await fetch(`${BASE_ENDPOINT}/reviews/post-review`, {
      method: FETCH_METHODS.POST,
      headers: {
        ...FETCH_HEADERS,
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(reviewData)
    })

    return res.json()

  } catch (error) {
   throw new Error("Post product failed in frontend request function") 
  }
}


//Orders service functions

export async function fetchOrdersByClientId (clientId, token) {
  try {
    const res = await fetch(`${BASE_ENDPOINT}/orders/get-by-client-id/${clientId}`, {
      method: FETCH_METHODS.GET,
      headers: {
        ...FETCH_HEADERS,
        "Authorization": `Bearer ${token}`
      },
    })

    return res.json()

  } catch (error) {
    throw new Error("Get orders failed in frontend request function") 
  }
}

export async function postOrder(orderData, token) {
  try {
    const res = fetch(`${BASE_ENDPOINT}/orders/post-order`, {
      method: FETCH_METHODS.POST,
      headers: {
        ...FETCH_HEADERS,
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    })

    return res.json()

  } catch (error) {
   throw new Error("Post order failed in frontend request function") 
  }
}

//Addresses service fucntions

export async function fetchAddressesByClientId (clientId, token) {
  try {
    const res = fetch(`${BASE_ENDPOINT}/addresses/get-by-product-id/${clientId}`, {
      method: FETCH_METHODS.GET,
      headers: {
        ...FETCH_HEADERS,
        "Authorization": `Bearer ${token}`
      },
    })

    return res.json()

  } catch (error) {
    throw new Error("Get addresses failed in frontend request function") 
  }
}

export async function postAddress (addressData, token) {
  try {
    const res = fetch(`${BASE_ENDPOINT}/addresses/post-address`, {
      method: FETCH_METHODS.POST,
      headers: {
        ...FETCH_HEADERS,
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(addressData)
    })

    return res.json()

  } catch (error) {
   throw new Error("Post address failed in frontend request function") 
  }
}