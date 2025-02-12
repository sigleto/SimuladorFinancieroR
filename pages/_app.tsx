// _app.tsx
import "../Estilos/Global.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import Navbar from "./Navbar";
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
