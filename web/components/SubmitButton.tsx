import React from 'react'

type Props = {
  text: string;
  disabled: boolean;
};

const SubmitButton = ({ text, disabled }: Props) => {
  return (
    <button
      className='mt-4 py-4 px-6 font-medium rounded bg-green-500 text-white hover:bg-green-400 transition duration-300'
      type='submit'
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default SubmitButton
