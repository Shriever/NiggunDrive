import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Niggun from '../components/Niggun';
import Wrapper from '../components/Wrapper';

const Home: NextPage = () => {
  return (
    <Wrapper>
      {[0, 1, 2].map((_, idx) => (
        <Niggun key={idx} />
      ))}
    </Wrapper>
  );
};

export default Home
