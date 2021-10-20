import type { NextPage } from 'next';
import NiggunList from '../components/NiggunList';
import Wrapper from '../components/Wrapper';
import React from 'react';
import Header from '../components/Header';
import { useLikedNiggunimQuery } from '../generated/graphql';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useLikedNiggunimQuery();

  if (loading) {
    return <div>loading</div>;
  }
  if (!!error) {
    return (
      <Wrapper>
        <Header>
          Please
          <span className='text-green-500'>
            <Link href='/login'> Log In </Link>
          </span>
          to view this page
        </Header>
      </Wrapper>
    );
  }
  if (!data) {
    router.push('/');
    return <div></div>;
  }
  return (
    <Wrapper>
      <Header>My Liked Niggunim</Header>
      <NiggunList tracks={data.likedNiggunim} />
    </Wrapper>
  );
};

export default Home;
