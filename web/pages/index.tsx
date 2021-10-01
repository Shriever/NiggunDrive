import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>NiggunDrive</title>
        <meta name='description' content='Niggunim' />
      </Head>

        <Navbar />
    </div>
  );
};

export default Home
