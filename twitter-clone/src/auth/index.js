import React from 'react';

import { Databases } from 'appwrite';
import appwriteClient from './@/libs/appwrite';

import Feed from '@/components/Feed';
import MainLayout from '@/components/Layouts/MainLayout';

export default function Home({ tweets }) {
  return (
    <MainLayout>
      <Feed tweets={tweets.documents} />
    </MainLayout>
  );
}

export async function getServerSideProps() {
  const databases = new Databases(appwriteClient);

  const tweets = await databases.listDocuments(
    '64b6588607ed06d7d223',
    '64b658954384058d2432'
  );
  return {
    props: { tweets }, // will be passed to the page component as props
  };
}