import * as BookModel from "../model/BookModel.js";

export const fetchBooks = async (req,res) =>{
    try{
        const books = await BookModel.getBooks();
        res.status(200).json({sucess: true, message: books});    
    }catch(e){
        console.log(e),
        res.status(500).json({
            success: true,
            message: "Internal Server Error"
        })
    }
}