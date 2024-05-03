const jwt = require("jsonwebtoken");

// Verify Token

function verifyToken(req, res, next) {

    // get token from header
  const authToken = req.headers.authorization;

  if (authToken) {
    const token = authToken.split(" ")[1];
    try {
      // used to decode token which have 2 parts header and payload (id and isAdmin)
      // verify token by token & secret key

      const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
      
      // add user to req object which contain id and isAdmin
      req.user = decodedPayload;

      next();
    } catch (error) {
        // 401 Unauthorized
      return res.status(401).json({ message: "invalid token , access denied" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "no token provided , access denied" });
  }
}



// Verify Token & Admin

function verifyTokenAndAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: "Access Denied , Only Admin can access" });
        }
    });
}

// verify token & Only user Himself

function verifyTokenOnlyuser(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      // 403 Forbidden
      return res
        .status(403)
        .json({ message: `Not Allowed ⚠☢ , Only user Himself` });
    }
  });
}

module.exports = {
    verifyToken , 
    verifyTokenAndAdmin ,
    verifyTokenOnlyuser
}