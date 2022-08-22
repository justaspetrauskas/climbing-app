import mongoose, { ConnectOptions, Model } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

const { MONGODB_URI } = process.env;

async function dbConnect() {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    console.log("DB connected");
    return;
  }
  mongoose.connection.on("connected", () => {
    console.log("connected to mongo db");
  });
  // mongoose.connection.on("error", (err) => {
  //   console.log(`db connection problem`, err.message);
  // });

  const dbConnection = await mongoose
    .connect(
      MONGODB_URI as string,
      {
        useNewUrlParser: true,
      } as ConnectOptions
    )
    .catch((err) => console.log(err));

  return dbConnection;
}

export default dbConnect;

// connection function
// const dbConnect =
//   (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
//     /* check if we have connection to our databse*/
//     if (mongoose.connections[0].readyState) {
//       return;
//     }
//     const conn = await mongoose
//       .connect(MONGODB_URI as string)
//
//     console.log("Mongoose Connection Established");

//     return conn;
//   };

// export default dbConnect;
