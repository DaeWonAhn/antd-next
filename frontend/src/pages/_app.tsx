import type { AppProps } from "next/app";

import Layout from "@/components/Layout";
import { GlobalContextProvider } from "@/contexts/global";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalContextProvider>
  );
}
