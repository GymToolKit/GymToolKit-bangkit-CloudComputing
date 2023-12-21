# GymToolKit-bangkit-CloudComputing
Welcome to the documentation of the GymToolKit: Your Personal Gym Trainer backend application. GymToolKit is an application designed to assist individuals new to the gym environment by identifying various gym equipment based on user-uploaded photos. It allows users to access information about the equipment names and instructions for usage.

# Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database](#database)
- [Documentation API: GymToolKit](#documentation-api-gymtoolkit)
  - [Register](#register)
  - [Login](#login)
  - [View Account](#view-account)
  - [Update Account](#update-account)
  - [Change Password Account](#change-password-account)
  - [Delete Account](#delete-account)
  - [Refresh Token](#refresh-token)
  - [Logout](#logout)
  - [Register Tools](#register-tools)
  - [List Tools](#list-tools)
  - [Detail Tools](#detail-tools)
  - [Search Tools](#search-tools)
  - [Update Tools](#update-tools)
  - [Delete Tools](#delete-tools)
  - [Send Feedback](#send-feedback)
  - [List Feedback](#list-feedback)
  - [Predict Image](#predict-image)
  - [Upload Image](#upload-image)
- [Running the Application](#running-the-application)

## Prerequisites

Before running the Ternaku backend application, make sure you have the following installed:

- **@google-cloud/storage**
- **@hapi/hapi**
- **@hapi/inert**
- **@hapi/jwt**
- **@tensorflow/tfjs-node**
- **auto-bind**
- **bcrypt**
- **dotenv**
- **joi**
- **nanoid**
- **node-fetch**
- **node-pg-migrate**
- **pg**
- **sharp**

## Installation

1. Clone the repository from GitHub:

   ```shell
   git clone https://github.com/GymToolKit/GymToolKit-bangkit-CloudComputing.git
   ```

2. Change into the project directory:

   ```shell
   cd GymToolKit-bangkit-CloudComputing
   ```

3. Install the required dependencies using npm:

   ```shell
   npm install
   ```
## Configuration

## Configuration

Before running the application, you need to configure the following settings in the `.env`,`server.js`, and `key.json`, file:

- PostgresSQL database configuration:
  - `.env['PGHOST']`: The PostgresSQL server host.
  - `.env['PGUSER']`: The PostgresSQL username.
  - `.env['PGPASSWORD']`: The PostgresSQL password.
  - `.env['PGDATABASE']`: The name of the PostgresSQL database.
- JWT secret key:
  - `.env['ACCESS_TOKEN_KEY']`: A secret key used for generate access JWT token. , You can generate a random key or provide your own.
  - `.env['REFRESH_TOKEN_KEY']`:  A secret key used for generate refresh JWT token. , You can generate a random key or provide your own.
  - `.env['ACCESS_TOKEN_AGE']`:A setting defines the expiration duration for access tokens (in seconds).
- Server Configuration
  - `.env['HOST']`: The server host.
  - `.env['PORT']`: The Server port.
- Google Cloud service account key:
  - `server.js['keyFilename']`: The path to your Google Cloud service account key file.
   - `server.js['keyFilename']`: The path to your Google Cloud service account key file.
    - `server.js['bucketName']`: The name off your Google Cloud bucket storage
- Model file paths:
  - `server.js['modelPath']`: The path to the Machine Learning model file for predicting 
  
## Database Schema GymToolKit
### Database

This repository contains the SQL code to create and manage the database schema for a web application. The schema includes tables for users, tools, and feedback. Below is the structure and details of each table:

### Table: Users
This table stores information about the users of the application.
| Column   | Type | Constraint     |
|--------|------|----------|
| id   | VARCHAR(255)   | PRIMARY KEY, AUTO INCREMENT  |
| username   | VARCHAR(255)   | NOT NULL  |
| email    | VARCHAR(255)   | NOT NULL |
| password   | VARCHAR(255)   | NOT NULL  |

### Table: Tools
This table stores information about the tools available in the application.
| Column   | Type | Constraint     |
|--------|------|----------|
| id   | VARCHAR(255)   | PRIMARY KEY, AUTO INCREMENT  |
| toolsName   | VARCHAR(255)   | NOT NULL  |
| videoUrl    | TEXT   | NOT NULL |
| headline   |  TEXT[ARRAY]   | NOT NULL  |
| toolsStep    | TEXT[ARRAY]   | NOT NULL |

### Table: Feedback
This table stores information about the feedback from users of the application.
| Column   | Type | Constraint     |
|--------|------|----------|
| id   | VARCHAR(255)   | PRIMARY KEY, AUTO INCREMENT  |
| user_id    | VARCHAR(255)   | NOT NULL |
| rating    | INT   | NOT NULL |
| comment   | TEXT   |   |
| FOREIGN KEY   | (user_id)   | REFERENCES users(id)  |

## Documentation API GymToolKit

### Users Service
#### Register
* URL: /users/register
* Method: POST
* Request Body:
  * username (string): User's name
  * email (string): User's email
  * password (string): User's password
* Response:
  * If successful:
    * Status Code: 201
    * JSON Response:
      ```json
      {
        "status": "success",
        "message": "Account successfully registered. Please log in."
      }
      ```
  * If email is already taken:
    * Status Code: 400
    * JSON Response:
      ```json
      {
        "status": "fail",
        "message": "Email already taken."
      }
      ```
  * If username is already taken:
    * Status Code: 400
    * JSON Response:
      ```json
      {
        "status": "fail",
        "message": "Username already taken."
      }
      ```

#### Login
* URL: /authentications/login
* Method: POST
* Request Body:
  * username (string): User's name
  * password (string): User's password
* Response:
  * If successful:
    * Status Code: 201
    * JSON Response:
      ```json
      {
        "status": "success",
        "message": "Login Success.",
        "loginResult":
          {
            "access_token": "<access_token>",
            "refresh_token": "<refresh_token>"
          },
       }
      ```
  * If username or email or password is incorrect:
    * Status Code: 401
    * JSON Response:
      ```json
      {
        "status": "fail",
        "message": "Username or Password is incorrect."
      }
      ```
      
#### View Account
* URL: /users/view/{id}
* Method: GET
* Request Headers:
  * Bearer <access_token>
* Response:
  * If successful:
    * Status Code: 200
    * JSON Response:
      ```json
      { 
        "id": "<userID>",
        "username": "Test",
        "email": "test@example.com",
      }
      ```
  * If users id not found :
    * Status Code: 404
    * JSON Response:
      ```json
      {
        "status": "fail",
        "message": "User not found."
      }
      ```

#### Update Account
* URL: /users/edit-users/{id}
* Method: PUT
* Request Body:
  * username (string): User's name
  * email (string): User's email
* Request Headers:
  * Bearer <access_token>
* Response:
  * If successful:
    * Status Code: 200
    * JSON Response:
      ```json
      {
        "status": "success",
        "message": "Update account success."
      }
      ```
  * If email is already taken:
    * Status Code: 400
    * JSON Response:
      ```json
      {
        "status": "fail",
        "message": "Email already taken."
      }
      ```
  * If username is already taken:
    * Status Code: 400
    * JSON Response:
      ```json
      {
        "status": "fail",
        "message": "Username already taken."
      }
       ```
    
#### Change Password Account
* URL: /users/change-password/{id}
* Method: PUT
* Request Body:
  * password (string): User's password
  * newPassword (string): User's new password
* Request Headers:
  * Bearer <access_token>
* Response:
  * If successful:
    * Status Code: 200
    * JSON Response:
      ```json
      {
        "status": "success",
        "message": "Password change success"
      }
      ```
  * If Old Password False :
    * Status Code: 401
    * JSON Response:
      ```json
      {
        "status": "fail",
        "message": "Invalid password"
      }
      ```

#### Delete Account
* URL: /users/delete-account/{id}
* Method: DELETE
* Request Body:
  * username (string): User's username
  * password (string): User's password
* Response:
  * If successful:
    * Status Code: 200
    * JSON Response:
      ```json
      {
        "status": "success",
        "message": "Account deleted successfully."
      }
      ```
  * If password are incorrect:
    * Status Code: 401
    * JSON Response:
      ```json
      {
        "status": "fail",
        "message": "Username or Password is incorrect."
      }
      ```
      
#### Refreseh Token
* URL: /authentications/refresh-token
* Method: PUT
* Request Body:
    * refresh_token (string): User's refresh token
* Response:
  * If successful:
    * Status Code: 200
    * JSON Response:
      ```json
      {
        "status": "success",
        "message": "Account deleted successfully.",
         "loginResult":
          {
            "access_token": "<access_token>",
          },
      }
      ```
  * If refresh are incorrect:
    * Status Code: 401
    * JSON Response:
      ```json
      {
        "status": "fail",
        "message": "Refresh Token is Invalid."
      }
      ```

#### Logout
* URL: /authentications/logout
* Method: POST
* Request Body:
  * refresh_token (string): User's refresh token
* Response:
  * If successful:
    * Status Code: 200
    * JSON Response:
      ```json
      {
        "status": "success",
        "message": "Logout Success."
      }
      ```

### Tools Service
#### Register Tools
* URL: /tools/register-tools
* Method: POST
* Request Body:
  * toolsName (string): Name gym tools
  * videoUrl (string): URL video tutorial
  * headline (array): Headline for steps tools tutorial
  * toolsStep (array): Step by step tools tutorial
* Response:
  * If successful:
    * Status Code: 201
    * JSON Response:
      ```json
      {
        "status": "success",
        "message": "Tools successfully registered."
      }
      ```
  * If Error:
    * Status Code: 400
    * JSON Response:
      ```json
      {
        "status": "Fail",
        "message": "Bad Request."
      }
      ```

#### List Tools
* URL: /tools/list-tools
* Method: GET
* Response:
  * If successful:
    * Status Code: 200
    * JSON Response:
      ```json
      {
        "toolsName": "<toolsName>",
        "videoUrl": "https://example.com/tutorials/treadmil",
        "headline": "<headline>",
        "toolsStep": "<toolsStep>"
      }
      ```
  * If Error:
    * Status Code: 404
    * JSON Response:
      ```json
      {
       "status": "Fail",
        "message": "Tools Not Found"
      }
      ```
      
#### Detail Tools
* URL: /tools/detail-tools/{id}
* Method: GET
* Request Body:
  * id (string): ID tools
* Response:
  * If successful:
    * Status Code: 200
    * JSON Response:
      ```json
      {
        "toolsName": "<toolsName>",
        "videoUrl": "https://example.com/tutorials/treadmil",
        "headline": "<headline>",
        "toolsStep": "<toolsStep>"
      }
      ```
  * If Error:
    * Status Code: 404
    * JSON Response:
      ```json
      {
       "status": "Fail",
        "message": "Tools Not Found"
      }
      ```
      
#### Search Tools
* URL:/tools/search?toolsName=<query>
* Method: GET
* Request Query:
  * toolsName (string): Name gym tools
* Response:
  * If successful:
    * Status Code: 200
    * JSON Response:
      ```json
      {
        "toolsName": "<toolsName>",
        "videoUrl": "https://example.com/tutorials/treadmil",
        "headline": "<headline>",
        "toolsStep": "<toolsStep>"
      }
      ```
  * If Error:
    * Status Code: 400
    * JSON Response:
      ```json
      {
       "status": "Fail",
        "message": "Bad Request."
      }
      ```

#### Update Tools
* URL: /tools/update-tools/{id}
* Method: PUT
* Request Body:
  * toolsName (string): Name gym tools
  * videoUrl (string): URL video tutorial
  * headline (array): Headline for steps tools tutorial
  * toolsStep (array): Step by step tools tutorial
* Response:
  * If successful:
    * Status Code: 200
    * JSON Response:
      ```json
      {
        "status": "success",
        "message": "Update tools success."
      }
      ```
  * If Error:
    * Status Code: 400
    * JSON Response:
      ```json
      {
        "status": "Fail",
        "message": "Bad Request."
      }
      ```
      
#### Delete Tools
* URL: /tools/delete-tools/{id}
* Method: DELETE
* Response:
  * If successful:
    * Status Code: 200
    * JSON Response:
      ```json
      {
        "status": "success",
        "message": "Tools deleted successfully."
      }
      ```
  * If Error:
    * Status Code: 404
    * JSON Response:
      ```json
      {
       "status": "Fail",
        "message": "Tools Not Found"
      }
      ```
      
### Feedback Service

#### Send Feedback
* URL: /feedback/{id}
* Method: POST
* Request Body:
  * userId (string) : User's ID
  * rating (int): User's rating
  * comment (string): User's comment feedback
* Request Headers:
  * Bearer <access_token>
* Response:
  * If successful:
    * Status Code: 201
    * JSON Response:
      ```json
      {
        "status": "success",
        "message": "Thankyou for giving feedback."
      }
      ```
  * If users not entry rating:
    * Status Code: 400
    * JSON Response:
      ```json
      {
        "status": "failed",
        "message": "Please, provide a rating between 1 and 5."
      }
      ```
#### List Feedback
* URL: /feedback/list-feedback
* Method: GET
* Response:
  * If successful:
    * Status Code: 200
    * JSON Response:
      ```json
      {
        "userId": "<users_id>",
        "rating": "<rating>",
        "comment": "<comment>"
      }
      ```

### Image Service
#### Predict Image
* URL: /predict
* Method: POST
* Request Body:
    * Type: multipart/form-data
      * Fields:
          * image (File): The image file to be processed.
* Response:
  * If successful:
    * Status Code: 201
    * JSON Response:
      ```json
      {
        "status": "success",
         "predictions": {
            "label": "<Tools Name>"
          }
      }
      ```
  * If users not entry rating:
    * Status Code: 400
    * JSON Response:
      ```json
      {
        "status": "failed",
        "message": "Failed, to process image"
      }
      ```
#### Upload Image
* URL: /upload/images
* Method: POST
* Request Body:
    * Type: multipart/form-data
      * Fields:
          * image (File): The image file to be processed.
* Response:
  * If successful:
    * Status Code: 201
    * JSON Response:
      ```json
      {
        "status": "success",
         "predictions": {
            "url": "<url image bucket>"
          }
      }
      ```
  * If users not entry rating:
    * Status Code: 400
    * JSON Response:
      ```json
      {
        "status": "failed",
        "message": "Failed, to upload images"
      }
      ```

### Miscellaneous
#### Root

- **Endpoint:** /
- **Method:** GET
- **Response:** Welcome to the root endpoint!

## Running the Application

To run the GymToolKit backend application, execute the following command:

```shell
npm run start
```

The application will start running on `http://localhost:5000/`.

Make sure you have the required dependencies installed and the necessary configurations set before running the application.

That's it! You have successfully set up and documented the GymToolKit backend application.

## Disclaimer
-   This project is created for educational purpose as the requirement to graduate from [**_Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka_**.](https://www.linkedin.com/company/bangkit-academy/mycompany/)