'use client'
import PersonIcon from '@mui/icons-material/Person';
import AuthPageNavbar from '../components/AuthPageNavbar/AuthPageNavbar';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer/Footer';
import AuthPageManager from '../middlewareComponents/AuthPageManager';
import LoadingOverlay from '../components/LoadingOverlay/LoadingOverlay';
import { useState } from 'react';
import { updateIsRedirecting } from '@/lib/store/slices/isRedirectingSlice';
import ErrorPage from '../components/ErrorPage/ErrorPage';


//style client data so it can be updated (edit icon on the right) and is shown as an input

export default function Profile () {
  const [loadingOverlayStatus, setLoadingOverlayStatus] = useState(false)
  const {client} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const isRedirecting = useSelector(state => state.isRedirecting)

  //if the state of redirecting is true, we dont want this page to actually render, so we interrumpt it
  if(isRedirecting) {
    //this setTimeout is for making the update of the isRedirecting status after the render of the ErrorPage
    //so the ErrorPage is shown and then the user gets redirected to the actual page it needs to be
    setTimeout(() => {
      dispatch(updateIsRedirecting(false))
    }, 1)
    return (<ErrorPage />)
  }

  return (
    <AuthPageManager>
      <AuthPageNavbar setLoadingOverlayStatus={setLoadingOverlayStatus} />  
      <LoadingOverlay active={loadingOverlayStatus} />
      <main className='text-secondaryColor w-full min-h-[60%] mx-auto'>
        <div className='w-full px-2 mx-auto pb-10 max-w-[300px] flex flex-col justify-center items-center'>
          <div className='mt-20 mb-6 flex justify-center items-center w-[140px] h-[140px] border border-secondaryBgColor rounded-full'>
            <PersonIcon sx={
              {
                fill: "white",
                width: 120,
                height: 120,
                backgroundColor: "var(--background-transparent-gray)",
                borderRadius: 50,
                
              }}>
            </PersonIcon>
          </div>
          <h1 className='w-full text-center pb-2 border-b-2 border-secondaryColor'>Profile</h1>
          <div className="w-full flex flex-col justify-center items-center">
            <div className='w-full mt-8 text-start'>
              <h3 className='text-[20px] text-mainColor mb-1'>Name</h3>
              <p>{client?.name}</p>     
            </div>
            <div className='w-full mt-8 text-start'>
              <h3 className='text-[20px] text-mainColor mb-1'>Email</h3>
              <p>{client?.email}</p>     
            </div>
            <div className='w-full mt-8 text-start'>
              <h3 className='text-[20px] text-mainColor mb-1'>Phone Number</h3>
              <p>+{client?.nationalCode} {client?.phoneNumber}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      </AuthPageManager>
  )
}