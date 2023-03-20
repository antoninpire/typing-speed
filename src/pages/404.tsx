import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Footer from "~/components/Footer";
import Header from "~/components/Header";

const FourOhFourPage: NextPage = () => {
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
        <div className="max-w-4xl">
          <Header showPreferences={false} title="Page not found" />
          <div className="flex flex-col items-center">
            <h1 className="text-[120px] font-extrabold text-text">404</h1>
            <Link
              href="/"
              className="text-2xl font-semibold text-text underline decoration-text decoration-wavy underline-offset-2 hover:text-primary"
            >
              Go back home
            </Link>
          </div>
          <Footer links={[{ href: "/", label: "home" }]} />
        </div>
      </main>
    </>
  );
};

export default FourOhFourPage;
