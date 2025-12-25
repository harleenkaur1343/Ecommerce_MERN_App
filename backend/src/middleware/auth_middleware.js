import jwt from "jsonwebtoken";
//this middleware checks if the user trying to login is actual user by checking the token
//and confirming it has not been tampered with after decoding

//middlewre run before controller to check if the reuest is llowed or not

//step one - extrct the token prt from heder

const authmiddleware = (req, res, next) => {
  const tokenauthprt = req.headers.authorization;
  console.log(tokenauthprt);
  //check it is tampered or not
  if (!tokenauthprt || !tokenauthprt.startsWith("Bearer")) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = tokenauthprt.split(" ")[1];
  console.log("Token: ", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    //info - userid n role
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default authmiddleware;
