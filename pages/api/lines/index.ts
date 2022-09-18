import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import handler from "../../../lib/handler";

// models
import Route from "../../../models/Route";

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //get user location
    // console.log(req.query);
    // const { lat, lng } = req.query;
    // connect to db
    console.log(req.body);
    await dbConnect();

    const routes = await Route.find().populate({
      path: "author",
      select: { name: 1 },
    });
    res.status(200).send(routes);
  } catch (err) {
    console.log(err);
  }
});

export default handler;
