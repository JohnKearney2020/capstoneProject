import express from 'express'
import User from '../models/userModel'
import { getToken} from '../util'

const router = express.Router();

router.post('/signin',  async (req, res) => {
    const singinUser = await User.findOne({
        email : req.body.email,
        password: req.body.password
    });
    if(singinUser){
        res.send({
            _id: singinUser.id,
            name: singinUser.name,
            email: singinUser.email,
            isAdmin: singinUser.isAdmin,
            token: getToken(singinUser)
        })
    } else {
        res.status(401).send({msg: "invalid EMail or password"})
    }
})


router.post('/register',  async (req, res) => {
    const user = new User({
        name : req.body.name,
        email: req.body.email,
        password : req.body.password
    });
    const newUser = await user.save();
    if(newUser){
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        });
    } else {
        res.status(401).send({msg: "erro creating user, pplease try again"})
    }
}
)


router.get("/buildadmin", async (req ,res) => {
    try {
        const user = new User({
            name: "Jesse",
            email : "jessemartinez@gmail.com",
            password : "1234",
            isAdmin : true
        });
    
        const newUser = await user.save();
    
    
        res.send(newUser);

    } catch (error) {
        res.send({msg: error.message});
    }
    
})

export default router;