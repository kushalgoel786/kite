import { StatusCodes } from "http-status-codes";
import { User } from "../server.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/index.js";
import { createJWT } from "../utils/tokenUtils.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ where: { id: req.user.userId } });
  let resp = {
    user_id: "AB1234",
    user_type: "individual",
    email: "xxxyyy@gmail.com",
    user_name: "AxAx Bxx",
    broker: "ZERODHA",
  };

  if (user) {
    resp = { ...resp, email: user.email, user_name: user.name };
  }

  res.status(StatusCodes.OK).json({ user: resp });
};

export const register = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);

  const token = createJWT({ userId: user.id });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.CREATED).json({ msg: "Registration Successful" });
};

export const login = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError("Invalid credentials");

  const token = createJWT({ userId: user.id });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "Login Successful" });
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "Logout Successful" });
};
