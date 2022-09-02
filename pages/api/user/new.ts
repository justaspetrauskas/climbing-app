import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import database from "../../../middlewares/database.middleware";
import User from "../../../models/User";
import dbConnect from "../../../lib/dbConnect";
import handler from "../../../lib/handler";

import { z } from "zod";
import { JWTAuthenticate } from "../../../lib/jwtTools";

// handler.use(database);

interface ResponseData {
  error?: string;
  msg?: string;
}

const validation = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm,
};

const validateForm = async (email: string, password: string) => {
  const Form = z.object({
    email: z.string().trim().email({ message: "Invalid email address" }),
    password: z
      .string()
      .trim()
      .min(6, { message: "Must be 6 or more characters long" })
      .regex(validation.password),
  });

  const validationResult = Form.safeParse({ email, password });
  return validationResult;
};

// new user /api/users
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // await dbConnect();
    const { name, username, password, email } = JSON.parse(req.body);
    console.log(req.body, email);
    //validation
    let validationResult = await validateForm(email, password);
    if (validationResult.success) {
      // connect to db()
      await dbConnect();
      const newUser = new User(JSON.parse(req.body));
      const { accessToken, refreshToken } = await JWTAuthenticate(newUser);
      console.log(accessToken, refreshToken);
      await newUser.save();
      console.log("Saved User", newUser);
      res.status(200).send({ accessToken, refreshToken });
    } else {
      return res.status(400).json(validationResult.error.issues);
    }

    // const newUser = new User(JSON.parse(req.body));
  } catch (err) {
    console.log(err);
  }

  // check if email existed
  // if ((await req.db.collection('users').countDocuments({ email })) > 0) {
  //   res.status(403).send('The email has already been used.');
  // }
});

export default handler;
