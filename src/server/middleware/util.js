const jwt = require("jsonwebtoken");

async function verify(req, res, next) {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).send({ msg: "No token provided, NOT AUTHORIZED!" });
    return;
  }
  //only extract token from header
  const [_, token] = bearer.split(" ");
  //const token = bearer.slice(7) ;
  if (!token) {
    res.status(401).send({ msg: "No token provided, NOT AUTHORIZED!" });
    return;
  }

  //is this token valid?
  try {
    const secretKey = process.env.JWT_SECRET;
    const user = jwt.verify(token, secretKey);

    req.user = user;

    console.log("req", req);
    next();
  } catch (error) {
    res.status(401).send({ msg: "Access Denied. Not Authorized!" });
  }
};

const isAdmin = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.isAdmin){
      next();
    }else{
      res.status(403).send("Access Denied. Not Authorized!");
    }
  });
};

module.exports = {verify, isAdmin};
