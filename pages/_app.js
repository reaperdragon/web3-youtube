import { ApolloClient } from "@apollo/client";
import "../styles/globals.css";
import client from "../client";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloClient client={client}>
      <Component {...pageProps} />
    </ApolloClient>
  );
}

export default MyApp;
