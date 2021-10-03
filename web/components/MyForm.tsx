import React from 'react';

const MyForm: React.FC<{}> = ({children}) => {
  return (
    <div className='max-w-md xl:max-w-sm sm:shadow-xl mx-auto  pt-2 flex flex-col items-center p-6 py-8'>
      {children}
    </div>
  );
};

export default MyForm;
