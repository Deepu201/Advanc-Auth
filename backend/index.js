import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDb.js';
import authrouter from './Routers/auth.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
// Load environment variables from .env file
dotenv.config();
const app = express();

app.use(cors({origin:"http://localhost:5173",
    credentials:true,

}))
const port = process.env.PORT || 5000; // Use environment variable for port

app.use(express.json());
app.use(cookieParser());



app.use('/api',authrouter)

// Start the server
app.listen(port, () => {
    connectDB()
    console.log(`Server is running on port ${port}`);
});

// MongoDB connection string (consider moving this to .env)
// const mongoURI = process.env.MONGO_URI; // Use environment variable for MongoDB URI