import type { NextPage } from "next";
import Footer from "~/components/Footer";
import Head from "~/components/Head";
import Header from "~/components/Header";
import Leaderboard from "~/components/Leaderboard";

const LeaderboardPage: NextPage = () => {
  return (
    <>
      <Head title="Leaderboard" />
      <main className="flex h-screen w-screen flex-col items-center bg-background">
        <div className="max-w-4xl">
          <Header showPreferences={false} title="Leaderboard" />
          <div className="no-scrollbar overflow-x-hidden overflow-y-scroll pt-24">
            <Leaderboard />
          </div>
          <Footer links={[{ href: "/", label: "home" }]} />
        </div>
      </main>
    </>
  );
};

export default LeaderboardPage;
