import Document, { DocumentContext, DocumentInitialProps } from "next/document";
import { ServerStyleSheet } from "styled-components";

// styled-components利用の準備
// デフォルトDocumentをMyDocumentで上書き
export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      // 初期値を流用
      const initialProps = await Document.getInitialProps(ctx);

      // initialPropsに加えてstyleを追加して返す
      return {
        ...initialProps,
        styles: [
          // もともとのstyle
          initialProps.styles,
          // styled-componentsのstyle
          sheet.getStyleElement(),
        ],
      };
    } finally {
      sheet.seal();
    }
  }
}
