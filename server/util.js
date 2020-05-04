import jwt from 'jsonwebtoken'
import config from './config'


const getToken = (user) => {
    return jwt.sign({
        _id : user._id,
        name : user._id,
        email: user.email,
        isAdmin : user.isAdmin,
        
    }, config.JWT_SECRET, {
        expiresIn: '48h'
    });
}
const isAuth = ( req, res, next) => {
    const token = req.headers.authorization;
    if(token){
        const onlyToken = toekn.slice(7, toekn.length);
        jwt.verify(onlyToken, config.JWT_SECRET, (err, decode)=> {
            if(err){
                return res.status(401).send({msg: 'Invalid token'})
            }
            req.user = decode;
            next();
            return
        });
    } else {
        return res.status(401).send({ msg: " Token is not supplied "})
    }
}

const isAdmin = (req, res,next) => {
    if(req.user && req.user.isAdmin){
        return next();
    }
    return res.status(401).send({ msg: "unvalid admin token"})
}

export { getToken, isAuth, isAdmin}