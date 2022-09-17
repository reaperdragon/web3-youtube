import { useRouter } from "next/router";
import { useEffect } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {

  return <Component {...pageProps} />;
}

export default MyApp;
