"use client"

export default function ProfileDataInput ({profilePropData}) {
  return (
    <div className='w-full mt-8 text-start'>
      <h3 className='text-[20px] text-mainColor mb-1'>{profilePropData.label}</h3>
      <p>{profilePropData.value}</p>     
    </div>
  )
}