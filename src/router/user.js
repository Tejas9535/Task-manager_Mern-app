import User from "../../Models/user.js"
import multer  from 'multer'
import express from 'express'
import auth from '../../Middleware/auth.js'
const router = express.Router()


router.post('/users', (req,res) => {
    const user=new User(req.body)
    // console.log(req.body);
    // console.log(user);
    user.save().then(async () => {
     const token=await user.generateToken()
        res.status(201).send({user})
    }).catch(err => {
        res.status(400).send(err)
    })
 })

router.post ('/user/login', async(req,res) =>{
    const {Email,Password} = req.body
    console.log('req',Email);
    console.log('req',Password);
    try {
        const user = await User.login(Email,Password)
        // console.log(user);
        const token = await user.generateToken()
        res.status(200).send({user,token})
    } catch (err) {
        res.status(400).send({error:err.message})
    }
})

router.post ('/user/logout',auth, async(req,res) =>{
    try {
        const {user,token} = req
        // console.log(req);
        user.tokens = user.tokens.filter(theToken => theToken.token!==token)
        // user.tokens = []
        await user.save()
        res.status(200).send({msg: "logout sucess"})
    } catch (err) {
        res.status(400).send({error: err.message})
    }
})

router.post ('/user/logoutall',auth, async(req,res) =>{
    try {
        const {user} = req
        // console.log(req)
        user.tokens = []
        // console.log(user.tokens);
        await user.save()
        res.status(200).send({msg: "logout all sucess"})
    } catch (err) {
        res.status(400).send({error: err.message})
    }
})

 router.put ("/user/:id",async (req,res) => {
     const _id = req.params.id
     try {
         const user = await User.findById(_id)
         if(!user){
             res.status(404).send({error : "user not found!!"})
         }
         const update = ["name","email","password","age"]
         const keyset = Object.keys(req.body)
         const result = keyset.every(key =>update.contains(key))
         for (key in req.body){
             if(key ==="_id"){
                 res.status(400).send({error : "invalid updates"})
             }
             user[key] = req.body[key]
         }
         await user.save()
         res.send()
     } catch (error) {
         res.status(400).send(error)
     }
 })


 router.get('/user',auth, (req,res) => {
    try {
        const users =  User.findOne()
        console.log(users);
        res.send(users)
    } catch (error) {
        res.status(400).send(error)
    }
 })
 router.delete('/user/del',auth, async(req,res) => {
     try {
         await req.user.remove()
         console.log(req.user);
         res.status(200).send({msg: "deletion complete"})
     } catch (err) {
        res.status(400).send({error: err.message})
        // res.send(err)
     }
 })
const upload= multer({
    // dest:'avatar',
    limits:{fileSize:1000000},
    fileFilter(req,file,cb) {
        // if(!file.originalname.endsWith('jpg')){
        //     return cb (new Error('please Upload png file'))
        // }
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('please upload image'))
        }
        cb(undefined,true)
    }   
})

router.post('/user/me/avatar',auth,upload.single('avatar'), async(req,res) => {
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send({msg:'file uploaded'})
    // console.log();
},(error,req,res,next) => {
    res.send({error: error.message})
})
router.delete('/user/avatar',auth, async(req,res) => {
   req.user.avatar = undefined
   await req.user.save()
   res.send({msg : "avtar removed!!!"})
})
router.get("/user/:id/avatar", async(req,res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error('user or avtar not found')
        }
        res.set('Content-Type','image/jpg')
        res.send(user.avatar)
    } catch (error) {
        res.send({msg : error.message})
    }
})

// router.get("/admin/users", async(req,res) => {
//     const user = req
//     console.log(user);
//     try {
//         res.send(user)
//     } catch (error) {
        
//     }
// })
// module.exports=router

export default router;
