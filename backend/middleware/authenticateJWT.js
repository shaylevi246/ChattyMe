const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded.user;
      next();
    } catch (err) {
      return res.status(401).json({ msg: "Token is not valid" });
    }
  } else {
    res.sendStatus(401);
  }
};

module.exports = authenticateJWT;
