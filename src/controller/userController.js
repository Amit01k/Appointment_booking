
const userModel = require('../Models/userModel')
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose")
const isrequestBody = (requestBody) => {
    return Object.keys(requestBody).length > 0
}
//isValidTitle function , validating input value matched or not with enum value 'Mr.', 'Mrs.', 'Miss'.
const isValidTitle = (title) => {
    return ['Mr.', 'Mrs.', 'Miss'].indexOf(title) !== -1

}
//isValidAppointmnetStatus function , validating input value matched or not with enum value 'normal','emergency'.
const isValidAppointmnetStatus=(status)=>{
    return ['normal','emergency'].indexOf(status) !==-1
}
//isValidobjectId function, checking input id is valiad or not according to mongoDB id.
const isValidobjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId)
}
//isValid will check input field,input field undefined, null, string and input length=0 or not
const isValid = (value) => {
    if (typeof value === "undefined" || value === null)
        return false
    if (typeof value === "string" && value.trim().length === 0)
        return false
    else
        return true
}
//createUser function for create new user
const createUser = async (req, res) => {
    try {
        //validation for checking input body ,if body is empty it will send error.
        if (!isrequestBody(req.body)) {
            return res.status(400).send({ status: false, message: "Invalid parameters, please provide user details" })
        }
        //distructuring the input fields
        const { title, user_name,appointment_status, appointment_starting_time, appointment_end_time, mobile_number, email, password } = req.body

        if (!isValid(title)) {
            return res.status(400).send({ status: false, message: "please provide title" })
        }
        if (!isValidTitle(title)) {
            return res.status(400).send({ status: false, message: "please provide title from Mr.,Mrs.,Miss" })
        }

        if (!isValid(user_name)) {
            return res.status(400).send({ status: false, message: "please provide user_name" })

        }
        if (!isValid(appointment_status)) {
            return res.status(400).send({ status: false, message: "please provide appointment_status" })
        }
        if (!isValidAppointmnetStatus(appointment_status)) {
            return res.status(400).send({ status: false, message: "please provide status from normal, emergency" })
        }

        if (!isValid(appointment_starting_time)) {
            return res.status(400).send({ status: false, message: "please provide appointment_starting_time" })
        }
        //regex for validation the appointment_starting_time 
        if (!(/((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/.test(appointment_starting_time))) {
            return res.status(400).send({ status: false, message: "appointment_starting_time Number is not valid enter value on 09:45 AM formate" })

        }
        
        let duplicate_appointment_starting_time = await userModel.findOne({ appointment_starting_time });
        if (duplicate_appointment_starting_time) {
            return res.status(400).send({ status: false, message: "on this time our doctor is busy please select other appointment_starting_time" })
        }

        if (!isValid(appointment_end_time)) {
            return res.status(400).send({ status: false, message: "please provide appointment_end_time" })

        }
        if (!(/((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/.test(appointment_end_time))) {
            return res.status(400).send({ status: false, message: "appointment_end_time is not valid enter value on 10:45 AM formate" })

        }

        let duplicate_appointment_end_time = await userModel.findOne({ appointment_end_time });
        if (duplicate_appointment_end_time) {
            return res.status(400).send({ status: false, message: "on this time our doctor is busy please select other appointment_end_time" })
        }
        if (!isValid(mobile_number)) {
            return res.status(400).send({ status: false, message: "please provide mobile_number" })
        }
        if (!(/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(mobile_number))) {
            return res.status(400).send({ status: false, message: "Mobile Number is not valid" })
        }

        let duplicatephone = await userModel.findOne({ mobile_number });
        if (duplicatephone) {
            return res.status(400).send({ status: false, message: "phone is already in use" })
        }
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "please provide email" })
        }
        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: "email is not valid" })
        }

        let isDuplicateEmail = await userModel.findOne({ email });
        if (isDuplicateEmail) {
            return res.status(404).send({ status: false, message: "Email is already in use" })
        }
        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "please provide password" })
        }
        if (!(password.length >= 8 && password.length <= 15)) return res.status(400).send({ status: false, message: "password is not valid enter password 8 to 15 character" })
        create = await userModel.create(req.body)
        return res.send({status:true, message: "data created successfully", data: create })
    }
    catch (err) {
        return res.send(err)

    }
}



//login function for creating jsonwebtoken
const login = async (req, res) => {
    try{
        const body = req.body
        const { email, password } = body
        if (!email) {
            return res.status(400).send({status:false, message: "incorrect email, please enter valid email" })
        }

        let emaildata = await userModel.findOne({ email })
        if(emaildata.password!==password){
            return res.status(404).send({status:false,message:"your password doesn't matched wiith emailid"})
        }
        if (!emaildata) {
            return res.status(400).send({status:false, message: "email not present, please enter correct email" })
        }
        if (!password) {
            return res.status(400).send({status:false, message: "incorrect password, please enter valid password" })
        }
        const token = jwt.sign({
            userId: emaildata._id.toString(),
            group: "appointment_booking",
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 1 * 60 * 60    //1 hourds:60minute:60second
        }, "node_project_by_amit")
        res.setHeader("x-api-key", token)
        return res.status(200).send({ message: "token generated successfully", token: token })
    }catch(err){
        return res.status(404).send({status:false,message:err.message})
    }
}

//getuserbyId function for get user data by userId
const getuserbyId = async (req, res) => {
    try {
        const userId = req.params.id

        if (!userId) {

            return res.status(400).send({ status: false, message: "please enter userId to find the user" })
        }

        if (!isValidobjectId(userId)) {
            return res.status(400).send({ status: false, message: "please enter valid userId" })
        }
        data = await userModel.findOne({ _id: userId, isDeleted: false })
        if (!data) {
            return res.status(404).send({ status: false, message: "user not found please enter valid user id" })
        }
        return res.send({status:true,message:"user data",data})
    }
    catch (err) {
        return res.status(404).send({status:false,message:err.message})
    }
}

//getall function , by this function we can see all the users data
const getall = async (req, res) => {
    data = await userModel.find({ isDeleted: false });
    return res.status(200).send({status:true,message:"users list",data:data})

}

// updateUSer function, by this function we can update theuser data
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id

        if (!userId) {

            return res.status(400).send({ status: false, message: "please enter userId to find the user" })
        }

        if (!isValidobjectId(userId)) {
            return res.status(400).send({ status: false, message: "please enter valid userId" })
        }
        const body = req.body
        const update = await userModel.findByIdAndUpdate({ _id: userId, isDelete: false }, body, { new: true })
        return res.status(200).send({ status:true,message: "user data updated successfully", data: update })
    }
    catch (err) {
        return res.status(404).send({status:false,message:err.message})
    }
}

//deletebyId function , by this function we can delete the user
const deletebyid = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(400).send({ status: false, message: "please enter userId to find the user" })
        }
        if (!isValidobjectId(userId)) {
            return res.status(400).send({ status: false, message: "please enter valid userId" })
        }
        data = await userModel.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { isDeleted: true, deletedAt: Date.now() }, { new: true });
        if (!data) {
            return res.status(404).send({ status: false, message: "user not found please enter valid user id" })
        }
        return res.status(200).send({ status: true, message: "data deleted successfully" })
    } catch (err) {
        return res.status(404).send({status:false,message:err.message})
    }
}

const getPagination = async (req, res) => {
    const { page, title, limit } = req.query
    console.log(req.query)
    const titleData = await userModel.find({ title: title }).limit(limit)
        .skip((page - 1) * limit)
        .exec();
    console.log(titleData)
    return res.send({ message: "data get successfully", data: titleData });
}

module.exports.getall = getall;
module.exports.getuserbyId = getuserbyId
module.exports.createUser = createUser
module.exports.deletebyid = deletebyid
module.exports.getPagination = getPagination
module.exports.login = login
module.exports.updateUser = updateUser
