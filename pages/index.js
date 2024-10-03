import Head from "next/head";
import styles from "../styles/Home.module.css";
import { AccountsApi } from "../api/api";
import { BASE_PATH } from "../api/base";
import { useEffect, useState } from "react";
import axios from "axios";
import { Configuration } from "../api/configuration";

const getApiConfig = () =>
  new Configuration({ basePath: "http://localhost:8080" });

const Axios = axios.create();

export default function Home() {
  const [json, setJson] = useState({});
  useEffect(() => {
    const accountsApi = new AccountsApi(getApiConfig(), BASE_PATH, Axios);
    accountsApi.listAccounts1().then((data) => {
      setJson(data.data);
      console.log(data.data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Test OpenAPI generators</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Query accounts via OpenAPI generator code
        </h1>

        <pre className={styles.description}>
          {JSON.stringify(json, null, 4)}
        </pre>
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
