import * as UserModel from "../model/UserModel.js";

export const register = async (req,res) =>{
    const {name, email, password} = req.body;

    try{
        const user= await UserModel.createUser(name, email, password);
        res.status(201).json({sucess: true, message: [{result: "A new account has been created!"}

        ]
    });  

    }catch(e){
        console.log(e),
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}



export const login = async (req,res) =>{
    const {email,password} = req.body;

  try{
        const user= await UserModel.login(email, password);
        res.status(200).json({sucess: true, message: [{result: "Login successfull!", token},

        ]
    });  

    }catch(e){
        console.log(e),
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

