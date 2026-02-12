import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.sendStatus(401);

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const accessToken = jwt.sign(
      { id: payload.id, role: payload.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );
    const userData = {
      id: payload.id,
      role: payload.role,
    };
    console.log( "Refresh token created access token");
    res.status(200).json({
      accessToken,
      userData,
    });
  } catch (error) {
    res.sendStatus(401);
  }
});

export default router;
