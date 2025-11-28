import * as BookModel from "../model/BookModel.js";

export const fetchBooks = async (req, res) => {
    try {
        const booksId = await BookModel.getBooks();
        res.status(200).json({ success: true, message: booksId});
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
export const createBooks = async (req, res) =>{
    
    try{
        const booksId = await BookModel.insertBook(title, genre, status);
        res.status(200).json({success: true, message: booksId});
    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const editBooks = async (req, res) => {
    const {title, genre, status} = req.body;
    const {booksId} = req.params

    try{
        const updateId = await BookModel.updateBook(title, genre, status, booksId);
        res.status(200).json({success: true, message: updateId});
    }catch(e){
        console.log(e);
        res.status(200).json({success: false, message: "Internal Server Error"});
    }
}

export const deleteBooks = async (req, res) => {
    const {booksId} = req.params;

    try{
        const deletedId = await BookModel.deleteBook(booksId);
        res.status(200).json({success: true, message: deletedId});
    }catch(e){
        console.log(e);
        res.status(200).json({success: false, message: "Internal Server Error"});
    }
}