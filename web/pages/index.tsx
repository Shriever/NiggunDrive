import type { NextPage } from 'next';
import NiggunList from '../components/NiggunList';
import Wrapper from '../components/Wrapper';
import React from 'react';
import Header from '../components/Header';
import { useNiggunimQuery } from '../generated/graphql';

const Home: NextPage = () => {
  const { data, loading } = useNiggunimQuery();

  if (loading) {
    return <div></div>;
  } else if (!data?.niggunim) {
    return <div>Something went wrong. Please try again.</div>;
  }
  return (
    <Wrapper>
      <Header>Niggunim</Header>
      <NiggunList tracks={data.niggunim} />
    </Wrapper>
  );
};

export default Home;
