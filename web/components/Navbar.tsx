import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoClose, IoMenuOutline } from 'react-icons/io5';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { useApolloClient } from '@apollo/client';
import MobileNavItem from './MobileNavItem';

type MobileNavItemType = { link: string; title: string };

const Navbar = () => {
  const [mobileNavItems, setMobileNavItems] = useState<MobileNavItemType[]>([
    { link: '/', title: 'Home' },
    { link: '/liked-posts', title: 'My Likes' },
  ]);
  const [showNavbar, setShowNavbar] = useState(false);
  const { data, loading } = useMeQuery();
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();

  const loggedIn = !!data?.me;

  useEffect(() => {
    if (loggedIn) {
      const newNavItems = [
        { link: '/', title: 'Home' },
        { link: '/liked-posts', title: 'My Likes' },
      ];

      newNavItems.push({ link: '/upload', title: 'Upload' });
      newNavItems.push({ link: '_logout', title: 'Logout' });
      setMobileNavItems(newNavItems);
    } else {
      const newNavItems = [
        { link: '/', title: 'Home' },
        { link: '/liked-posts', title: 'My Likes' },
      ];

      newNavItems.push({ link: '/login', title: 'Login' });
      newNavItems.push({ link: '/register', title: 'Register' });
      setMobileNavItems(newNavItems);
    }
  }, [loggedIn]);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <nav className='bg-white shadow-lg'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex space-x-7 justify-between'>
          <div>
            <Link href='/'>
              <a href='#' className='flex items-center py-4 px-2'>
                <span className='font-semibold text-gray-600 text-2xl'>
                  NiggunDrive
                </span>
              </a>
            </Link>
          </div>
          <div className='hidden md:flex items-center space-x-1'>
            <Link href='/'>
              <a
                href='#'
                className='mx-2 py-4 px-2 text-gray-500 border-green-500 font-semibold hover:text-green-500'
                // className='mx-2 py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold '
              >
                Home
              </a>
            </Link>
            <Link href='/liked-posts'>
              <a
                href='#'
                className='mx-2 py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300 hover:text-green-500'
              >
                My Likes
              </a>
            </Link>
          </div>
          <div className='md:flex hidden items-center space-x-3'>
            {loggedIn ? <span>{data?.me?.email}</span> : null}
            <Link href={loggedIn ? '/' : '/login'}>
              <a
                href='#'
                className='py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300'
                onClick={async () => {
                  if (loggedIn) {
                    await logout();
                    await apolloClient.resetStore();
                  }
                }}
              >
                {loggedIn ? 'Logout' : 'Login'}
              </a>
            </Link>
            <Link href={loggedIn ? '/upload' : '/register'}>
              <a
                href='#'
                className='py-2 px-2 font-medium rounded bg-green-500 text-white hover:bg-green-400 transition duration-300'
              >
                {loggedIn ? 'Upload' : 'Register'}
              </a>
            </Link>
          </div>
          <div
            onClick={() => setShowNavbar(!showNavbar)}
            className='md:hidden flex items-center cursor-pointer'
          >
            {showNavbar ? (
              <IoClose size='1.3em' />
            ) : (
              <IoMenuOutline size='1.3em' />
            )}
          </div>
        </div>
      </div>
      <div className='md:hidden'>
        {showNavbar
          ? mobileNavItems.map((item, idx) => {
              return (
                <MobileNavItem key={idx} link={item.link} logout={logout}>
                  {item.title}
                </MobileNavItem>
              );
            })
          : null}
        {loggedIn && showNavbar ? (
          <div className='py-3 pl-2 border-b-2'>{data.me?.email}</div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
