import "antd/dist/antd.css";
import Head from "next/head";

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>nodebird</title>
      </Head>
      <Component></Component>
    </>
  );
};

export default App;
