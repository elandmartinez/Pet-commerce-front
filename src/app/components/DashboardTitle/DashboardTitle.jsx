'use client'

function DefaultTitle () {
  return (
    <>
      <h1 className="text-[30px] mb-6" >What does your pet need today?</h1>
      <h2 className="text-[20px]" >We have for you...</h2>
    </>
  )
}

function SearchFilterTitle ({ searchValue }) {
  return (
    <>
      <h1 className="text-[30px] mb-6" >Results for "{searchValue}"</h1>
    </>
  )
}

function NoProductsForSearchFilterFound ({ searchValue }) {
  return (
    <>
      <h1 className="text-[30px] mb-6" >Could not find any products for the search "{searchValue}"</h1>
    </>
  )
}

export default function DashboardTitle ({ isProductsToDisplayEmpty, isThereSearchingBarValue, searchValue }) {
  return (
    <>
      {isProductsToDisplayEmpty ? <NoProductsForSearchFilterFound /> : ( isThereSearchingBarValue ? <SearchFilterTitle searchValue={searchValue} /> : <DefaultTitle /> )}
    </>
  )
}