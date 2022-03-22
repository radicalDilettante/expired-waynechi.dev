import styles from "../style/portfolio.module.css";
import Head from "next/head";

interface IProps {
  prefix: string;
}

export default function Portfolio({ prefix }: IProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Portfolio - WayneChoi.dev</title>
        <meta name="author" content="Wayne Choi" />
        <meta name="description" content="Portfolio of Wayne Choi." />
        <meta
          name="keywords"
          content="javascript, react, frontend, developer"
        />
      </Head>

      <div className={styles.box}>
        <img src={prefix + "screenshot/skilled_kiwi.jpg"} alt="skilled_kiwi" />
        <div className={styles.contents}>
          <h3>Skilled Kiwi (still in development)</h3>
          <p>
            This service is a platform designed to connect skilled individuals
            with those in need of their help.
          </p>
          <ul>
            <li>
              <a href="https://skilledkiwi.netlify.app" target="_blank">
                skilledkiwi.netlify.app(demo)
              </a>
            </li>
            <li>
              Repository{" "}
              <a
                href="https://github.com/radicalDilettante/skilled_kiwi_client"
                target="_blank"
              >
                Frontend
              </a>{" "}
              /{" "}
              <a
                href="https://github.com/radicalDilettante/skilled_kiwi_server"
                target="_blank"
              >
                Backend
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.box}>
        <img src={prefix + "screenshot/dropper.jpg"} alt="skilled_kiwi" />
        <div className={styles.contents}>
          <h3>Color Dropper</h3>
          <p>
            This service is a tool application to pick color from any website or
            pictures.
          </p>
          <ul>
            <li>
              <a href="https://colordropper.netlify.app/" target="_blank">
                colordropper.netlify.app
              </a>
            </li>
            <li>
              Repository{" "}
              <a
                href="https://github.com/radicalDilettante/dropper"
                target="_blank"
              >
                Link
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.box}>
        <img src={prefix + "screenshot/waynechoi_dev.jpg"} alt="skilled_kiwi" />
        <div className={styles.contents}>
          <h3>WayneChoi.dev</h3>
          <p>
            It is a static blog site generated with Next.js. Posts are written
            by markdown, and parsed to JSX.
          </p>
          <ul>
            <li>
              <a href="https://waynechoi.dev/" target="_blank">
                https://waynechoi.dev
              </a>
            </li>
            <li>
              Repository{" "}
              <a
                href="https://github.com/radicalDilettante/waynechoi.dev"
                target="_blank"
              >
                Link
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <div className={styles.box}>
          <div className={styles.contents}>
            <h3>NeoQuery</h3>
            <p>
              It is a fast and small JavaScript library to traversal and
              manipulate the HTML DOM (Document Object Model) with simple
              syntax.
            </p>
            <ul>
              <li>
                Repository{" "}
                <a
                  href="https://github.com/radicalDilettante/neoquery"
                  target="_blank"
                >
                  Link
                </a>
              </li>
              <li>
                npm{" "}
                <a
                  href="https://www.npmjs.com/package/neoquery"
                  target="_blank"
                >
                  Link
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
