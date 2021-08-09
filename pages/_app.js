import "./_app.css";
import { prefix } from "../config/config";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} prefix={prefix} />;
}

export default MyApp;
