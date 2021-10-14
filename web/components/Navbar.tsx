import React from 'react';
import Link from 'next/link';
import { IoMenuOutline } from 'react-icons/io5';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { useApolloClient } from '@apollo/client';

const LOGGED_IN = false;

const Navbar = () => {
  const { data, loading } = useMeQuery();
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();

  const loggedIn = !!data?.me;

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
            {data?.me?.isAdmin ? (
              <Link href='/upload'>
                <a
                  href='#'
                  className='py-2 px-2 font-medium rounded bg-green-500 text-white hover:bg-green-400 transition duration-300'
                >
                  Upload
                </a>
              </Link>
            ) : null}
            {!loggedIn ? (
              <Link href='/register'>
                <a
                  href='#'
                  className='py-2 px-2 font-medium rounded bg-green-500 text-white hover:bg-green-400 transition duration-300'
                >
                  Register
                </a>
              </Link>
            ) : null}
          </div>
          <div className='md:hidden flex items-center cursor-pointer'>
            <IoMenuOutline size='1.3em' />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
