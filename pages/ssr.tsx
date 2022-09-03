import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { DelayInput } from "../components/DelayInput/index";

type SSRProps = {
  message: string;
};

const SSR: NextPage<SSRProps> = (props) => {
  const { message } = props;

  const router = useRouter();

  const reload = () => {
    router.reload();
  };

  const onChange = () => {};

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <p>
          このページはサーバーサイドレンダリングによってアクセス時にサーバーで描画されたページです。
        </p>
        <p>{message}</p>
        <br />
        <button onClick={reload}>reload</button>
        <br />
        <DelayInput onChange={onChange} />
      </main>
    </div>
  );
};

// getServerSidePropsはページへのリクエストがあるたびに実行される
export const getServerSideProps: GetServerSideProps<SSRProps> = async (
  context
) => {
  const timestamp = new Date().toLocaleString();
  const message = `${timestamp}にこのページのgetServerPropsが実行されました`;
  console.log(message);

  return {
    props: {
      message,
    },
  };
};

export default SSR;
