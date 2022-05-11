import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserContext } from "../lib/context";
import { UseUserData } from "../lib/hooks";

function MyApp({ Component, pageProps }: AppProps) {
  const userData = UseUserData();
  return (
    <UserContext.Provider value={userData}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
