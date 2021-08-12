import "./_app.css";
import Layout from "../components/layout";
import { prefix } from "../config/config";

function MyApp({ Component, pageProps }) {
  const date = new Date();
  return (
    <Layout year={date.getFullYear()}>
      <Component {...pageProps} prefix={prefix} />
    </Layout>
  );
}

export default MyApp;
