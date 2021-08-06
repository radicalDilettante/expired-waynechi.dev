import "./_app.css";
import { PortfolioProvider } from "../context/context";
import { prefix } from "../config/config";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <PortfolioProvider value={{ prefix }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PortfolioProvider>
  );
}

export default MyApp;
