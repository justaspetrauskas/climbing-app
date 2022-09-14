import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import dbConnect from "../../../lib/dbConnect";
import handler from "../../../lib/handler";
import Route from "../../../models/Route";

interface ResponseData {
  error?: string;
  msg?: string;
}
// new route /api/lines
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // connect to db
    await dbConnect();
    // check if user exist by user id
    const user = await User.findById(JSON.parse(req.body).author);
    if (user) {
      const newRoute = new Route(JSON.parse(req.body));
      await newRoute.save();
      console.log("success", newRoute.title);
      res.status(200);
    }
  } catch (err) {
    console.log(err);
  }
});

export default handler;
