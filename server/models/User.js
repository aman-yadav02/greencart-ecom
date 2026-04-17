import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : { type: String, required: true },
    email : { type: String, required: true , unique : true },
    password : { type: String, required: true },
    cartItems: { 
        type: Map, 
        of: Number,
        default: new Map()
    }
}, { minimize: false })

// Convert Map to Object when saving
userSchema.methods.toJSON = function() {
    const obj = this.toObject();
    if (obj.cartItems instanceof Map) {
        obj.cartItems = Object.fromEntries(obj.cartItems);
    }
    return obj;
};

const User =mongoose.models.user || mongoose.model('user',userSchema)

export default User;