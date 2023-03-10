import "@/styles/globals.css";
import Layout from "../components/Layout";
import type { AppProps } from "next/app";
import wrapper from "../lib/store/configureStore";
import PropTypes from "prop-types";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
