import express from "express";
import 'dotenv/config.js';
import bookRoutes from "./routers/BookRouters.js"
import studentRoutes from "./routers/StudentRoutes.js" 
import cors from "cors";
import userRoutes from "./routers/UserRouters.js";

//create express app
const app = express();

//Enable cors to frontend
let corsOptions = {
    origin: process.env.ORIGIN
}

//middleware
app.use(express.json());
app.use(cors(corsOptions));


app.use((req, res, next) =>{
    console.log(req.path, req.method);
    next();
})

const port = 3000;

try{
    app.listen(process.env.PORT || 3000, ()=>{
        console.log(`Listening to port ${process.env.PORT || 3000}...`);
    });
}catch(e){
    console.log(e);
}

app.use('/book',bookRoutes);
app.use('/student', studentRoutes);
app.use('/user', userRoutes);




/*
const port = 3000;


try{
    app.listen(process.env.PORT || 3000, ()=>{
        console.log(`Listening to port ${process.env.PORT || 3000}...`);
    });
}catch(e){
    console.log(e);
}

app.use('/book',bookRoutes);


/*
import studentRoutes from "./routers/StudentRoutes.js"
app.use('/student',studentRoutes);
*/












