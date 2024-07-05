const { createSlice } = require("@reduxjs/toolkit");

export const cartProductsSlice = createSlice({
  name: "cartProducts",
  initialState: [],
  reducers: {
    addProductToCart: (cartProducts, action) => {
      var addedProductIndex = undefined;

      const productAlreadyAdded = cartProducts.find((product, index) => {
        const productMatchedWithPayload = product.productId === action.payload.productData.productId;
        if(productMatchedWithPayload) {
          addedProductIndex = index
        }

        return productMatchedWithPayload
      })
      
      if(!productAlreadyAdded) {
        cartProducts.push({...action.payload.productData, amountInTheCart: action.payload.amountToAdd})
      } else {
        productAlreadyAdded.amountInTheCart += action.payload.amountToAdd
        cartProducts[addedProductIndex] = {...productAlreadyAdded};
      }
    },
    updateCartProducts: (cartProducts, actions) => {
      return [...actions.payload]
    },
    cleanCartProducts: () => {
      return []
    }
  }
})

export const {addProductToCart, updateCartProducts, cleanCartProducts} = cartProductsSlice.actions

export default cartProductsSlice.reducer