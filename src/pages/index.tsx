import { type NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";

const Game = dynamic(() => import("~/components/Game/Game"), {
  ssr: false,
});

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Typing Speed</title>
        <meta
          name="description"
          content="A typing speed game to measure your WPM"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-screen flex-col items-center justify-center bg-background">
        <Game />
      </main>
    </>
  );
};

export default HomePage;
