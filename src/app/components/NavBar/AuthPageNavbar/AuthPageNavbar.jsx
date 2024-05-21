"use client"

import { Pacifico } from "next/font/google";
import pawLogo from "../../../../assets/paw-logo.svg"
import SearchIcon from '@mui/icons-material/Search';
import NavMenuModal from "../../NavMenuModal/NavMenuModal";
import Link from "next/link";

const pacifico = Pacifico({
  weight: ["400"],
  subsets: ["latin"]
})

function AuthPageNavbar (){
  return (
    <div className="bg-secondaryBgColor w-full relative p-4 sm:pb-1 flex flex-col items-center">
      <div className={`bg-secondaryBgColor flex justify-between items-center sm:items-start w-full`}>
        <div className="relative top-[2px] flex flex-col items-center text-[12px]">  
          <img
            src={pawLogo.src}
            className="w-8 h-8 fill-thirdColor sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
            alt={"Pet-commerce logo"}
          />
          <h2 className={`${pacifico.className} relative bottom-[5px] text-[10px] sm:text-[14px] md:text-4 lg:text-6`}>Pet-commerce</h2>
        </div>
        <div className="relative w-[60%] max-w-[350px]">
          <div className=" flex items-center">
            <input placeholder="search" 
              className="pl-8 search-input rounded-xl w-full h-10 text-secondaryColor border-thirdColor bg-white shadow-sm shadow-shadowColor lg:pl-2 pr-[26px]
              focus:outline-none placeholder:text-secondaryColor"
              />
            <SearchIcon alt="search icon"
              className="search-icon absolute left-1 lg:right-1 lg:border-l-[1px] lg:left-[90%] border-shadowColor pl-1"
            />
          </div>
          <nav className={`${pacifico.className} hidden w-full sm:flex text-sm pt-3 pb-1 px-1`}>
            <ul className='w-full flex justify-between'>
              <li>
                <div className="category-link__cont px-4 py-2 rounded-xl hover:bg-mainBgColor transition-all">
                  <Link href={"/profile"} className='w-full h-full flex justify-center items-center'>
                    <p
                      className="category-link inline-block relative rounded-xl transition-all"
                      >Food</p>
                  </Link>
                </div>
              </li>
              <li>
                <div className='category-link__cont px-4 py-2 rounded-xl hover:bg-mainBgColor transition-all'>
                  <Link href={"/shopping-cart"} className='flex justify-center items-center'>
                    <p className="category-link inline-block relative rounded-xl transition-all" >Hygiene and care</p>
                  </Link>
                </div>
              </li>
              <li>
                <div className='category-link__cont px-4 py-2 rounded-xl hover:bg-mainBgColor transition-all'>
                  <Link href={"/shopping-cart"} className='flex justify-center items-center'>
                    <p className="category-link relative rounded-xl transition-all" >Others</p>
                  </Link>
                </div>
              </li>
            </ul>
          </nav>
        </div>
        <NavMenuModal />
      </div>
    </div>
  )
}

export default AuthPageNavbar;