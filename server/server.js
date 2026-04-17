import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/userRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import sellerRouter from './routes/sellerRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import contactRouter from './controllers/contactpage.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4500;
const DB_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/GreenCart";
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'];

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);
app.use('/api/contact', contactRouter);

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    }
};

// Start server
connectDB().then(() => {
    connectCloudinary();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
