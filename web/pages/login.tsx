import React from 'react'
import Wrapper from '../components/Wrapper'

const login = () => {
    return (
      <Wrapper>
        <h1 className='text-center text-3xl mt-4 mb-3 rounded'>Admin Login</h1>
        <div className='max-w-sm shadow-xl mx-auto  pt-2 flex flex-col items-center p-6 py-8'>
          <input
            type='email'
            placeholder='Email Address'
            className='w-4/5 mx-auto my-3 border p-3 focus:outline-none focus:border-green-500 rounded'
          />
          <input
            type='password'
            placeholder='Password'
            className='w-4/5 mx-auto my-3 border p-3 focus:outline-none focus:border-green-500 rounded'
          />
          <button className='w-100% mt-4 py-2 px-2 font-medium rounded bg-green-500 text-white hover:bg-green-400 transition duration-300'>
            LOG IN NOW
          </button>
        </div>
      </Wrapper>
    );
}

export default login
