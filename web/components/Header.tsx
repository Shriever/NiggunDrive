import React from 'react';

const Header: React.FC<{}> = ({ children }) => {
  return (
    <h1 className='text-center text-3xl mt-5 mb-3 rounded font-semibold'>
      {children}
    </h1>
  );
};

export default Header;
