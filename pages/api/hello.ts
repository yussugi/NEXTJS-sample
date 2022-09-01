// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type HelloResponse = {
  name: string;
};

// /api/helloで呼ばれたときのAPIの挙動実装
export default (req: NextApiRequest, res: NextApiResponse<HelloResponse>) => {
  // ステータス200で{"name": "John Doe"}を返す
  res.status(200).json({ name: "John Doe" });
};
