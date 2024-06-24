'use client'
import PersonIcon from '@mui/icons-material/Person';
import ModeIcon from '@mui/icons-material/Mode';
import AuthPageNavbar from '../components/AuthPageNavbar/AuthPageNavbar';

export default function Profile () {
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
          <div classname="flex flex-col justify-center items-center">
              <div>
                <h3></h3>
                <div>
                  {/* <input type={} /> */}
                </div>
              </div>
          </div>
        </div>
      </main>
    </>
  )
}