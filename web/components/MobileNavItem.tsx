import React from 'react';
import Link from 'next/link';
import { useApolloClient } from '@apollo/client';
import { LogoutMutationFn } from '../generated/graphql';

type Props = {
  link: string;
  logout: LogoutMutationFn;
};

const MobileNavItem: React.FC<Props> = ({ children, link, logout }) => {
  const apolloClient = useApolloClient();
  if (link === '_logout') {
    return (
      <div
        className='cursor-pointer border-b-2 py-3 pl-2'
        onClick={async () => {
          await logout();
          await apolloClient.resetStore();
        }}
      >
        Logout
      </div>
    );
  }
  return (
    <div className='cursor-pointer border-b-2 py-3 pl-2'>
      <Link href={link}>{children}</Link>
    </div>
  );
};

export default MobileNavItem;
