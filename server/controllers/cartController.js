import User from "../models/User.js"

export const updateCart = async (req, res) => {
    try {
        const userId = req.userId; // Get userId from auth middleware
        if (!userId) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        const cartItems = req.body;
        if (!cartItems || typeof cartItems !== 'object') {
            return res.status(400).json({ success: false, message: "Invalid cart data" });
        }

        // Convert the cart items object to a Map
        const cartItemsMap = new Map(Object.entries(cartItems));

        // Update the user's cart items
        const user = await User.findByIdAndUpdate(
            userId,
            { cartItems: cartItemsMap },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Convert the Map back to an object for the response
        const responseCartItems = Object.fromEntries(user.cartItems);

        res.json({ 
            success: true, 
            message: "Cart Updated",
            cartItems: responseCartItems
        });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}