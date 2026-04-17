import { v2 as cloudinary } from 'cloudinary'
import Product from '../models/product.js'

// Add Product : Api/product/add
export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData);
        const images = req.files;

        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, {
                    resource_type: 'image',
                });
                return result.secure_url;
            })
        );

        await Product.create({ ...productData, image: imagesUrl });

       res.json({ success: true, message: "Product Added" });
    } catch (error) {
        console.log("Add Product Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get Product : /api/product/list
export const productList = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json({ success: true, products })
    } catch (error) {

        console.log(error.message)
        res.json({ success: false, message: error.message })

    }

}

// Get Single Product : /api/product/:id
export const productById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, product });
    } catch (error) {
        console.error("Product by ID error:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: "Invalid product ID format" });
        }
        res.status(500).json({ success: false, message: "Server error" });
    }
}

// Change Product inStock : /api/product/stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body
        await Product.findByIdAndUpdate(id, { inStock })
        res.json({ success: true, message: "Stock Updated" })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}