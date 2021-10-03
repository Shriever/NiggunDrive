import React, { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {};

const Input = (props: Props) => {
  return (
    <input
      className='w-4/5 mx-auto my-3 border p-3 focus:outline-none focus:border-green-500 rounded'
      {...props}
    />
  );
};

export default Input;
