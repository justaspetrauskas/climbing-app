import dbConnect from "../lib/connection";
import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

const database = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  try {
    await dbConnect();
  } catch (error: any) {
    console.log("Database connection error ", error.message);
  }
  next();
};

export default database;
