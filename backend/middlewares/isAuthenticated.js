const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  const token= req.cookies.token
  if(!token){
    return res.status(401).json({
      success: false,
      message: "Token not found",
    });
  }

  const verifyToken = jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) {
        return false;
      } else {
        return decoded;
      }
    }
  );

  if (verifyToken) {
    req.user = {
      id: verifyToken.id,
      name: verifyToken.name,
      role:verifyToken.isAdmin?"admin":"user",
    };
    next();
  } else {
    res.clearCookie("token");
    return req.status(401).json({
      success: false,
      message: "Token invalid , Login again",
      err,
    });
  }
};

module.exports = isAuthenticated;
