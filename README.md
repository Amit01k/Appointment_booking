## Project - Appointment_booking

### input for create user
-user input
-title: user name title
-user_name: user name
-appointment_status: which type of appointment user want to take(noarmal,emergency)
-appointment_starting_time: appointment starting time when user come
-appointment_end_time: appointment_end_time for when user appointment time finish
-mobile_number: mobile number of user and this is unique beacause every user have own mobile number
-emamil: email of the user and this is unique beacause every user have email Id.
-password: password 
```yaml
{
    "title":"Mr.",
    "user_name":"amit_singh",
    "appointment_status":"emergency",
    "appointment_starting_time":"2:30 am",
    "appointment_end_time":"1:02 pm",
    "mobile_number":"+918423384321",
    "email":"asf@gmail.com",
    "password":"123Ammy@#"
}
```


### userModel
- User Model
```yaml
{ 
  "title": {string, mandatory, enum[Mr., Mrs., Miss]},
  "user_name": {string, mandatory},
  "appointment_status": {string, mandatory, enum["normal","emergency"]},
  "appointment_starting_time": {string, mandatory, unique},
  "appointment_end_time": {string, mandatory, unique},
  "mobile_number": {string, mandatory, unique},
  "email": {string, mandatory, valid email, unique}, 
  "password": {string, mandatory, minLen 8, maxLen 15},
  "createdAt": {timestamp},
  "updatedAt": {timestamp}
}
```
## User APIs 

### POST /user
- Create a user - atleast 5 users
- Create a user document from request body.
- Returning HTTP status 201 on a succesful user creationed. Also return the user document. The response should be a JSON object like [this](#successfully-user-created-response-structure)
- Return HTTP status 400 if no params or invalid params received in request body. The response should be a JSON object like [this](#error-response-structure)

## Response

### Successful Response structure
```yaml
{
  status: true,
  message: 'Success',
  data: {

  }
}
```

### Successfully User Created Response structure
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
### Error Response structure
```yaml
{
  status: false,
  message: ""
}
```

### POST /login
- Allow an user to login with their email and password.
- On a successful login attempt return a JWT token contatining the userId, exp, iat. The response should be a JSON object like [this](#successful-response-structure-for-login)
- If the credentials are incorrect return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

### Successful Response structure For Login
```yaml
{
    "msg": "token generated successfully",
    "token": "token will show here when user successfully created"
}
```

### GET /user
- Returns all users in the collection that aren't deleted. Return all the fiels. Response example [here](#get-user-response)
- Return the HTTP status 200 if any documents are found. The response structure should be like [this](#successful-response-structure) 

### Get user response
```yaml
{
    "status": true,
    "message": "users list",
    "data": [
        {
            "_id": "64843fbb852f51ec83b4179a",
            "title": "Mr.",
            "user_name": "sdsssdfasdf",
            "appointment_starting_time": "10 AM",
            "appointment_end_time": "10:20 AM",
            "mobile_number": "+919012384321",
            "email": "amt@gmail.com",
            "password": "12345wrty",
            "isDeleted": false,
            "createdAt": "2023-06-10T09:17:47.564Z",
            "updatedAt": "2023-06-10T10:08:41.934Z",
            "__v": 0
        },
        {
            "_id": "64845285b02ba27ca0b3237f",
            "title": "Mr.",
            "user_name": "amit_singh",
            "status": "normal",
            "appointment_starting_time": "10:20 am",
            "appointment_end_time": "10:20 pm",
            "mobile_number": "+919496384321",
            "email": "sgh@gmail.com",
            "password": "1wdwfr345wrty",
            "isDeleted": false,
            "createdAt": "2023-06-10T10:37:57.202Z",
            "updatedAt": "2023-06-10T10:37:57.202Z",
            "__v": 0
        },
        {
            "_id": "64849e5fe04ef7bcac8fd856",
            "title": "Mr.",
            "user_name": "amit_singh",
            "appointment_status": "emergency",
            "appointment_starting_time": "10:30 am",
            "appointment_end_time": "10:21 pm",
            "mobile_number": "+919406384321",
            "email": "sgash@gmail.com",
            "password": "123Ammy@#",
            "isDeleted": false,
            "createdAt": "2023-06-10T16:01:35.762Z",
            "updatedAt": "2023-06-10T16:01:35.762Z",
            "__v": 0
        },
        {
            "_id": "6484b8cf40c6cbb9c1fd0361",
            "title": "Mr.",
            "user_name": "amit_singh",
            "appointment_status": "emergency",
            "appointment_starting_time": "14:30 am",
            "appointment_end_time": "11:22 pm",
            "mobile_number": "+917422384321",
            "email": "asdvf@gmail.com",
            "password": "123Ammy@#",
            "isDeleted": false,
            "createdAt": "2023-06-10T17:54:23.295Z",
            "updatedAt": "2023-06-10T17:54:23.295Z",
            "__v": 0
        }
    ]
}
```

### GET /user/:id
- for this api we retrive user data by user id
- Returns a user with complete details. Response example [here](#user-details-response)
- If no documents are found then return an HTTP status 404 with a response like [this](#error-response-structure) 

### User Details Response
```yaml
{
    "status": true,
    "msg": "user data",
    "data": {
        "_id": "64849e5fe04ef7bcac8fd856",
        "title": "Mr.",
        "user_name": "amit_singh",
        "appointment_status": "emergency",
        "appointment_starting_time": "10:30 am",
        "appointment_end_time": "10:21 pm",
        "mobile_number": "+919406384321",
        "email": "sgash@gmail.com",
        "password": "123Ammy@#",
        "isDeleted": false,
        "createdAt": "2023-06-10T16:01:35.762Z",
        "updatedAt": "2023-06-10T16:01:35.762Z",
        "__v": 0
    }
}
```

### PUT /user/:id
- Update a user by changing new input enter by user.
- Checking if the user exists (must have isDeleted false and is present in collection). If it doesn't, return an HTTP status 404 with a response body like [this](#error-response-structure)
- Return an HTTP status 200 if updated successfully with a body like [this](#successful-response-structure) 
- response return the updated user document. 

### DELETE /user/:id
- Check if the userid exists and is not deleted. If it does, mark it deleted and return an HTTP status 200 with a response body with status and message.
- If the book document doesn't exist then return an HTTP status of 404 with a body like [this](#error-response-structure) 

### Authentication
- All the endpoint routes are protected.

### Authorisation
- Only user is able to create, edit or delete the user.
- In case of unauthorized access return an appropirate error message.