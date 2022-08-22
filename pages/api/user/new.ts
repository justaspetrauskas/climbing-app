import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import middleware from "../../../middlewares/middleware";
import next from "next";
import database from "../../../middlewares/database";
import User from "../../../models/user";

const handler = nextConnect();
handler.use(database);

// POST /api/users
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, username, password, email } = req.body;

    const newUser = new User(JSON.parse(req.body));

    await newUser.save();
    console.log("Saved User", newUser);
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
  }

  // check if email existed
  // if ((await req.db.collection('users').countDocuments({ email })) > 0) {
  //   res.status(403).send('The email has already been used.');
  // }
});

export default handler;
