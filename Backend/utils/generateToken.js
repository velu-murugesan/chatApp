import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (Id, res) => {
  const token = jwt.sign({ Id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  console.log("tokennis :", token);

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
