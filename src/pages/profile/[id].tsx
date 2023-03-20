import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import Profile from "~/components/Profile";
import { api } from "~/utils/api";

const ProfilePage: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const { data } = api.test.getByUserId.useQuery(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    { userId: id?.toString() ?? "" },
    { enabled: router.isReady }
  );

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
        <div className="w-[48rem]">
          <Header
            showPreferences={false}
            title={`${
              session?.user.id === id
                ? "your"
                : `${data?.user?.username ?? ""}'s`
            } profile`}
          />
          <div className="no-scrollbar max-h-[80vh] overflow-x-hidden overflow-y-scroll pt-24">
            <Profile />
          </div>
          <Footer
            links={[
              { href: "/", label: "home" },
              { href: "/leaderboard", label: "leaderboard" },
            ]}
          />
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
