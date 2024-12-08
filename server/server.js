// MARK: import modules
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
// MARK: import routes
import CompanyRoutes from './routes/CompanyRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
import PostRoutes from './routes/PostRoutes.js';
import JobRoutes from './routes/JobRoutes.js';
import CommentRoutes from './routes/CommentRoutes.js';

// MARK: import database connection
import connectDB from './db/db.js';
import cors from 'cors';

import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 5001;

// MARK: CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200,
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
app.use('/api/comments', CommentRoutes);

const __dir = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dir, 'client/build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dir, 'client', 'build', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running...')
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});