import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import dbConnect from "../../../lib/dbConnect";
import handler from "../../../lib/handler";

// new user /api/users/me
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // extract tokens
    console.log("Server", req.cookies);
    res.status(200);
  } catch (err) {
    console.log(err);
  }
});

export default handler;
