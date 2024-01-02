import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Layout from "@/app/layout";
import { AuthContextProvider } from "@/context/AuthContext";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP>;

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({
  Component,
  pageProps,
  ...appProps
}: AppPropsWithLayout) {
  return (
    <AuthContextProvider>
      {appProps.router.pathname.includes("/dashboard/auth") ||
      !appProps.router.pathname.includes("/dashboard") ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </AuthContextProvider>
  );
}
