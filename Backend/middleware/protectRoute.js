import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorised-No token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded user: " + decoded.Id);
    console.log("decoded token: ", decoded);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorised-Invalid token" });
    }

    const user = await User.findById(decoded.Id).select("-password");
    console.log("the user is", user);

    if (!user) {
      return res.status(404).json({ error: "User not Found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("error is protectRoute", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoute;
