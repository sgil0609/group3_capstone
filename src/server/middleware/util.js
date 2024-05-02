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
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    console.log("req", req);
    next();
  } catch (error) {
    res.status(401).send({ msg: "Invalid Token!" });
  }
}

module.exports = verify;
