import React from "react";
import Head from "next/head";

import DefaultLayout from "@/layout/DefaultLayout";

const IndexPage = props => {
  return (
    <div>
      <Head>
        <title>Ken Code Blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1" />
        <meta name="description" content="Js, React and GCP blog" />
        <meta name="keywords" content="engineer" />
        <meta name="theme-color" content="#317EFB" />

        <link rel="manifest" href="/manifest.json" />
        <link href="/icons/favicon-16x16-dunplab-manifest-28429.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/icons/favicon-32x32-dunplab-manifest-28429.png" rel="icon" type="image/png" sizes="32x32" />
        <link href="/icons/apple-icon-60x60-dunplab-manifest-28429.png" rel="apple-touch-icon" type="image/png" sizes="60x60" />
      </Head>
      <DefaultLayout />
    </div>
  );
}

export default IndexPage;