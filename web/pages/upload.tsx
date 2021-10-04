import { Formik } from 'formik';
import React from 'react';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import Wrapper from '../components/Wrapper';

const upload = () => {
  return (
    <Wrapper>
      <h1 className='text-center text-3xl mt-5 mb-3 rounded font-semibold'>
        Upload Niggun
      </h1>
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
