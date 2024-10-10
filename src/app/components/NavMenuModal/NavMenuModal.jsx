import * as React from 'react';

import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Link from "next/link";
import { Button, ClickAwayListener } from '@mui/material';
import { ROUTES } from '@/utils/constants';
import { useDispatch } from 'react-redux';
import { cleanCartProducts } from '@/lib/store/slices/cartProductsSlice';
import { cleanOrderProducts } from '@/lib/store/slices/orderProductsSlice';
import { cleanUser } from '@/lib/store/slices/userSlice';
import { cleanOrders } from '@/lib/store/slices/ordersSlice';
import { updateLastPageVisited } from '@/lib/store/slices/lastPageVisitedSlice';

export default function NavMenuModal({setLoadingOverlayStatus, currentPath}) {
  const dispatch = useDispatch()
  const [showSideBar, setShowSideBar] = React.useState(false);

  const handleClick = () => {
    setShowSideBar((prev) => !prev);
  };

  const handleClickAway = () => {
    setShowSideBar(false);
  };

  function handleLogOut () {
    
    setTimeout(() => {
      dispatch(cleanCartProducts())
      dispatch(cleanOrderProducts())
      dispatch(cleanUser())
      dispatch(cleanOrders())
    }, 50)
  }

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
                <Link
                  href={ROUTES.PROFILE}
                  className='flex w-full h-full p-4 pl-2 link'
                  onClick={() => {
                    dispatch(updateLastPageVisited(ROUTES))
                    setLoadingOverlayStatus(true)
                  }}
                >
                  <PersonIcon className='ml-1 mr-2' />
                  <p>My profile</p>
                </Link>
              </div>
            </li>
            <li className='w-full'>
              <div className='w-full hover:bg-hoverColor transition-all'>
                <Link
                  href={ROUTES.SHOPPING_CART}
                  className='flex w-full h-full p-4 pl-2 link'
                  onClick={() => {setLoadingOverlayStatus(true)}}
                >
                  <ShoppingCartIcon className='ml-1 mr-2' />
                  <p>Shopping cart</p>
                </Link>
              </div>
            </li>
            <li className='w-full'>
              <div className='w-full hover:bg-hoverColor transition-all'>
                <Link
                  href={ROUTES.MY_ORDERS}
                  className='flex w-full h-full p-4 pl-2 link'
                  onClick={() => {setLoadingOverlayStatus(true)}}
                >
                  <ShoppingBagIcon className='ml-1 mr-2' />
                  <p>My Orders</p>
                </Link>
              </div>
            </li>
            <li className='w-full text-warningColor' >
              <div className='w-full hover:bg-warningHoverColor transition-all'>
                <Link
                  href={ROUTES.LOGIN}
                    className='flex w-full h-full p-4 pl-2 link'
                    onClick={() => {
                      setLoadingOverlayStatus(true)
                      handleLogOut()
                    }}
                  >
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
