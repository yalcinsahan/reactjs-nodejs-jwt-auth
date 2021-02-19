import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'



export const login = async (req,res) =>{

    //verilen email'deki user aranıyor.
    const user = await User.findOne({email: req.body.email});
    if(user===null) return res.status(404).send({message: "bu email ile kayıtlı bir kullanıcı bulunamadı."})
    
    //user bulunduysa password kontrolü yapılacak.
    let passwordIsValid = await bcrypt.compare(req.body.password,user.password);
    if(!passwordIsValid) return res.status(401).send({message: "şifre hatalı."})

    //password doğruysa bir token oluşturulacak.
    //token'in geçerliliği 86400 ms olarak ayarlandı.
    let token = jwt.sign({id: user._id},"my secret key",{expiresIn: 86400})

    //giriş işlemi başarılı olduğu için name, email ve token; client'a gönderilecek.
    return res.status(200).send({name: user.name, email: user.email, accessToken: token}); 
    
}

export const register = (req,res) =>{
    //request'ten gelen name, email ve password değerleri alınıyor.
    const {name, email, password} = req.body

    //create metodu ile user oluşturuluyor.
    User.create({name,email,password})
    .then(result=>res.status(201).send(result))
    .catch(err=>{

      res.status(400).send(handleErrors(err))

    })
}

  //handle errors
  const handleErrors = (err) => {

  let errors = { email: "", password: "",name:"" };

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {

      errors[properties.path] = properties.message;
    });
  }

  return errors;
}