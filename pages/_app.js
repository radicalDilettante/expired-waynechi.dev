import "../styles/globals.css";
import Header from "../components/header";
import { PortfolioProvider } from "../context/context";
import { prefix } from "../config/config";

function MyApp({ Component, pageProps }) {
  return (
    <PortfolioProvider value={{ prefix }}>
      <Header />
      <Component {...pageProps} />
    </PortfolioProvider>
  );
}

export default MyApp;
