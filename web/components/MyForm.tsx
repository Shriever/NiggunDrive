import React from 'react';

type Props = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

const MyForm = (props: Props) => {
  return (
    <form
      {...props}
      className='max-w-md xl:max-w-sm sm:shadow-xl mx-auto  pt-2 flex flex-col items-center p-6 py-8'
    >
      {props.children}
    </form>
  );
};

export default MyForm;
