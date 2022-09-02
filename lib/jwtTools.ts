import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/User";

export const JWTAuthenticate = async (user: IUser) => {
  const accessToken = await generateJWT({ _id: user._id });
  const refreshToken = await generateRefreshJWT({ _id: user._id });

  // const authUser = await UserModel.findOne(user);

  const tokens: any = { accessToken, refreshToken };
  if (tokens) user.tokens = tokens;
  await user.save();
  return { accessToken, refreshToken };
};

export const generateJWT = (payload: JwtPayload) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      { expiresIn: "1 day" },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    )
  );

export const verifyJWT = (token: string) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET!, (err, decodedToken) => {
      if (err) reject(err);
      resolve(decodedToken);
    });
  });

export const generateRefreshJWT = (payload: JwtPayload) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "1 week" },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    )
  );

export const verifyRefreshJWT = (token: string) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_REFRESH_SECRET!, (err, decodedToken) => {
      if (err) reject(err);
      resolve(decodedToken);
    });
  });

export const verifyRefreshAndGenerateTokens = async (
  actualRefreshToken: string
) => {
  // 1. Check the validity (exp date and integrity)
  const decodedRefreshToken: any = await verifyRefreshJWT(actualRefreshToken);

  // 2. If the token is valid we are going to check if it is in db
  const user = await User.findById(decodedRefreshToken._id);

  if (!user) {
    console.log("user not found");
  } else {
    // 3. If we find the token we need to compare it to the actualRefreshToken
    if (
      user.tokens.refreshToken &&
      user.tokens.refreshToken === actualRefreshToken
    ) {
      // 4. If everything is fine we are going to generate a new pair of tokens (and we are storing new refreshtoken in db)

      const { accessToken, refreshToken } = await JWTAuthenticate(user);

      // 5. Return the tokens
      return { accessToken, refreshToken };
    } else console.log("error");
  }
};
