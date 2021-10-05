import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Niggun from '../components/Niggun';
import Wrapper from '../components/Wrapper';

const Home: NextPage = () => {
  return (
    <Wrapper>
      <h1 className='text-center text-3xl mt-5 mb-3 rounded font-semibold'>
        Niggunim
      </h1>
      <div className='mx-auto max-w-md mt-6'>
        {[0, 1, 2].map((_, idx) => (
          <Niggun key={idx} />
        ))}
      </div>
    </Wrapper>
  );
};

export default Home
