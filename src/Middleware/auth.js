const jwt = require("jsonwebtoken")
const userModel = require("../Models/userModel")
const mongoose = require("mongoose")

const isValidobjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const authentication = (req, res, next) => {
    try {
        let token = req.headers["x-api-key"]
        if (!token)
            return res.status(400).send({ status: false, msg: "please enter token" })
        let decodeToken = jwt.verify(token, "node_project_by_amit")

        if (!decodeToken)
            return res.status(401).send({ status: false, msg: "token is invalid please enter valid token" })
        req['userId'] = decodeToken.userId
        next()
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

const authorization = async (req, res, next) => {
    try {
        const id = req.userId
        const user_id = req.params.id
        if (!user_id) {
            return res.status(400).send({ status: false, msg: "please provide bookId" })
        }
        if (!isValidobjectId(user_id)) {
            return res.status(400).send({ status: false, msg: "please enter valid userId" })
        }
        const book = await userModel.findOne({ _id: user_id, isDeleted: false })
        if (!book) {
            return res.status(400).send({ status: false, msg: "user not present, please enter valid user" })
        }
        const user = book._id.toString()
        if (user !== id) {
            return res.status(403).send({ status: false, msg: "User Is Not Authorized" })
        }
        next()

    } catch (err) {
        return res.status(500).status({ status: false, msg: err.message })
    }
}

module.exports.authentication = authentication
module.exports.authorization = authorization




















// const authorization=(req,res,next)=>{
//     try{






//     }catch(err){
//         return res.status(500).status({status:false,msg:err.message})
//     }
// }