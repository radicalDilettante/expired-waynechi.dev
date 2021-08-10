import "./_app.css";
import Layout from "../components/layout";
import { prefix } from "../config/config";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} prefix={prefix} />
    </Layout>
  );
}

export default MyApp;
