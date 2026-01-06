# User Registration Endpoint

## Endpoint: `/users/register`

### Description:
This endpoint is used to register a new user. It validates the input data, hashes the password, creates a new user in the database, and returns an authentication token along with the user details.

### Method:
`POST`

### Request Body:
The request body should be in JSON format and include the following fields:

| Field               | Type   | Required | Description                                   |
|---------------------|--------|----------|-----------------------------------------------|
| `fullName.firstName`| String | Yes      | The first name of the user (minimum 3 chars). |
| `fullName.lastName` | String | No       | The last name of the user (minimum 3 chars).  |
| `email`             | String | Yes      | The email address of the user.                |
| `password`          | String | Yes      | The password for the user (minimum 6 chars).  |

### Example Request:
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses:

#### Success Response:
- **Status Code:** `201 Created`
- **Body:**
```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "1234567890abcdef",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

#### Error Responses:

1. **Validation Errors:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
   ```json
   {
     "errors": [
       {
         "msg": "Invalid Email",
         "param": "email",
         "location": "body"
       }
     ]
   }
   ```

2. **Missing Fields:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
   ```json
   {
     "errors": "All Fields are required"
   }
   ```

### Notes:
- Ensure that the `JWT_SECRET` environment variable is set for token generation.
- Passwords are hashed before being stored in the database.

# User Login Endpoint

## Endpoint: `/users/login`

### Description:
This endpoint is used to authenticate an existing user. It validates the input data, checks the credentials, and returns an authentication token along with the user details.

### Method:
`POST`

### Request Body:
The request body should be in JSON format and include the following fields:

| Field      | Type   | Required | Description                          |
|------------|--------|----------|--------------------------------------|
| `email`    | String | Yes      | The email address of the user.       |
| `password` | String | Yes      | The password for the user.           |

### Example Request:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses:

#### Success Response:
- **Status Code:** `200 OK`
- **Body:**
```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "1234567890abcdef",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

#### Error Responses:

1. **Invalid Credentials:**
   - **Status Code:** `401 Unauthorized`
   - **Body:**
   ```json
   {
     "error": "Invalid email or password"
   }
   ```

2. **Missing Fields:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
   ```json
   {
     "errors": "All Fields are required"
   }
   ```

### Notes:
- Ensure that the `JWT_SECRET` environment variable is set for token generation.