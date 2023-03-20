import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inconsolata } from "next/font/google";

import { api } from "~/utils/api";

import { Toaster } from "react-hot-toast";
import "~/styles/globals.css";

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata",
  display: "swap",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <style jsx global>
        {`
          :root {
            --font-inconsolata: ${inconsolata.style.fontFamily};
          }
        `}
      </style>
      <main>
        <Component {...pageProps} />
        <Toaster
          toastOptions={{
            duration: 8000,
          }}
        />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
