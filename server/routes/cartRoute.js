import mongoose from "mongoose";
import authUser from "../middlewares/authUser.js";
import express from 'express'
import { updateCart } from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post('/update',authUser,updateCart)

export default cartRouter;