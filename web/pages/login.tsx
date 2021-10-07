import { Formik } from 'formik';
import React from 'react';
import Header from '../components/Header';
import Input from '../components/Input';
import MyForm from '../components/MyForm';
import SubmitButton from '../components/SubmitButton';
import Wrapper from '../components/Wrapper';

const login = () => {
  return (
    <Wrapper>
      <Header>Login Page</Header>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={() => {
          console.log('logging in...');
        }}
      >
        {props => (
          <form
            onSubmit={props.handleSubmit}
            className='max-w-md xl:max-w-sm sm:shadow-xl mx-auto  pt-2 flex flex-col items-center p-6 py-8'
          >
            <Input type='email' placeholder='Email Address' name='email' />
            <Input type='password' placeholder='Password' name='password' />
            <SubmitButton text='LOG IN NOW' />
          </form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default login;
