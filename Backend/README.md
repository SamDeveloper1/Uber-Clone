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



# Map Routes

## Get Coordinates Endpoint

### Endpoint: `/maps/get-coordinates`

### Description:
This endpoint retrieves the geographical coordinates (latitude and longitude) for a given address.

### Method:
`GET`

### Query Parameters:
| Parameter | Type   | Required | Description                          |
|-----------|--------|----------|--------------------------------------|
| `address` | String | Yes      | The address to retrieve coordinates for. |

### Responses:

#### Success Response:
- **Status Code:** `200 OK`
- **Body:**
```json
{
  "lat": 28.6139,
  "lng": 77.2090
}
```

#### Error Responses:
1. **Validation Errors:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
   ```json
   {
     "errors": [
       { "msg": "Invalid value", "param": "address", "location": "query" }
     ]
   }
   ```
2. **Coordinates Not Found:**
   - **Status Code:** `404 Not Found`
   - **Body:**
   ```json
   { "message": "Coordinates not found" }
   ```

---

## Get Distance and Time Endpoint

### Endpoint: `/maps/get-distance-time`

### Description:
This endpoint calculates the distance and estimated travel time between two locations.

### Method:
`GET`

### Query Parameters:
| Parameter      | Type   | Required | Description                          |
|----------------|--------|----------|--------------------------------------|
| `origin`       | String | Yes      | The starting location.               |
| `destination`  | String | Yes      | The destination location.            |

### Responses:

#### Success Response:
- **Status Code:** `200 OK`
- **Body:**
```json
{
  "distance": "15 km",
  "time": "30 mins"
}
```

#### Error Responses:
1. **Validation Errors:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
   ```json
   {
     "errors": [
       { "msg": "Invalid value", "param": "origin", "location": "query" },
       { "msg": "Invalid value", "param": "destination", "location": "query" }
     ]
   }
   ```
2. **Internal Server Error:**
   - **Status Code:** `500 Internal Server Error`
   - **Body:**
   ```json
   { "message": "Internal server error" }
   ```

---

## Get Suggestions Endpoint

### Endpoint: `/maps/get-suggestions`

### Description:
This endpoint provides location suggestions based on a partial input string.

### Method:
`GET`

### Query Parameters:
| Parameter | Type   | Required | Description                          |
|-----------|--------|----------|--------------------------------------|
| `input`   | String | Yes      | The partial input string for suggestions. |

### Responses:

#### Success Response:
- **Status Code:** `200 OK`
- **Body:**
```json
[
  "New Delhi, India",
  "Delhi University, India",
  "Delhi Airport, India"
]
```

#### Error Responses:
1. **Validation Errors:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
   ```json
   {
     "errors": [
       { "msg": "Invalid value", "param": "input", "location": "query" }
     ]
   }
   ```
2. **Internal Server Error:**
   - **Status Code:** `500 Internal Server Error`
   - **Body:**
   ```json
   { "message": "Internal server error" }
   ```

# Ride Routes

## Create Ride Endpoint

### Endpoint: `/rides/create`

### Description:
This endpoint allows a user to create a new ride request.

### Method:
`POST`

### Request Body:
| Parameter      | Type   | Required | Description                          |
|----------------|--------|----------|--------------------------------------|
| `pickup`       | String | Yes      | The pickup address.                  |
| `destination`  | String | Yes      | The destination address.             |
| `vehicleType`  | String | Yes      | The type of vehicle (e.g., car, auto, motorcycle). |

### Responses:

#### Success Response:
- **Status Code:** `201 Created`
- **Body:**
```json
{
  "_id": "rideId",
  "pickup": "Pickup Address",
  "destination": "Destination Address",
  "vehicleType": "car",
  "status": "pending"
}
```

#### Error Responses:
1. **Validation Errors:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
   ```json
   {
     "errors": [
       { "msg": "Invalid pickup address", "param": "pickup", "location": "body" },
       { "msg": "Invalid destination address", "param": "destination", "location": "body" }
     ]
   }
   ```
2. **Internal Server Error:**
   - **Status Code:** `500 Internal Server Error`
   - **Body:**
   ```json
   { "message": "Internal server error" }
   ```

---

## Get Fare Endpoint

### Endpoint: `/rides/get-fare`

### Description:
This endpoint calculates the estimated fare for a ride based on the pickup and destination addresses.

### Method:
`GET`

### Query Parameters:
| Parameter      | Type   | Required | Description                          |
|----------------|--------|----------|--------------------------------------|
| `pickup`       | String | Yes      | The pickup address.                  |
| `destination`  | String | Yes      | The destination address.             |

### Responses:

#### Success Response:
- **Status Code:** `200 OK`
- **Body:**
```json
{
  "fare": 150
}
```

#### Error Responses:
1. **Validation Errors:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
   ```json
   {
     "errors": [
       { "msg": "Invalid pickup address", "param": "pickup", "location": "query" },
       { "msg": "Invalid destination address", "param": "destination", "location": "query" }
     ]
   }
   ```
2. **Internal Server Error:**
   - **Status Code:** `500 Internal Server Error`
   - **Body:**
   ```json
   { "message": "Internal server error" }
   ```

---

## Confirm Ride Endpoint

### Endpoint: `/rides/confirm`

### Description:
This endpoint allows a captain to confirm a ride request.

### Method:
`POST`

### Request Body:
| Parameter      | Type   | Required | Description                          |
|----------------|--------|----------|--------------------------------------|
| `rideId`       | String | Yes      | The ID of the ride to confirm.       |

### Responses:

#### Success Response:
- **Status Code:** `200 OK`
- **Body:**
```json
{
  "_id": "rideId",
  "status": "confirmed"
}
```

#### Error Responses:
1. **Validation Errors:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
   ```json
   {
     "errors": [
       { "msg": "Invalid ride Id", "param": "rideId", "location": "body" }
     ]
   }
   ```
2. **Internal Server Error:**
   - **Status Code:** `500 Internal Server Error`
   - **Body:**
   ```json
   { "message": "Internal server error" }
   ```

---

## Start Ride Endpoint

### Endpoint: `/rides/start-ride`

### Description:
This endpoint allows a captain to start a ride after verifying the OTP.

### Method:
`GET`

### Query Parameters:
| Parameter      | Type   | Required | Description                          |
|----------------|--------|----------|--------------------------------------|
| `rideId`       | String | Yes      | The ID of the ride to start.         |
| `otp`          | String | Yes      | The OTP for ride verification.       |

### Responses:

#### Success Response:
- **Status Code:** `200 OK`
- **Body:**
```json
{
  "_id": "rideId",
  "status": "in-progress"
}
```

#### Error Responses:
1. **Validation Errors:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
   ```json
   {
     "errors": [
       { "msg": "Invalid ride id", "param": "rideId", "location": "query" },
       { "msg": "Invalid OTP", "param": "otp", "location": "query" }
     ]
   }
   ```
2. **Internal Server Error:**
   - **Status Code:** `500 Internal Server Error`
   - **Body:**
   ```json
   { "message": "Internal server error" }
   ```

---

## End Ride Endpoint

### Endpoint: `/rides/end-ride`

### Description:
This endpoint allows a captain to end a ride.

### Method:
`POST`

### Request Body:
| Parameter      | Type   | Required | Description                          |
|----------------|--------|----------|--------------------------------------|
| `rideId`       | String | Yes      | The ID of the ride to end.           |

### Responses:

#### Success Response:
- **Status Code:** `200 OK`
- **Body:**
```json
{
  "_id": "rideId",
  "status": "completed"
}
```

#### Error Responses:
1. **Validation Errors:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
   ```json
   {
     "errors": [
       { "msg": "Invalid ride id", "param": "rideId", "location": "body" }
     ]
   }
   ```
2. **Internal Server Error:**
   - **Status Code:** `500 Internal Server Error`
   - **Body:**
   ```json
   { "message": "Internal server error" }
   ```