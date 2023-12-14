# GymToolKit-bangkit-CloudComputing
Welcome to the documentation of the GymToolKit: Your Personal Gym Trainer backend application. GymToolKit is an application designed to assist individuals new to the gym environment by identifying various gym equipment based on user-uploaded photos. It allows users to access information about the equipment names and instructions for usage.

## Database Schema GymToolKit
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
### Authentication
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
    * Status Code: 200
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
        "status": "failed",
        "message": "Email already taken."
      }
      ```
  * If username is already taken:
    * Status Code: 400
    * JSON Response:
      ```json
      {
        "status": "failed",
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
    * Status Code: 200
    * JSON Response:
      ```json
      {
        "status": "success",
        "loginResult":
        {
          "email": "test@example.com",
          "username": "Test",
          "user_id": "<string_id>",
          "access_token": "<access_token>",
          "refresh_token": "<refresh_token>"
        },
        "message": "Login Success."
       }
      ```
  * If username or email or password is incorrect:
    * Status Code: 401
    * JSON Response:
      ```json
      {
        "status": "failed",
        "message": "Email or Password is incorrect."
      }
      ```
      
#### View Account
* URL: /users/view/{id}
* Method: GET
* Response:
  * If successful:
    * Status Code: 200
    * JSON Response:
      ```json
      {
        "username": "Test",
        "email": "test@example.com",
      }
      ```
  * If users not authenticated:
    * Status Code: 401
    * JSON Response:
      ```json
      {
        "status": "failed",
        "message": "User not authenticated."
      }
      ```

#### Update Account
* URL: /users/edit-users/{id}
* Method: PUT
* Request Body:
  * username (string): User's name
  * email (string): User's email
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
        "status": "failed",
        "message": "Email already taken."
      }
      ```
  * If username is already taken:
    * Status Code: 400
    * JSON Response:
      ```json
      {
        "status": "failed",
        "message": "Username already taken."
      }
       ```
    
#### Change Password Account
* URL: /users/change-password/{id}
* Method: PUT
* Request Body:
  * password (string): User's password
  * newPassword (string): User's new password
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
    * Status Code: 400
    * JSON Response:
      ```json
      {
        "status": "failed",
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
    * Status Code: 400
    * JSON Response:
      ```json
      {
        "status": "failed",
        "message": "Credential is incorrect."
      }
      ```
      
#### Logout
* URL: /authentications/logout
* Method: POST
* Request Body:
  * refresh_token (string): User's get new token
* Response:
  * If successful:
    * Status Code: 200
    * JSON Response:
      ```json
      {
        "status": "success",
        "message": "Logout successfully."
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
    * Status Code: 200
    * JSON Response:
      ```json
      {
        "status": "success",
        "message": "Tools successfully registered."
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
      
#### Search Tools
* URL: /tools/list-tools
* Method: GET
* Request Body:
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
    * Status Code: 200
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
