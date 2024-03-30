import Head from "next/head";
import Login from "~/components/Login";

export default function Home() {
  return (
    <>
      <Head>
        <title>Ecom</title>
        <meta name="description" content="Ecom app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </>
  );
}
