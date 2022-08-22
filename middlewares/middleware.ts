import nextConnect from "next-connect";
import dbConnection from "../lib/connection";

const middleware = nextConnect();

middleware.use(dbConnection);

export default middleware;
