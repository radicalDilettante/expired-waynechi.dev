import "./_app.css";
import Layout from "../components/layout";
import { assetPrefix } from "../next.config";

function MyApp({ Component, pageProps }) {
  const date = new Date();
  return (
    <Layout year={date.getFullYear()} prefix={assetPrefix}>
      <Component {...pageProps} prefix={assetPrefix} />
    </Layout>
  );
}

export default MyApp;
