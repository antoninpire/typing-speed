import { type NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "~/components/Head";
import Loader from "~/components/Loader";

// Game has to be client only because it generates random words, and contents cannot match between server and client
const Game = dynamic(() => import("~/components/Game"), {
  ssr: false,
  loading: () => <Loader />,
});

const HomePage: NextPage = () => {
  return (
    <>
      <Head title="Typing Test" />
      <main className="flex h-screen w-screen flex-col items-center justify-center bg-background">
        <Game />
      </main>
    </>
  );
};

export default HomePage;
