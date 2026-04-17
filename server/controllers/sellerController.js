
import jwt from 'jsonwebtoken'
//seller login

export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' })

            res.cookie('SellerToken', token, {
                httpOnly: true,
                secure: process.env.Node_ENV === 'production',
                sameSite: process.env.Node_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.json({ success: true, message: "Logged In" });
        }

        else {
            return res.json({ success: false, message: "Invalid Credentials" });

        }
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })


    }

}

//seler path - /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    try {
        return res.json({ success: true })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });

    }
}

//Seller Logout-/api/seller/logout
export const sellerLogout = async (req,res)=>{
    try {
        res.clearCookie('SellerToken',{
        httpOnly:true,
        secure:process.env.Node_ENV==='production',
        sameSite:process.env.Node_ENV === 'production' ? 'none': 'strict',


        });
        return res.json({success:true,message:"Logged Out"})

    } catch (error) {

        console.log(error.message);
        res.json({ success: false, message: error.message });
        
    }
  }