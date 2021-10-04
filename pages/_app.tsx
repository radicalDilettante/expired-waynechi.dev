import "./_app.css";
import { AppProps } from "next/app";
import Layout from "../components/layout";
import { assetPrefix } from "../next.config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout prefix={assetPrefix}>
      <Component {...pageProps} prefix={assetPrefix} />
    </Layout>
  );
}

export default MyApp;
