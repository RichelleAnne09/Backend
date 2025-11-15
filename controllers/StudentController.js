import * as StudentModel from "../model/StudentModel.js";

export const fetchStudent = async (req,res) =>{
    try{
        const student = await StudentModel.getStudents();
        res.status(200).json({sucess: true, message: student});    
    }catch(e){
        console.log(e),
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const createStudent = async (req,res) =>{
    const {title,genre,status} = req.body
    try{
        const studentId = await StudentModel.insertStudent(title,genre,status);
        res.status(200).json({sucess: true, message: studentId});    
    }catch(e){
        console.log(e),
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const editStudent = async (req,res) =>{
    const {title,genre,status} = req.body
    const {studentId} = req.params

    try{
        const updatedId = await StudentModel.updateStudent (title,genre,status,studentId);
        res.status(200).json({sucess: true, message: updatedId});    
    }catch(e){
        console.log(e),
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const deleteStudent= async (req,res) =>{
    const {bookId} = req.params

    try{
        const deletedId = await StudentModel.deleteStudent (studentId);
        res.status(200).json({sucess: true, message: deletedId});    
    }catch(e){
        console.log(e),
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


