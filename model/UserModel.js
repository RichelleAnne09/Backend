import pool from "../config/db.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (name, email, password) => {
    // Validate empty fields
    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
        const error = new Error('Name, Email and Password are required.');
        error.statusCode = 400;
        throw error;
    }

    // Validate email
    if (!validator.isEmail(email)) {
        const error = new Error('Invalid email address.');
        error.statusCode = 400;
        throw error;
    }

    // Validate password strength
    if (!validator.isStrongPassword(password)) {
        const error = new Error('Password is not strong enough.');
        error.statusCode = 400;
        throw error;
    }

    // Check if user exists
    const [existing] = await pool.query(
        "SELECT email FROM tbluser WHERE email = ?",
        [email]
    );

    if (existing.length === 1) {
        const error = new Error(`The email ${email} is already used.`);
        error.statusCode = 400;
        throw error;
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Insert new user
    const [newUser] = await pool.query(
        "INSERT INTO tbluser(name, email, password) VALUES(?,?,?)",
        [name, email, hashedPassword]
    );

    return newUser; // optional
};


// LOGIN USER
export const login = async (email, password) => {
    if (email.trim() === '' || password.trim() === '') {
        const error = new Error('Email and password are required.');
        error.statusCode = 400;
        throw error;
    }

    // Get user by email
    const [result] = await pool.query(
        "SELECT * FROM tbluser WHERE email = ?",
        [email]
    );

    if (result.length === 0) {
        const error = new Error(`An account with the email: ${email} does not exist.`);
        error.statusCode = 400;
        throw error;
    }

    const user = result[0];

    // Compare password
    const passMatch = bcrypt.compareSync(password, user.password);
    if (!passMatch) {
        const error = new Error('Incorrect password.');
        error.statusCode = 400;
        throw error;
    }

    // Generate token
    const token = jwt.sign(
        { id: user.id },
        process.env.SECRET,
        { expiresIn: '1d' }
    );

    return token;
};


// GET USER BY ID
export const getUser = async (id) => {
    if (isNaN(parseInt(id))) {
        throw new Error('Invalid id');
    }

    const [user] = await pool.query(
        "SELECT * FROM tbluser WHERE id = ?",
        [id]
    );

    return user;
};
