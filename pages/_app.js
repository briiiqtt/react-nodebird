import "antd/dist/antd.css";
import Head from "next/head";

import wrapper from "../store/configureStore";

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

export default wrapper.withRedux(App);
