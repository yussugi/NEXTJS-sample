import { NextPage } from "next";
import Image from "next/image";

// 画像ファイルのインポート
import DiagramImage from "../public/images/frontend_backend_diagram.svg";

const ImageSample: NextPage<void> = (props) => {
  return (
    <div>
      <h1>画像表示の比較</h1>
      <p>imgタグで表示した場合</p>
      {/* 通常のimgタグを使用して画像を表示 */}
      <img src='/images/frontend_backend_diagram.svg' alt='default img tag' />
      <p>Imageコンポーネントで表示した場合</p>
      {/* パスを指定する代わりにインポートした画像を指定 */}
      <Image src={DiagramImage} alt='Using Image Component' />
      <p>Imageで表示した場合は事前に描画エリアが確保される</p>
    </div>
  );
};

export default ImageSample;
