import Head from 'next/head';
import React from 'react';
import Navbar from './Navbar';

const Wrapper: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>NiggunDrive</title>
        <meta name='description' content='Niggunim' />
      </Head>
      <Navbar />
      {children}
    </>
  );
};

export default Wrapper;
