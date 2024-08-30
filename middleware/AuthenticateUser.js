import "dotenv/config";
import jwt from "jsonwebtoken";

const { sign, verify } = jwt;

const createToken = (userInfo) => {
    return sign(
        {
            emailAdd: userInfo.emailAdd,
            pwd: userInfo.pwd
        },
        process.env.SECRET_KEY,
        {expirersIn: '1h'} 
    );
}

const verifyToken = (req, res, next) => {
    const token = req?.headers["authorization"];
    if(token){
        try {
            const decoded = verify(token, process.env.SECRET_KEY);
            req.user = decoded; 
            next();
        } catch (err) {
            res.status(404).json({
                status :404,
                msg: 'Invalid or expired token. Please login again.'
            });
        }
    } else {
        res.status(401).json({
            status:401,
            msg: 'Please login'
        });
    } 
}
    

    export {
        createToken,
        verifyToken
    }