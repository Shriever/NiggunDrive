import React from 'react'
import Input from '../components/Input';
import MyForm from '../components/MyForm';
import Wrapper from '../components/Wrapper'

const login = () => {
    return (
      <Wrapper>
        <h1 className='text-center text-3xl mt-5 mb-3 rounded font-semibold'>
          Admin Login
        </h1>
        <div className='max-w-md xl:max-w-sm sm:shadow-xl mx-auto  pt-2 flex flex-col items-center p-6 py-8'>
          <Input
            type='email'
            placeholder='Email Address'
          />
          <Input
            type='password'
            placeholder='Password'
          />
          <button className='mt-4 py-4 px-6 font-medium rounded bg-green-500 text-white hover:bg-green-400 transition duration-300'>
            LOG IN NOW
          </button>
        </div>
      </Wrapper>
    );
}

export default login
