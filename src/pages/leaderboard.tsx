import type { NextPage } from "next";
import Head from "next/head";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import Leaderboard from "~/components/Leaderboard";

const LeaderboardPage: NextPage = () => {
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
      <main className="flex h-screen w-screen flex-col items-center bg-background">
        <div className="max-w-4xl">
          <Header showPreferences={false} title="Leaderboard" />
          <div className="no-scrollbar max-h-[80vh] overflow-x-hidden overflow-y-scroll pt-24">
            <Leaderboard />
          </div>
          <Footer links={[{ href: "/", label: "home" }]} />
        </div>
      </main>
    </>
  );
};

export default LeaderboardPage;
