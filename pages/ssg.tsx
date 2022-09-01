// 型のために導入
import { GetStaticProps, NextPage, NextPageContext } from "next";
// Next.jsの組み込みコンポーネント
import Head from "next/head";
// Linkコンポーネント
import Link from "next/link";

// ページコンポーネントのprops型定義(ここでは空にする)
type SSGProps = {
  message: string;
};

// SSG向けページ実装
// NextPageはNext.jsのPages向けの型
// NextPage<props>でpropsが入るPageであることを明示
const SSG: NextPage<SSGProps> = (props) => {
  const { message } = props;

  return (
    <div>
      {/* Headコンポーネントで包むと、その要素は<head>タグに配置される */}
      <Head>
        <title>Static Site Generation</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <p>
          このページは静的サイト生成(SSG)によってビルド時に生成されたページです
        </p>
        <p>{message}</p>
        <br />
        {/* /ssrへの遷移リンク: aタグをLinkコンポーネントでラップ */}
        <Link href='/ssr'>
          <a>GO TO SSR Page</a>
        </Link>
      </main>
    </div>
  );
};

// getStaticPropsはビルド時に実行される(export必須/asyncで非同期にすること/引数はcontext)
// GetStaticProps<SSGProps>はSSGPropsを引数にとるgetStaticPropsの型
export const getStaticProps: GetStaticProps<SSGProps> = async (context) => {
  const timestampSSG = new Date().toLocaleString();
  const message = `${timestampSSG}にgetStaticPropsが実行されました`;
  console.log(message);
  return {
    // ここで返したpropsを元にページコンポーネントを描画
    props: {
      message,
    },
  };
};

// ページコンポーネントはexport defaultでエクスポート
export default SSG;
