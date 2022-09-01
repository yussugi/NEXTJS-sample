import { useState, useEffect } from "react";

const SayHello = () => {
  // 内部状態を持つためuseState利用
  const [data, setData] = useState({ name: "" });
  // 外部APIリクエストをuseEffect内で処理(副作用)
  useEffect(() => {
    // pages/api/hello.tsにリクエスト
    fetch("api/hello")
      .then((res) => res.json())
      .then((profile) => {
        setData(profile);
      });
  }, []);
  return <div>hello {data.name}</div>;
};

export default SayHello;
