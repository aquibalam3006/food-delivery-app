import UserModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


// login user (UPDATE)
const loginUser = async (req,res) => {
    const {email,password} = req.body ;
    try{
        const user = await UserModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User Doesn't exist"})
        } 

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Incorrect password"})
        }

        const token = createToken(user._id)

        // 🔥 IMPORTANT
        res.json({
            success:true,
            token,
            role:user.role   // 👈 ye add karo
        })

    } catch(error){
        console.log(error);
        res.json({success:false,message:"Failed to login"})
    }
}





const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET);
}







const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    console.log("BODY:", req.body);

    try{
        const exists = await UserModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"user already exists"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Invalid email"})
        }

        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({success:true, message:"User registered successfully", token})

    }catch(error){
        console.log("REGISTER ERROR:", error);
        res.json({success:false, message:error.message})
    }
}


export {loginUser,registerUser}