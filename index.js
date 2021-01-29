import React from "react";
import Head from 'next/head'

import DefaultLayout from "@/layout/DefaultLayout";

const IndexPage = props => {
  return (
    <div>
      <Head>
        <title>Ken Blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charset='utf-8' />
        <meta http-equiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
        <meta name='description' content='Description' />
        <meta name='keywords' content='Keywords' />
        <meta name='theme-color' content='#317EFB' />

        <link rel='manifest' href='/manifest.json' />
        <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
        <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
        <link href='/apple-icon.png' rel='apple-touch-icon'></link>
      </Head>
      <DefaultLayout />
    </div>
  );
}

export default IndexPage;