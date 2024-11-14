// MARK: import modules
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
// MARK: import routes
import CompanyRoutes from './routes/CompanyRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
// MARK: import database connection
import connectDB from './db/db.js';

import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 5000;

// MARK: middleware
app.use(express.json())
app.use(cookieParser()); // parse cookies
app.use('/api/companies', CompanyRoutes);
app.use('/api/users', UserRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});