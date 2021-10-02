import React from 'react';
import Navbar from './Navbar';

const Wrapper: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Wrapper;
