import "dotenv/config";
import jwt from "jsonwebtoken";

const { sign, verify } = jwt;

const createToken = (userInfo) => {
    return sign(
        {
            emailAdd: userInfo.emailAdd,
            pwd: userInfo.pwd,
            role: userInfo.role 
        },
        process.env.SECRET_KEY,
        {expiresIn: '1h'} 
    );
}

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    // const token = authHeader && authHeader.split(' ')[1];
    if(token){
        try {
            const decoded = verify(token, process.env.SECRET_KEY);
            req.user = decoded; 
            store.commit('setUserRole', decoded.role);
            next();
        } catch (err) {
            res.status(403).json({
                status :403,
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