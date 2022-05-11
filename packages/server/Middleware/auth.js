import jwt  from 'jsonwebtoken'
import User from '../Models/user.js'

const auth = async (req,res,next) => {
    try {
        // console.log(req.header);
        const token =  req.header("Authorization").replace("Bearer ", "")
        const payload = jwt.verify(token,"Tejas")
        const user = await User.findOne({
            _id : payload._id,
            "tokens.token" : token,
        })
        if(!user){
            throw new Error ("user invalid")
        }
        req.user=user
        req.token=token
        next()
    } catch (error) {
        res.status(404).send({msg:"user not Authenticated!!!"})
    }
}
export default  auth;