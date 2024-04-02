import Head from "next/head";
import Login from "~/views/Login";

const Home: React.FC = () => {
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
};

export default Home;
