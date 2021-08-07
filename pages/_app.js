import "./_app.css";
import { prefix } from "../config/config";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} prefix={prefix} />
    </Layout>
  );
}

export default MyApp;
