import jwt from 'jsonwebtoken';
const JWT_KEY = 'dsader432r4tr4rdsfaffbnbvn';


function protectRoute(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Unauthorized request"
        });
    };
    const bearerToken = req.headers['authorization'].split(' ')[1];
    if (!bearerToken) {
        return res.status(401).json({
            message: "Access denied. No token provided."
        });
    };
    try {
        const decoded = jwt.verify(bearerToken, JWT_KEY);
        req.token = decoded.token;
        next();
    } catch(err) {
        console.log(err);
        return res.status(400).json({
            message: "Invalid token."
        });
    };
};

export default protectRoute;

