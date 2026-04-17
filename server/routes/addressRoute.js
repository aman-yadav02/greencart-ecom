
import express from 'express';
import { addAddress, getAddress } from '../controllers/addressController.js';
import authUser from '../middlewares/authUser.js';

const addressRouter = express.Router();

// Route to add a new address
addressRouter.post('/add', authUser, addAddress);

// Route to get all addresses for the authenticated user
addressRouter.get('/get', authUser, getAddress);

export default addressRouter;
