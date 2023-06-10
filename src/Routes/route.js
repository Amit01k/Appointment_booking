const express=require('express')
const router=express.Router()
const userController=require('../controller/userController')
const middleware=require('../Middleware/auth');
router.post('/api/user',userController.createUser)
router.get('/api/user/:id',middleware.authentication,userController.getuserbyId)
router.get('/api/user',middleware.authentication,userController.getall)
router.delete("/api/user/:id",middleware.authentication,middleware.authorization,userController.deletebyid)
router.get('/api/paginations',userController.getPagination)
router.post('/api/login',userController.login)
router.put('/api/user/:id',middleware.authentication,middleware.authorization,userController.updateUser)
module.exports=router