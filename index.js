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
        <meta name="description" content="談到學程式，有常見的3大迷思，非本科、跨領域無法學好程式？學了程式是不是只能當工程師？其實你能培養第二專長，成為T型人才。這個部落格紀錄自學轉職過程中的所學所聞。" />
        <meta content="從體能教練轉職前端工程師、不斷自學精進和熱愛用技術去解決身邊的問題｜Ken Code Blog" property="og:title" />
        <meta content="談到學程式，有常見的3大迷思，非本科、跨領域無法學好程式？學了程式是不是只能當工程師？其實你能培養第二專長，成為T型人才。這個部落格紀錄自學轉職過程中的所學所聞。" property="og:description" />
        <meta content="從體能教練轉職前端工程師、不斷自學精進和熱愛用技術去解決身邊的問題｜Ken Code Blog" property="twitter:title" />
        <meta content="談到學程式，有常見的3大迷思，非本科、跨領域無法學好程式？學了程式是不是只能當工程師？其實你能培養第二專長，成為T型人才。這個部落格紀錄自學轉職過程中的所學所聞。" property="twitter:description" />
        <meta name="keywords" content="前端工程師、轉職、自學、體能教練" />
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