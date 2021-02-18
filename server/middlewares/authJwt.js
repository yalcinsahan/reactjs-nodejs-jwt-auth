import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next)=>{
  
      let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
      }

      jwt.verify(token, "my secret key", (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
      });
    }; 
    