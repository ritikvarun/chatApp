import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true, // prevent XSS attacks (cross-site scripting attacks)
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "none", // required for cross-domain cookie sharing (e.g. Vercel frontend + Azure backend)
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};