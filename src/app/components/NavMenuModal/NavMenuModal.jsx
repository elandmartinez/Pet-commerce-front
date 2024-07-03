import * as React from 'react';

import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Link from "next/link";
import { Button } from '@mui/material';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

export default function NavMenuModal() {
  const [showSideBar, setShowSideBar] = React.useState(false);

  const handleClick = () => {
    setShowSideBar((prev) => !prev);
  };

  const handleClickAway = () => {
    setShowSideBar(false);
  };

  return (
    //clickaway listener component used from mui
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="sm:mt-[15px] z-20">

        {/* button that activates the menu */}
        <Button
          onClick={handleClick}
          variant='outlined'
          className='menu-button'
          /* this is the way to apply overwritting styles to mui components */
          sx={{
            minWidth: 40,
            minHeight: 40,
            color: "var(--third-color)",
            borderColor: "var(--third-color)",
            padding: "5px 8px",
            borderRadius: 40,
            backgroundColor: "var(--main-bg-color)",
            ":hover": {
              borderColor: "var(--shadow-color)",
              backgroundColor: "var(--third-color)"
            },
            ":hover path": {
              fill: "var(--main-bg-color)"
              }
            }
          }
        >
          {/* Icon of the button that activates the menu */}
          <PersonIcon/>
        </Button>

        {/* the menu cont */}
        <nav
          className={`profile-navbar-height absolute -right-[200px] top-[100%] w-[180px] sm:w-[200px] bg-mainBgColor transition-all
           border-l border-b border-shadowColor shadow-xl ${showSideBar ? "show-sidebar" : ""}`} 
        >
          <ul className='w-full'>
            <li className='w-full'>
              <div className='w-full hover:bg-hoverColor transition-all'>
                <Link href={"/profile"} className='flex w-full h-full p-4 pl-2'>
                  <PersonIcon className='ml-1 mr-2' />
                  <p>My profile</p>
                </Link>
              </div>
            </li>
            <li className='w-full'>
              <div className='w-full hover:bg-hoverColor transition-all'>
                <Link href={"/shopping-cart"} className='flex w-full h-full p-4 pl-2'>
                  <ShoppingCartIcon className='ml-1 mr-2' />
                  <p>Shopping cart</p>
                </Link>
              </div>
            </li>
            <li className='w-full'>
              <div className='w-full hover:bg-hoverColor transition-all'>
                <Link href={"/shopping-cart"} className='flex w-full h-full p-4 pl-2'>
                  <ShoppingBagIcon className='ml-1 mr-2' />
                  <p>My shoppings</p>
                </Link>
              </div>
            </li>
            <li className='w-full text-warningColor' >
              <div className='w-full hover:bg-warningHoverColor transition-all'>
                <Link href={"/"} className='flex w-full h-full p-4 pl-2'>
                  <ExitToAppIcon className='ml-1 mr-2' sx={{fill: "#fa5c8e"}} />
                  <p>Log out</p>
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </ClickAwayListener>
  );
}
