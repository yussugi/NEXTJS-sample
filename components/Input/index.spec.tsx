import {
  render,
  screen,
  RenderResult,
  fireEvent,
  getByRole,
} from "@testing-library/react";
import { Input } from "./index";

// describeで処理をまとめる
describe("Input", () => {
  let renderResult: RenderResult;

  // それぞれのテストケース前にコンポーネントを描画し、renderResultにセットする
  beforeEach(() => {
    renderResult = render(<Input id='username' label='Username' />);
  });

  // テストケース実行後に描画していたコンポーネントを開放する
  afterEach(() => {
    renderResult.unmount();
  });

  // 初期描画時にinput要素が空であることをテスト(itを利用)
  it("should empty in input on initial render", () => {
    // labelがUsernameであるコンポーネントに対応するinputの要素を取得する
    const inputNode = screen.getByLabelText("Username") as HTMLInputElement;

    // input
    expect(inputNode).toHaveValue("");
  });

  // 文字を入力したら入力した内容が表示されるかテスト
  it("should show input text", () => {
    const inputText = "Test Input Text";
    const inputNode = screen.getByLabelText("Username") as HTMLInputElement;

    // fireEventを使ってinput要素のonChangeイベントを発火
    // fireEvent第一引数にinputのDOM, 第二引数のオブジェクトの中に入力する文字列を指定
    fireEvent.change(inputNode, { target: { value: inputText } });

    // input要素に入力したテキストが表示されているか確認
    expect(inputNode).toHaveValue(inputText);
  });

  // ボタンが押されたら入力テキストがクリアされるかテスト
  it("should reset when user cliks button", async () => {
    // 最初にinputにテキスト入力
    const inputText = "Test Input Text";
    const inputNode = screen.getByLabelText("Username") as HTMLInputElement;
    fireEvent.change(inputNode, { target: { value: inputText } });

    // ボタン取得(getByRoleでDOM取得)
    // getByRole関数の第二引数オブジェクトにボタンで表示しているテキストを指定
    const buttonNode = screen.getByRole("button", {
      name: "Reset",
    }) as HTMLButtonElement;

    // ボタンをクリックする(clickイベント発火)
    fireEvent.click(buttonNode);
    // input要素の表示が空か確認
    expect(inputNode).toHaveValue("");
  });
});
