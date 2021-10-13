import type { NextPage } from 'next';
import NiggunList, { Track } from '../components/NiggunList';
import Wrapper from '../components/Wrapper';
import audioFile from '../assets/sample-9s.mp3';
import React from 'react';
import Header from '../components/Header';

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
      <Header>My Liked Niggunim</Header>
      <NiggunList tracks={tracks} />
    </Wrapper>
  );
};

export default Home;
