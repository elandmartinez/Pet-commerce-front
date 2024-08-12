const { createContext, useEffect, useContext, useState } = require("react");

//what we do in this module is create a context that is accesible from any point of our application that will tell us
//wheter the page is rendering on client side or on server side

const isClientCtx = createContext(false);

export const IsClientCtxProvider = ({children}) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <isClientCtx.Provider value={isClient}>
      {children}
    </isClientCtx.Provider>
  )
}

export function useIsClient() {
  return useContext(isClientCtx)
}
