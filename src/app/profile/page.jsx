'use client'
import PersonIcon from '@mui/icons-material/Person';
import ModeIcon from '@mui/icons-material/Mode';
import AuthPageNavbar from '../components/AuthPageNavbar/AuthPageNavbar';
import { useSelector } from 'react-redux';

export default function Profile () {
  const user = useSelector(state => state.user)

  return (
    <>
      <AuthPageNavbar />  
      <main className='text-secondaryColor'>
        <div className='w-full mx-auto max-w-[600px] flex flex-col justify-center items-center'>
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
          <div classname="w-full flex flex-col justify-center items-center">
            <div className='w-full mt-8 text-start'>
              <h3 className='text-[20px] text-mainColor mb-1'>Email</h3>
              <p>{user.email}</p>     
            </div>
          </div>
        </div>
      </main>
    </>
  )
}