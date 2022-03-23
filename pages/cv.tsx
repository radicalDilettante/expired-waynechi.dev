/* eslint-disable react/no-children-prop */
import Head from "next/head";
import styles from "../style/cv.module.css";

export default function CV() {
  return (
    <div className={styles.container}>
      <Head>
        <title>CV - Wayne</title>
        <meta name="author" content="Wayne Choi" />
        <meta name="description" content="CV of Wayne Choi" />
        <meta
          name="keywords"
          content="javascript, react, frontend, developer"
        />
      </Head>
      <h1>Wayne | Web Developer</h1>
      <ul className={styles.contact}>
        <li>
          <img src="./images/icon/email.svg" />
          wonjun92@gmail.com
        </li>
        <li>
          <img src="./images/icon/phone.svg" />
          +64) 22 429 3707
        </li>
        <li>
          <img src="./images/icon/github.svg" />
          <a href="https://github.com/radicalDilettante" target="_blank">
            https://github.com/radicalDilettante
          </a>
        </li>
        <li>
          <img src="./images/icon/web.svg" />
          <a href="https://waynechoi.dev" target="_blank">
            https://waynechoi.dev
          </a>
        </li>
      </ul>

      <div>
        <h2>Introduce</h2>
        <p>
          I make web services in the morning and at night, and build boats as a
          full-time boat builder. I have achieved rapid growth for web
          development by splitting up the time I lack due to job and baby
          sitting over the past one year.
        </p>
        <p>
          I prefer readable code, and maintainable system. For those, I always
          try to separate implementations and interfaces. Recently, I have been
          struggling with the effecient way to modularize along with various
          dependencies from web frontend, like DOM, user interaction, and
          rendering libraries.
        </p>
        <p>
          I value background more than tools. Of course, I've studied the deep
          concepts of JavaScript, but I'm more interested in how the browser,
          web and network work. I'm also interested in studying lower levels,
          but right now, I'm trying to focus more on the web.
        </p>
      </div>

      <div>
        <h2>Projects</h2>
        <div className={styles.project}>
          <h3>Skilled Kiwi</h3>
          <p>
            This service is a platform designed to connect skilled individuals
            with those in need of their help.
          </p>
          <div className={styles.project_desc}>
            <b>Frontend</b>:{" "}
            <a
              href="https://github.com/radicalDilettante/skilled_kiwi_client"
              target="_blank"
            >
              https://github.com/radicalDilettante/skilled_kiwi_client
            </a>
            <ul>
              <li>React Application with Next.js.</li>
              <li>
                Reusable custom hooks with branching process against a variety
                of conditions.
              </li>
              <li>
                Context API to mange global statement, and SWR to cache Ajax
                response data.
              </li>
              <li>
                Authentication with JWT token. It stored in local storage.
              </li>
              <li>
                User input data are filltered and sanitzied before Ajax request
                with them.
              </li>
              <li>
                Unit test with Jest, and all modules are decopuled reasonably
                for the test.
              </li>
            </ul>
            <b>Backend</b>:{" "}
            <a
              href="https://github.com/radicalDilettante/skilled_kiwi_client"
              target="_blank"
            >
              https://github.com/radicalDilettante/skilled_kiwi_client
            </a>
            <ul>
              <li>Express application with MySQL database.</li>
              <li>
                While I am focusing on frontend more, I just implemented rest
                API endpoint just every time I need in a bottom-up approach.
              </li>
              <li>
                So I cannot guarantee quality of the code. I might build whole
                new application later on with other framework.
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.project}>
          <h3>WayneChoi.dev</h3>
          <div className={styles.project_desc}>
            <b>Repository</b>:{" "}
            <a
              href="https://github.com/radicalDilettante/skilled_kiwi_client"
              target="_blank"
            >
              https://github.com/radicalDilettante/skilled_kiwi_client
            </a>
            <ul>
              <li>Static blog site generated with Next.js</li>
              <li>Posts are written by markdown, and parsed to JSX.</li>
              <li>Animation with canvas 2d APIs.</li>
              <li>Implement command line rendering for blog contents</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h2>Skills</h2>
        <ul>
          <li>
            <b>Frontend</b>: HTML/CSS, JavaScript, TypeScript, React.js, Next.js
          </li>
          <li>
            <b>Backend</b>: Node.js, Express, Nest.js
          </li>
          <li>
            <b>Database</b>: MYSQL, MongoDB
          </li>
        </ul>
      </div>

      <div>
        <h2>Work Experience</h2>
        <div className={styles.table}>
          <div className={styles.table_subject}>
            <p className={styles.company}>Rayglass Boats</p>
            <p className={styles.date}>Jul 2018 - Present</p>
          </div>
          <ul>
            <li>Boat Builder</li>
            <li>RIB building for Coastguard and Emirates Team New Zealand</li>
            <li>
              Laminating, Trouble shooting, Assembly, Fit-out (electrical,
              engineering)
            </li>
          </ul>
        </div>

        <div className={styles.table}>
          <div className={styles.table_subject}>
            <p className={styles.company}>Yachting Developments</p>
            <p className={styles.date}>Aug 2016 - Jul 2018</p>
          </div>
          <ul>
            <li>Boat Builder</li>
            <li>Carbon super yacht building, Restoration sailing boats</li>
            <li>Laminating, Trouble shooting, Assembly, Detailing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
