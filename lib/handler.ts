import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

export default nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something happened: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(501).json({ error: `Method ${req.method} Not Allowed` });
  },
});
