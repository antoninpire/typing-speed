import type { NextPage } from "next";
import Link from "next/link";
import Footer from "~/components/Footer";
import Head from "~/components/Head";
import Header from "~/components/Header";

const FourOhFourPage: NextPage = () => {
  return (
    <>
      <Head title="Page not found" />
      <main className="flex h-screen w-screen flex-col items-center justify-center bg-background">
        <div className="max-w-4xl">
          <Header showPreferences={false} title="Page not found" />
          <div className="flex flex-col items-center">
            <h1 className="text-[145px] font-extrabold leading-[135px] text-primary">
              404
            </h1>
            <p className="text-lg text-white">¯\_(ツ)_/¯</p>
            <h3 className="mt-2 text-4xl text-white">Page Not Found</h3>
            <Link
              href="/"
              className="mt-3 text-2xl font-semibold text-white underline decoration-white decoration-dashed underline-offset-8 hover:text-primary"
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
