import { Formik } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Header from '../components/Header';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import Wrapper from '../components/Wrapper';
import {
  MeDocument,
  MeQuery,
  useLoginMutation,
} from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

const login: NextPage = () => {
  const router = useRouter();
  const [login] = useLoginMutation();


  return (
    <Wrapper>
      <Header>Login</Header>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: { options: values },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: data?.login.user,
                },
              });
              cache.evict({ fieldName: 'niggunim:{}' });
            },
          });
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else {
            router.push('/');
          }
        }}
      >
        {({ handleSubmit, isSubmitting, handleChange, values, errors }) => (
          <form
            onSubmit={handleSubmit}
            className='max-w-md xl:max-w-sm sm:shadow-xl mx-auto  pt-2 flex flex-col items-center p-6 py-8'
          >
            <Input
              value={values.email}
              type='email'
              placeholder='Email Address'
              name='email'
              onChange={handleChange}
            />
            <Input
              value={values.password}
              type='password'
              placeholder='Password'
              name='password'
              onChange={handleChange}
            />
            {errors ? (
              <span className='text-red-500'>
                {errors.email || errors.password}
              </span>
            ) : null}
            <SubmitButton disabled={isSubmitting} text='LOG IN NOW' />
          </form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default login;
