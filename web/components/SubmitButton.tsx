import React from 'react'

type Props = {
  text: string;
};

const SubmitButton = ({ text }: Props) => {
  return (
    <button
      className='mt-4 py-4 px-6 font-medium rounded bg-green-500 text-white hover:bg-green-400 transition duration-300'
      type='submit'
    >
      {text}
    </button>
  );
};

export default SubmitButton
