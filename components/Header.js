import Head from "next/head";
import TopNav from "@/components/TopNav";

const Header = props => {
  const {
    title = "肯游扣部落格 | Yu Ken Code Blog",
    description = "紀錄自身學習程式歷程，從體能教練轉職成為前端工程師",
    sharingTitle = "從體能教練轉職前端工程師、不斷自學精進和熱愛用技術去解決身邊的問題｜Yu Ken Code Blog",
    isSecondTitle = false,
    img = "/article-img/hook.jpg"
  } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
        />
        <meta content={description} name="description" />
        <meta content={sharingTitle} property="og:title" />
        <meta content={description} property="og:description" />
        <meta content="article" property="og:type" />
        <meta property="og:image" content={img} />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height " content="200" />
        <meta content={sharingTitle} property="twitter:title" />
        <meta content={description} property="twitter:description" />
        <meta name="keywords" content="前端工程師、轉職、自學、體能教練" />
        <meta name="theme-color" content="#317EFB" />
        <meta
          name="google-site-verification"
          content="H1MEre3sIZnXcRdwbgmTNEm94vKd3SkjiLnPcYUaEKw"
        />

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16-dunplab-manifest-28429.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32-dunplab-manifest-28429.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link
          href="/icons/apple-icon-60x60-dunplab-manifest-28429.png"
          rel="apple-touch-icon"
          type="image/png"
          sizes="60x60"
        />
      </Head>
      <TopNav isSecondTitle={isSecondTitle} />
    </>
  );
};

export default Header;
