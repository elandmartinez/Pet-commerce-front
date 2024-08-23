"use client"

import { Pacifico } from "next/font/google";
import pawLogo from "../../../assets/paw-logo.svg"
import SearchIcon from '@mui/icons-material/Search';
import NavMenuModal from "../NavMenuModal/NavMenuModal";
import Link from "next/link";
import { PRODUCTS_CATEGORIES_ARRAY, ROUTES } from "@/utils/constants";

const pacifico = Pacifico({
  weight: ["400"],
  subsets: ["latin"]
})

function AuthPageNavbar ({ onSearchUpdate, setLoadingOverlayStatus }){
  return (
    <div className="relative p-4 sm:pb-1 flex flex-col items-center text-thirdColor top-0 bg-secondaryBgColor w-full xl:px-16">
      <div className={` bg-secondaryBgColor flex justify-between items-center sm:items-start w-full`}>
        {/* logo container, it has the logo and the title of it */}
        <Link
          href={ROUTES.DASHBOARD}
          onClick={() => {
            setLoadingOverlayStatus(true)}
          }
          className="link relative top-[2px] flex flex-col items-center text-[12px]"
        >
          <img
            src={pawLogo.src}
            className="w-8 h-8 fill-thirdColor sm:w-12 sm:h-12 lg:w-14 lg:h-14"
            alt={"Pet-commerce logo"}
          />
          <h2 className={`${pacifico.className} relative bottom-[5px] text-[10px] sm:text-4 lg:text-6`}>Pet-commerce</h2>
        </Link>
        {/* search bar container and also container of nav links that are shown when displays goes over
        640px*/}
        <div className="relative w-[60%] max-w-[400px] sm:flex sm:flex-col sm:items-center sm:w-[70%]">

          {/* serach bar */}
          <div className="w-full relative flex items-center">
            <form className="w-full" action="search bar" onSubmit={(e) => {
                e.preventDefault()

                const searchBarInputValue = (e.target[0].value).toLowerCase()
                onSearchUpdate(searchBarInputValue)
              }}
            >
              <input placeholder="search" 
                className="pl-8 search-input rounded-xl w-full h-10 text-secondaryColor border-thirdColor bg-white shadow-sm shadow-shadowColor lg:pl-2 pr-[26px]
                focus:outline-none placeholder:text-secondaryColor"
              />
            </form>
            <SearchIcon alt="search icon"
              className="search-icon absolute left-1 lg:right-1 lg:border-l-[1px] lg:left-[90%] border-shadowColor pl-1"
            />
          </div>

          {/* nav links container */}
          <nav className="hidden sm:flex sm:justify-center text-sm pt-3 pb-1 px-1">

            {/* nav links */}
            <ul className='w-full flex justify-between'>
              {PRODUCTS_CATEGORIES_ARRAY.map((productCategory, index) => {
                return (
                  <li key={index}>
                    <Link
                      href={`${ROUTES.PRODUCTS_CATEGORY}/${productCategory}`}
                      onClick={() => {setLoadingOverlayStatus(true)}}
                      className='link w-full h-full flex justify-center items-center'
                    >
                      <div className="category-link__cont">
                        <p
                          className="category-link inline-block underline decoration-thirdColor underline-offset-[3px] decoration-2 relative rounded-xl transition-all duration-300"
                        >
                          {productCategory}
                        </p>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        {/* principal user menu that goes into screen from the right */}
        <NavMenuModal setLoadingOverlayStatus={setLoadingOverlayStatus} />
      </div>
    </div>
  )
}

export default AuthPageNavbar;