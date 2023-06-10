const express=require('express')
const router=express.Router()
const userController=require('../controller/userController')
const middleware=require('../Middleware/auth');
//create user api
router.post('/api/user',userController.createUser)
//get user by id
router.get('/api/user/:id',middleware.authentication,userController.getuserbyId)
//get all user data
router.get('/api/user',middleware.authentication,userController.getall)
//delete user data
router.delete("/api/user/:id",middleware.authentication,middleware.authorization,userController.deletebyid)
//generate jsonweb token fot authentication and authorization
router.post('/api/login',userController.login)
//update the user data
router.put('/api/user/:id',middleware.authentication,middleware.authorization,userController.updateUser)

module.exports=router