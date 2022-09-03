import React, { useState, useCallback, useRef } from "react";

type DelayInputProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const DelayInput = (props: DelayInputProps) => {
  const { onChange } = props;

  // 入力中か否かを保持する状態
  const [isTyping, setIsTyping] = useState(false);
  // inputに表示するテキストを保持する状態
  const [inputValue, setInputValue] = useState("");
  // spanに表示するテキストを保持する状態
  const [viewValue, setViewValue] = useState("");
  // タイマーを保持するRef
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // 入力中のフラグをセットする
      setIsTyping(true);
      // inputに表示するテキスト更新
      setInputValue(e.target.value);

      // timerRefに以前設定したタイマーがある場合は先に削除
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }

      // 1秒後に実行するタイマーのセット
      timerRef.current = setTimeout(() => {
        timerRef.current = null;

        // 入力中のフラグを解除する
        setIsTyping(false);
        // spanに表示するテキストを更新する
        setViewValue(e.target.value);
        // onChangeコールバックを呼ぶ
        onChange(e);
      }, 1000);
    },
    [onChange]
  );
  // spanに表示するテキスト
  const text = isTyping ? "入力中..." : `入力したテキスト：${viewValue}`;

  return (
    <div>
      {/* data-testidはテスト中だけ使用するID. 本番環境向けビルド時に削除可能. */}
      <input
        data-testid='input-text'
        value={inputValue}
        onChange={handleChange}
      />
      <span data-testid='display-text'>{text}</span>
    </div>
  );
};
