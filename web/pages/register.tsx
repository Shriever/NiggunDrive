import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import React from 'react';
import Header from '../components/Header';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import Wrapper from '../components/Wrapper';
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

const register: NextPage = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  return (
    <Wrapper>
      <Header>Register</Header>
      <Formik
        initialValues={{ email: '', password: '' }}
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
        {props => (
          <form
            onSubmit={props.handleSubmit}
            className='max-w-md xl:max-w-sm sm:shadow-xl mx-auto  pt-2 flex flex-col items-center p-6 py-8'
          >
            <Input type='email' placeholder='Email Address' name='email' />
            <Input type='password' placeholder='Password' name='password' />
            <SubmitButton disabled={props.isSubmitting} text='REGISTER NOW' />
          </form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default register;
