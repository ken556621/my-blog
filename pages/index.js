import React from "react";
import Head from 'next/head'

import DefaultLayout from "@/layout/DefaultLayout";


const IndexPage = props => {
  return (
    <div>
      <Head>
        <title>Ken Blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DefaultLayout />
    </div>
  );
}

export default IndexPage;