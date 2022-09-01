// 型を利用するためにインポート
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
// next/routerからuseRouterフックを取り込む
import { useRouter } from "next/router";

type PostProps = {
  id: string;
};

const Post: NextPage<PostProps> = (props) => {
  const { id } = props;
  const router = useRouter();

  if (router.isFallback) {
    // フォールバックページ向けの表示を返す
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <p>このページは静的サイト生成によってビルド時に生成されたページです</p>
        <p>{`/posts/${id}に対応するページです`}</p>
      </main>
    </div>
  );
};

// getStaticPathsは生成したいページのパスパラメーターの組み合わせを返す
// このファイルはpages/posts/[id].tsxなので、パスパラメーターとしてidの値を返す必要がある
export const getStaticPaths: GetStaticPaths = async () => {
  // それぞれのページのパスパラメーターをまとめたもの
  const paths = [
    {
      params: {
        id: "1",
      },
    },
    {
      params: {
        id: "2",
      },
    },
    {
      params: {
        id: "3",
      },
    },
  ];

  // fallbackをfalseにするとpathsで定義されたページ以外は404ページを表示する
  return { paths, fallback: false };
};

// getStaticPaths実行後にそれぞれのパスに対してgetStaticPropsが実行される
export const getStaticProps: GetStaticProps = async (context) => {
  // context.paramsにパスパラメーターの値が入っている
  // context.params['id']は string | string[] 型なので値が配列かどうかで場合分けする
  // contextにはオプショナルチェーン(?.)を利用すること
  const id = Array.isArray(context.params?.["id"])
    ? context.params?.["id"][0]
    : context.params?.["id"];
  // const id = context.params?.id;

  return {
    props: {
      id,
    },
  };
};

export default Post;
