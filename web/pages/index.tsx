import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Niggun from '../components/Niggun';
import NiggunList, { Track } from '../components/NiggunList';
import Wrapper from '../components/Wrapper';
import audioFile from '../assets/sample-9s.mp3';

const tracks: Track[] = [
  { title: 'best song ever1', audioSrc: audioFile },
  { title: 'best song ever2', audioSrc: audioFile },
  { title: 'best song ever3', audioSrc: audioFile },
  { title: 'best song ever3', audioSrc: audioFile },
  { title: 'best song ever3', audioSrc: audioFile },
  { title: 'best song ever3', audioSrc: audioFile },
  { title: 'best song ever3', audioSrc: audioFile },
  { title: 'best song ever3', audioSrc: audioFile },
  { title: 'best song ever3', audioSrc: audioFile },
];

const Home: NextPage = () => {
  return (
    <Wrapper>
      <h1 className='text-center text-3xl mt-5 mb-3 rounded font-semibold'>
        Niggunim
      </h1>
      <NiggunList tracks={tracks} />
    </Wrapper>
  );
};

export default Home
