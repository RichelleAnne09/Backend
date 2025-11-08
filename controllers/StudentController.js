import * as StudentModel from "../model/StudentModel.js";

export const fetchStudent = async (req,res) =>{
    try{
        const student = await StudentModel.getStudents();
        res.status(200).json({sucess: true, message: student});    
    }catch(e){
        console.log(e),
        res.status(500).json({
            success: true,
            message: "Internal Server Error"
        })
    }
}