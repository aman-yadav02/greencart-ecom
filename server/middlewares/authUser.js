import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    let token;
    
    // Check for token in Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }
    // If no token in header, check cookies
    else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not Authorized. Please log in.' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecode.id) {
            req.userId = tokenDecode.id;
            next();
        } else {
            return res.status(401).json({ success: false, message: 'Not Authorized. Invalid token.' });
        }
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Not Authorized. Invalid token.' });
    }
}

export default authUser;