const jwt = require("jsonwebtoken");
const User = require("../Modals/userModal");

// USER AUTH
const Auth = async (req, res, next) => {
 
  try {
    const { authorization } = req.headers;
    console.log(authorization)
    //bearer
    if (!authorization) {
      return res.status(401).json({ error: "Unauthorized Access" });
    }
    const token = authorization.replace("Bearer ","");
    const resp = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("resp: ", resp)
    const { id } = resp;
    const userExist = await User.findById({ _id:id });
if(userExist){
  req.user = userExist;
  next();
}
    
  } catch (error) {
    res.status(500).send({ messaage: "Server error" });
  }
};


module.exports = Auth;
