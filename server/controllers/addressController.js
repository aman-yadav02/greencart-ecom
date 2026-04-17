import Address from "../models/Address.js";

// Get Address - GET: /api/address/get
export const getAddress = async (req, res) => {
    try {
        // Debugging: Check if userId is available
        console.log("User ID:", req.userId);

        // Use req.userId, not req.body.userId, as it should be set by the auth middleware
        const userId = req.userId;  

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Fetch addresses from the database based on userId
        const addresses = await Address.find({ userId });

        if (addresses.length === 0) {
            return res.status(404).json({ success: false, message: "No addresses found for this user" });
        }

        res.json({ success: true, addresses });
    } catch (error) {
        console.error("Error in getAddress:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Add Address - POST: /api/address/add
export const addAddress = async (req, res) => {
    try {
        const { address } = req.body;
        const { userId } = req; // Assuming userId is added by authentication middleware (authUser)

        // Check if required fields are present
        if (!address.firstName || !address.lastName || !address.email || !address.street || !address.city || !address.state || !address.zipcode || !address.country || !address.phone) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        // Create new address record
        const newAddress = new Address({
            userId,
            firstName: address.firstName,
            lastName: address.lastName,
            email: address.email,
            street: address.street,
            city: address.city,
            state: address.state,
            zipcode: address.zipcode,
            country: address.country,
            phone: address.phone
        });

        await newAddress.save();
        return res.status(200).json({
            success: true,
            message: "Address added successfully.",
            address: newAddress  // Optionally return the created address
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while adding the address."
        });
    }
};


