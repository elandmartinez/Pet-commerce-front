"use client"

import { Provider } from 'react-redux';
import { store } from "./index"
import { useRef } from 'react';

const ReduxProvider = ({ children }) => {
  const storeRef = useRef()

  if(!storeRef) storeRef.current = store();

  console.log("creating store", {store})

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default ReduxProvider;