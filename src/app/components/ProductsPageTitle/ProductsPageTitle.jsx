'use client'

function AllProductsTitle () {
  return (
    <>
      <h1 className="text-[30px] mb-6" >What does your pet need today?</h1>
      <h2 className="text-[20px]" >We have for you...</h2>
    </>
  )
}

function CategoryProductsTitle ({category}) {
  return (
    <>
      <h1 className="text-[30px] mb-6" >"{category}" products</h1>
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

function NoProductsInStorage () {
  return (
    <>
      <h1 className="text-[30px] mb-6" >Ups, it seems that we got a problem with our products :(  please try again later </h1>
    </>
  )
}

export default function ProductsPageTitle ({ localStorageProducts, isProductsToDisplayEmpty, isThereSearchingBarValue, searchValue, isProductsByCategory = false, category = "" }) {

  console.log({isProductsByCategory})
  return (
    <div className="max-w-[600px]">
      {isProductsToDisplayEmpty ?
        (!localStorageProducts ? <NoProductsInStorage /> : <NoProductsForSearchFilterFound />)
        :
        ( isThereSearchingBarValue ? <SearchFilterTitle searchValue={searchValue} /> : (
          isProductsByCategory ? <CategoryProductsTitle category={category} /> : <AllProductsTitle />
        ))
        }
    </div>
  )
}