// MARK: import modules
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
// MARK: import routes
import CompanyRoutes from './routes/CompanyRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
import PostRoutes from './routes/PostRoutes.js';
import JobRoutes from './routes/JobRoutes.js';

// MARK: import database connection
import connectDB from './db/db.js';
import cors from 'cors';

import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 5000;

// MARK: CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Specify frontend URL
    credentials: true,               // Allow cookies to be sent with requests
    optionsSuccessStatus: 200,       // Some legacy browsers require this status
};
app.use(cors(corsOptions));

// MARK: middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MARK: routes
app.use('/api/companies', CompanyRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/posts', PostRoutes);
app.use('/api/jobs', JobRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});