import * as StudentController from  '../controllers/StudentController.js';
import express from "express";


const studentRoutes = express.Router();

studentRoutes.get('/all', StudentController.fetchStudent);


export default studentRoutes;