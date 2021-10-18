import type { NextPage } from 'next';
import NiggunList, { Track } from '../components/NiggunList';
import Wrapper from '../components/Wrapper';
import React from 'react';
import Header from '../components/Header';
import { useLikedNiggunimQuery } from '../generated/graphql';

const Home: NextPage = () => {
  const { data, loading } = useLikedNiggunimQuery();
  if (loading) {
    return <div>loading</div>;
  }
  if (!data) {
    return <div>something went wrong</div>;
  }
  return (
    <Wrapper>
      <Header>My Liked Niggunim</Header>
      <NiggunList tracks={data.likedNiggunim} />
    </Wrapper>
  );
};

export default Home;
