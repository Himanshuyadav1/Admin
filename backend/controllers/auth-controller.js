import User from "../models/user-model.js";
// import bcrypt from "bcrypt";

class AuthController {
    static home = async (req, res) => {
        try {
            res.status(200).send("Welcome to the Home Page using controller!!");
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: "Page not found !!" });
        }
    }

    static register = async (req, res) => {
        try {
            console.log(req.body);
            const { username, email, phone, password } = req.body;

            const userExist = await User.findOne({ email });

            if(userExist) {
                return res.status(400).json({ message: "Email already exist" });
            }

            const userCreated = await User.create({ username, email, phone, password });
            
            res.status(201).json({ 
                message: "Registration successful",
                data: userCreated,
                token: await userCreated.generateToken(),
                userId: userCreated._id.toString()
             });
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: "Page not found !!" });
        }
    }

    static login = async (req, res) => {
        try {
            const { email, password } = req.body;

            const userExist = await User.findOne({ email });
            // console.log("user==>", userExist);
            if(!userExist) {
                return res.status(400).json({ message: "Invalid Credential" });
            }

            const user = await userExist.comparePassword(password);

            if(user) {
                res.status(200).json({
                    message: "Login Successfull",
                    data: userExist,
                    token: await userExist.generateToken(),
                    userId: userExist._id.toString()
                });
            }else {
                res.status(401).json({ message: "Please check Email or password" });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static user = async (req, res) => {
        try {
            const userData = req.user;
            console.log(userData);
            return res.status(200).json({ userData });
        } catch (error) {
            console.log(`Error from user route ${error}`);
        }
    }
}

export default AuthController;