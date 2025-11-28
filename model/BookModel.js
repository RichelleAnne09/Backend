import pool from '../config/db.js';

// Get all books
export const getBooks = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM tblbook");
        return rows;
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
};

// Insert book
export const insertBook = async (title, genre, status) => {
    try {
        const [result] = await pool.query(
            "INSERT INTO tblbook (title, genre, status) VALUES (?, ?, ?)",
            [title, genre, status]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting book:", error);
        throw error;
    }
};

// Update book
export const updateBook = async (title, genre, status, bookId) => {
    try {
        const [result] = await pool.query(
            "UPDATE tblbook SET title = ?, genre = ?, status = ? WHERE id = ?",
            [title, genre, status, bookId]
        );
        return result.affectedRows;
    } catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }
};

// Delete book
export const deleteBook = async (bookId) => {
    try {
        const [result] = await pool.query(
            "DELETE FROM tblbook WHERE id = ?",
            [bookId]
        );
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting book:", error);
        throw error;
    }
};
