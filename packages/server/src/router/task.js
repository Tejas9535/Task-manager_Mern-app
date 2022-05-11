import Task from'../../Models/task.js'
import express from 'express'
import auth from  '../../Middleware/auth.js'
const router = express.Router()

router.post ("/tasks", auth,async(req,res) => {
    try {
        const user = req.user
        const task = new Task({
            ...req.body,
            owner:user._id
        })
        await task.save()
        res.status(200).send(task)
        console.log(task);
    } catch (err) {
        res.status(400).send(err)
    }
})
router.get ("/tasks",auth,async(req,res) => {
    try {
        let match = {}
        if(req.query.completed){
            match.completed = req.query.completed === 'true'
        }
        let sort = {}
        if(req.query.sortBy){
            let value = req.query.sortBy
            const parts = value.split(":")
            sort[parts[0]]= parts[1]=== 'desc' ? -1 : 1
        }
        await req.user.populate({
            path: "tasks",
            match,
            options : {
                limit : parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })
        res.send(req.user.tasks)
        // console.log(req.user.tasks)
    } catch (err) {
        res.status(400).send({eror : err.message})
    }
})

router.get ("/tasks/:id", auth,async(req,res) => {
    try {
        const _id = req.params.id
        const task = await Task.findOne({
            _id:_id,
            owner: req.user._id
        })
        if(!task){
            res.send('no tasks found')
        }
        res.send(task)
    } catch (err) {
        res.send(err)
    }
})
// router.get('/alltask',{})
// module.exports=router
export default router;
