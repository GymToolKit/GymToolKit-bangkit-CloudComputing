# GymToolKit-bangkit-CloudComputing
Welcome to the documentation of the GymToolKit: Your Personal Gym Trainer backend application. GymToolKit is an application designed to assist individuals new to the gym environment by identifying various gym equipment based on user-uploaded photos. It allows users to access information about the equipment names and instructions for usage.

## Database Schema GymToolKit
### Table: Users
This table stores information about the users of the application.
| Column   | Type | Constraint     |
|--------|------|----------|
| user_id   | VARCHAR(255)   | PRIMARY KEY, AUTO INCREMENT  |
| username   | VARCHAR(255)   | NOT NULL  |
| email    | VARCHAR(255)   | NOT NULL |
| password   | VARCHAR(255)   | NOT NULL  |

### Table: Tools
This table stores information about the tools available in the application.
| Column   | Type | Constraint     |
|--------|------|----------|
| tools_id   | VARCHAR(255)   | PRIMARY KEY, AUTO INCREMENT  |
| tools_name   | VARCHAR(255)   | NOT NULL  |
| video_url    | VARCHAR(255)   | NOT NULL |
| photo_url   | BYTEA   | NOT NULL  |
| tools_step    | TEXT[ARRAY]   | NOT NULL |
| tools_description    | TEXT   | NOT NULL |
| tags    | TEXT[ARRAY]   | NOT NULL |

### Table: Feedback
This table stores information about the feedback from users of the application.
| Column   | Type | Constraint     |
|--------|------|----------|
| feedback_id   | VARCHAR(255)   | PRIMARY KEY, AUTO INCREMENT  |
| user_rating    | INT   | NOT NULL |
| user_feedback   | TEXT   |   |
| FOREIGN KEY   | (user_id)   | REFERENCES users(user_id)  |

## Documentation API GymToolKit
### Authentication
#### Register
* Endpoint: /users
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
        "error": false,
        "message": "Account successfully registered. Please log in."
      }
      ```
  * If email is already taken:
    * Status Code: 400
    * JSON Response:
      ```json
      {
        "error": true,
        "message": "Email already taken."
      }
      ```
  * If username is already taken:
    * Status Code: 400
    * JSON Response:
      ```json
      {
        "error": true,
        "message": "Username already taken."
      }
      ```

#### Login
* Endpoint: /authentications
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
        "error": false,
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
        "error": true,
        "message": "Email or Password is incorrect."
      }
      ```
      
#### View Account
* Endpoint: /users/<users_id>
* Method: GET
* Response:
  * If successful:
    * Status Code: 200
    * JSON Response:
      ```json
      {
        "users_id": "<users_id>",
        "username": "Test",
        "email": "test@example.com",
        "avatar_url": "<avatar_url>"
      }
      ```
  * If users not authenticated:
    * Status Code: 401
    * JSON Response:
      ```json
      {
        "error": true,
        "message": "User not authenticated."
      }
      ```

#### Update Account
* Endpoint: /users/<users_id>
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
        "error": false,
        "message": "Update Success."
      }
      ```
  * If email is already taken:
    * Status Code: 400
    * JSON Response:
      ```json
      {
        "error": true,
        "message": "Email already taken."
      }
      ```
  * If username is already taken:
    * Status Code: 400
    * JSON Response:
      ```json
      {
        "error": true,
        "message": "Username already taken."
      }
      ```

#### Delete Account
* Endpoint: /users/<users_id>
* Method: DELETE
* Request Body:
  * password (string): User's password
* Response:
  * If successful:
    * Status Code: 200
    * JSON Response:
      ```json
      {
        "error": false,
        "message": "Account deleted successfully."
      }
      ```
  * If password are incorrect:
    * Status Code: 400
    * JSON Response:
      ```json
      {
        "error": true,
        "message": "Password is incorrect."
      }
      ```
      
#### Logout
* Endpoint: /authentications
* Method: POST
* Request Body:
  * refresh_token (string): User's get new token
* Response:
  * If successful:
    * Status Code: 200
    * JSON Response:
      ```json
      {
        "error": false,
        "message": "Logout successfully."
      }
      ```

### Tools Service
#### Upload Tools (Scanning Image)
* Endpoint: /tools/scan_tools
* Method: POST
* Request Body:
  * image_url (file): User's image
* Response:
  * If successful:
    * Status Code: 200
    * JSON Response:
      ```json
      {
        "tools_name": "<tools_name>",
        "tags": ["Legs", "Cardiovascular System"],
        "video_url": "https://example.com/tutorials/treadmil",
        "tools_step": "<tools_step>"
      }
      ```

#### Show List Tools
* Endpoint: /tools
* Method: POST
* Request Body:
  * image_url (file): Server image
* Response:
  * If successful:
    * Status Code: 200
    * JSON Response:
      ```json
      {
        "photo_url": "<photo_url>",
        "tools_name": "<tools_name>",
        "tools_description": "<tools_description>"
      }
      ```

### Feedback Service
* Endpoint: /feedback
* Method: DELETE
* Request Body:
  * user_rating (int): User's rating
  * user_feedback (string): User's comment feedback
* Response:
  * If successful:
    * Status Code: 200
    * JSON Response:
      ```json
      {
        "error": false,
        "message": "Thankyou for giving feedback."
      }
      ```
  * If users not entry rating:
    * Status Code: 400
    * JSON Response:
      ```json
      {
        "error": true,
        "message": "Please, provide a rating between 1 and 5."
      }
      ```
