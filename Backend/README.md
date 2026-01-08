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

# Get User Profile Endpoint

## Endpoint: `/users/profile`

### Description:
This endpoint returns the authenticated user's profile. It requires a valid JWT (sent via the `Authorization` header as `Bearer <token>` or via cookie `token`).

### Method:
`GET`

### Request Headers:
- `Authorization`: `Bearer <JWT_TOKEN>` (or cookie `token`)

### Responses:

#### Success Response:
- **Status Code:** `200 OK`
- **Body:**
```json
{
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

1. **Unauthorized / Missing Token:**
   - **Status Code:** `401 Unauthorized`
   - **Body:**
   ```json
   { "message": "Unuthorized" }
   ```

### Notes:
- The middleware checks for token blacklisting; if the token has been invalidated (e.g., after logout), access will be denied.

# Logout Endpoint

## Endpoint: `/users/logout`

### Description:
This endpoint logs out the authenticated user by invalidating the current JWT (typically by adding it to a blacklist). It requires a valid JWT.

### Method:
`GET`

### Request Headers:
- `Authorization`: `Bearer <JWT_TOKEN>` (or cookie `token`)

### Responses:

#### Success Response:
- **Status Code:** `200 OK`
- **Body:**
```json
{
  "message": "Logged out successfully"
}
```

#### Error Responses:

1. **Unauthorized / Missing Token:**
   - **Status Code:** `401 Unauthorized`
   - **Body:**
   ```json
   { "message": "Unuthorized" }
   ```

### Notes:
- Ensure that the `JWT_SECRET` environment variable is set for token verification.
- After logout the token will be rejected by the auth middleware on subsequent requests.

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

# Captain Registration Endpoint

## Endpoint: `/captains/register`

### Description:
This endpoint is used to register a new captain. It validates the input data, creates a new captain in the database, and returns the captain details.

### Method:
`POST`

### Request Body:
The request body should be in JSON format and include the following fields:

| Field               | Type   | Required | Description                                   |
|---------------------|--------|----------|-----------------------------------------------|
| `fullName.firstName`| String | Yes      | The first name of the captain (minimum 3 chars). |
| `fullName.lastName` | String | No       | The last name of the captain (minimum 3 chars).  |
| `email`             | String | Yes      | The email address of the captain.                |
| `password`          | String | Yes      | The password for the captain (minimum 6 chars).  |
| `vehicle.color`     | String | Yes      | The color of the vehicle (minimum 3 chars).      |
| `vehicle.plate`     | String | Yes      | The plate number of the vehicle (minimum 3 chars). |
| `vehicle.capacity`  | Number | Yes      | The capacity of the vehicle (minimum 1).         |
| `vehicle.vehicleType` | String | Yes    | The type of the vehicle (e.g., car, motorcycle, auto). |

### Example Request:
```json
{
  "fullName": {
    "firstName": "Jane",
    "lastName": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Responses:

#### Success Response:
- **Status Code:** `201 Created`
- **Body:**
```json
{
  "captain": {
    "_id": "1234567890abcdef",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
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

# Captain Login Endpoint

## Endpoint: `/captains/login`

### Description:
This endpoint is used to authenticate an existing captain. It validates the input data, checks the credentials, and returns an authentication token along with the captain details.

### Method:
`POST`

### Request Body:
The request body should be in JSON format and include the following fields:

```json
{
  "email": "jane.doe@example.com", // Required, must be a valid email
  "password": "securepassword"      // Required, minimum 6 characters
}
```

### Responses:

#### Success Response:
- **Status Code:** `200 OK`
- **Body:**
```json
{
  "token": "<JWT_TOKEN>",
  "captain": {
    "_id": "1234567890abcdef",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

#### Error Responses:

1. **Invalid Credentials:**
   - **Status Code:** `401 Unauthorized`
   - **Body:**
   ```json
   {
     "message": "Invalid email or password"
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

---

# Get Captain Profile Endpoint

## Endpoint: `/captains/profile`

### Description:
This endpoint returns the authenticated captain's profile. It requires a valid JWT (sent via the `Authorization` header as `Bearer <token>` or via cookie `token`).

### Method:
`GET`

### Request Headers:
- `Authorization`: `Bearer <JWT_TOKEN>` (or cookie `token`)

### Responses:

#### Success Response:
- **Status Code:** `200 OK`
- **Body:**
```json
{
  "captain": {
    "_id": "1234567890abcdef",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

#### Error Responses:

1. **Unauthorized / Missing Token:**
   - **Status Code:** `401 Unauthorized`
   - **Body:**
   ```json
   { "message": "Unauthorized" }
   ```

---

# Captain Logout Endpoint

## Endpoint: `/captains/logout`

### Description:
This endpoint logs out the authenticated captain by invalidating the current JWT (typically by adding it to a blacklist). It requires a valid JWT.

### Method:
`GET`

### Request Headers:
- `Authorization`: `Bearer <JWT_TOKEN>` (or cookie `token`)

### Responses:

#### Success Response:
- **Status Code:** `200 OK`
- **Body:**
```json
{
  "message": "Logged out successfully"
}
```

#### Error Responses:

1. **Unauthorized / Missing Token:**
   - **Status Code:** `401 Unauthorized`
   - **Body:**
   ```json
   { "message": "Unauthorized" }
   ```