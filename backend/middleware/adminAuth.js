
/*import jwt from 'jsonwebtoken'

const adminAuth = async(req,res,next) =>{
    try {
     const {token } = req.headers
     if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
     }
     const token_decode = jwt.verify(token,env.JWT_SECRET);
     if(token_decode !== ProcessingInstruction.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
        return res.json({success:false,message:"Not Authorized Login Again"})
     }
     next()
    } catch(error) {
        console.log(error)
         res.json({success:false,message: false,message: error.message})
    }
}
export default adminAuth*/



import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: "Not Authorized. Please login again." });
    }

    // Decode the token using the secret key
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the token data matches the admin's credentials
    if (token_decode !== process.env.ADMIN_EMAIL +  process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Not Authorized. Please login again." });
    }

    // Proceed if the admin credentials are correct
    next();
  } catch (error) {
    console.log(error);
     res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
