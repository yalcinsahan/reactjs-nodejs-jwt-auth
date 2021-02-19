import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'



export const login = (req,res) =>{

    User.findOne({email: req.body.email}).exec((err,user)=>{
        if(err){
            res.status(500).send({ message: err });
        return;
        }

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }

          var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );
    
          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
          }
    
          var token = jwt.sign({ id: user._id }, "my secret key", {
            expiresIn: 86400 // 24 hours
          }); 

          res.status(200).send({
            id: user._id,
            name: user.name,
            email: user.email,
            accessToken: token
          });
    })
    
}

export const register = (req,res) =>{
    const {name, email, password} = req.body
    User.create({name,email,password})
    .then(result=>res.status(201).send(result))
    .catch(err=>{
      if(err.code===11000){
        res.status(400).send({message: "that email is already registered"})
      }
      else{
        res.status(400).send(err)
        //console.log(err.errors.password.message);
      }
    })
}
