import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Footer from "~/components/Footer";
import Head from "~/components/Head";
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
      <Head title="Profile" />
      <main className="flex h-screen w-screen flex-col items-center bg-background">
        <div className="h-full w-[48rem]">
          <Header
            showPreferences={false}
            title={`${
              session?.user.id === id
                ? "your"
                : `${data?.user?.username ?? ""}'s`
            } profile`}
          />
          <div className="no-scrollbar overflow-x-hidden overflow-y-scroll pt-24">
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
