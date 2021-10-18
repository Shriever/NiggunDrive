import type { NextPage } from 'next';
import NiggunList, { Track } from '../components/NiggunList';
import Wrapper from '../components/Wrapper';
import React from 'react';
import Header from '../components/Header';


const Home: NextPage = () => {
  return (
    <Wrapper>
      <Header>My Liked Niggunim</Header>
      {/* <NiggunList tracks={tracks} /> */}
    </Wrapper>
  );
};

export default Home;
