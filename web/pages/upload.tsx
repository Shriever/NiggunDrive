import { Formik } from 'formik';
import { NextPage } from 'next';
import React from 'react';
import Header from '../components/Header';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import Wrapper from '../components/Wrapper';

const upload: NextPage = () => {
  return (
    <Wrapper>
      <Header>
        Upload Niggun
      </Header>
      <Formik
        initialValues={{ title: '' }}
        onSubmit={() => {
          console.log('File Uploaded!');
        }}
      >
        {props => (
          <form
            onSubmit={props.handleSubmit}
            className='max-w-md xl:max-w-sm sm:shadow-xl mx-auto pt-2 mt-4 flex flex-col items-center p-6 py-8'
          >
            <Input type='text' placeholder='Title' name='title' />
            <input type='file' className='w-4/5 mx-auto my-3' />
            <SubmitButton text='UPLOAD NOW' />
          </form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default upload;
