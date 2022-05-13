/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import multer from 'multer';
import express from 'express';
import User from '../../Models/user.js';
import auth from '../../Middleware/auth.js';

const router = express.Router();

router.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save().then(async () => {
     const token = await user.generateToken();
        res.status(201).send({ user });
    }).catch(err => {
        res.status(400).send(err);
    });
 });

router.post('/user/login', async (req, res) => {
    const { Email, Password } = req.body;
    try {
        const user = await User.login(Email, Password);
        const token = await user.generateToken();
        res.status(200).send({ user, token });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

router.post('/user/logout', auth, async (req, res) => {
    try {
        const { user, token } = req;
        user.tokens = user.tokens.filter(theToken => theToken.token !== token);
        await user.save();
        res.status(200).send({ msg: 'logout sucess' });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

router.post('/user/logoutall', auth, async (req, res) => {
    try {
        const { user } = req;
        user.tokens = [];
        await user.save();
        res.status(200).send({ msg: 'logout all sucess' });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

 router.put('/user/:id', async (req, res) => {
     const _id = req.params.id;
     try {
         const user = await User.findById(_id);
         if (!user) {
             res.status(404).send({ error: 'user not found!!' });
         }
         const update = ['name', 'email', 'password', 'age'];
         const keyset = Object.keys(req.body);
         const result = keyset.every(key => update.contains(key));
         req.body.forEach(key => {
            if (key !== '_id') {
                user[key] = req.body[key];
            }
            res.status(400).send({ error: 'invalid updates' });
         });
         await user.save();
         res.send();
     } catch (error) {
         res.status(400).send(error);
     }
 });

 router.get('/user', auth, (req, res) => {
    try {
        const users = User.findOne();
        res.send(users);
    } catch (error) {
        res.status(400).send(error);
    }
 });
 router.delete('/user/del', auth, async (req, res) => {
     try {
         await req.user.remove();
         res.status(200).send({ msg: 'deletion complete' });
     } catch (err) {
        res.status(400).send({ error: err.message });
     }
 });
const upload = multer({
    limits: { fileSize: 1000000 },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('please upload image'));
        }
        return cb(undefined, true);
    }
});

router.post('/user/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send({ msg: 'file uploaded' });
}, (error, req, res, next) => {
    res.send({ error: error.message });
});
router.delete('/user/avatar', auth, async (req, res) => {
   req.user.avatar = undefined;
   await req.user.save();
   res.send({ msg: 'avtar removed!!!' });
});
router.get('/user/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user || !user.avatar) {
            throw new Error('user or avtar not found');
        }
        res.set('Content-Type', 'image/jpg');
        res.send(user.avatar);
    } catch (error) {
        res.send({ msg: error.message });
    }
});

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
