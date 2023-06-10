## Project - Appointment_booking

### userModel
- User Model
```yaml
{ 
  title: {string, mandatory, enum[Mr, Mrs, Miss]},
  user_name: {string, mandatory},
  appointment_status: {string, mandatory, enum["normal","emergency"]},
  appointment_starting_time: {string, mandatory, unique},
  appointment_end_time: {string, mandatory, unique},
  mobile_number: {string, mandatory, unique},
  email: {string, mandatory, valid email, unique}, 
  password: {string, mandatory, minLen 8, maxLen 15},
  createdAt: {timestamp},
  updatedAt: {timestamp}
}
```
## User APIs 
### POST /createUser
- Create a user - atleast 5 users
- Create a user document from request body.
- Returning HTTP status 201 on a succesful user creationed. Also return the user document. The response should be a JSON object like [this](#successful-response-structure)
- Return HTTP status 400 if no params or invalid params received in request body. The response should be a JSON object like [this](#error-response-structure)

## Response

### Successful Response structure
```yaml
{
    "msg": "data created successfully",
    "data": {
        "title": "Mr.",
        "user_name": "amit_singh",
        "appointment_status": "emergency",
        "appointment_starting_time": "18:30 am",
        "appointment_end_time": "12:21 pm",
        "mobile_number": "+919402384321",
        "email": "sgsh@gmail.com",
        "password": "123Ammy@#",
        "isDeleted": false,
        "_id": "6484a93a50753ebcc273650f",
        "createdAt": "2023-06-10T16:47:54.618Z",
        "updatedAt": "2023-06-10T16:47:54.618Z",
        "__v": 0
    }
}
```