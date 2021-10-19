import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import React, { useState } from 'react';
import Header from '../components/Header';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import Wrapper from '../components/Wrapper';
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { ValuesOfCorrectTypeRule } from 'graphql';

const register: NextPage = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <Wrapper>
      <Header>Register</Header>
      <Formik
        initialValues={{ email: '', password: '', adminKey: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            variables: values,
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: data?.register.user,
                },
              });
              cache.evict({ fieldName: 'posts:{}' });
            },
          });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else {
            router.push('/');
          }
        }}
      >
        {({ handleSubmit, handleChange, values, isSubmitting, errors }) => (
          <form
            onSubmit={handleSubmit}
            className='max-w-md xl:max-w-sm sm:shadow-xl mx-auto  pt-2 flex flex-col items-center p-6 py-8'
          >
            <Input
              value={values.email}
              type='email'
              placeholder='Email Address*'
              name='email'
              onChange={handleChange}
            />
            <Input
              value={values.password}
              type='password'
              placeholder='Password*'
              name='password'
              onChange={handleChange}
            />
            <span
              className='cursor-pointer'
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? 'Hide Advanced' : 'Show Advanced'}
            </span>
            {showAdvanced ? (
              <Input
                value={values.adminKey}
                type='text'
                placeholder='Admin Key'
                name='adminKey'
                onChange={handleChange}
              />
            ) : null}
            {errors ? (
              <span className='text-red-500'>
                {errors.email || errors.password}
              </span>
            ) : null}
            <SubmitButton disabled={isSubmitting} text='REGISTER NOW' />
          </form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default register;
