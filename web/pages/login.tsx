import React from 'react'
import Input from '../components/Input';
import MyForm from '../components/MyForm';
import SubmitButton from '../components/SubmitButton';
import Wrapper from '../components/Wrapper';

const login = () => {
  return (
    <Wrapper>
      <h1 className='text-center text-3xl mt-5 mb-3 rounded font-semibold'>
        Admin Login
      </h1>
      <div className='max-w-md xl:max-w-sm sm:shadow-xl mx-auto  pt-2 flex flex-col items-center p-6 py-8'>
        <Input type='email' placeholder='Email Address' />
        <Input type='password' placeholder='Password' />
        <SubmitButton text='LOG IN NOW' />
      </div>
    </Wrapper>
  );
};

export default login
