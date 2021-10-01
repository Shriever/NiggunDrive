import React from 'react'

const LOGGED_IN = false;

const Navbar = () => {
  return (
    <nav className='bg-white shadow-lg'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex space-x-7 justify-between'>
          <div>
            <a href='#' className='flex items-center py-4 px-2'>
              <span className='font-semibold text-gray-600 text-2xl'>
                NiggunDrive
              </span>
            </a>
          </div>
          <div className='flex items-center space-x-3'>
            <a
              href='#'
              className='py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300'
            >
              {LOGGED_IN ? 'Logout' : 'Login'}
            </a>
            <a
              href='#'
              className='py-2 px-2 font-medium rounded bg-green-500 text-white hover:bg-green-400 transition duration-300'
            >
              {LOGGED_IN ? 'Upload' : 'Register'}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar
