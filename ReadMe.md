#  Readme

This README provides an overview of how to use the project. In this example, we have developed a User Authentication System with CRUD operations using React.js for the front-end and Node.js with Express for the back-end. This application allows users to sign up, log in, view their profile, update their profile, and delete their account. Redux is used for state management. The main components covered include actions, reducers, and the store.

Main Features:
```
User Registration
User Login
Profile Viewing
Profile Updating
Account Deletion
```
Technologies Used:
```
React.js
Node.js
Express
Redux
```
## Prerequisites

Before you start, make sure you have Node.js and Yarn installed on your system. You can download and install them from the official websites:

- [Node.js](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/)

## Project Structure

The project has the following structure:

For Frontend
```
src/
   components/
       ChangePassword.jsx
      Home.jsx
      Login.jsx
      Profile.jsx
      SignUp.jsx
   redux/
     apiRoutes/
        api.js
     featues/
        authslice.js
     store/
         store.js
   utils/
      ProtectedRoutes.js

```
For Backend
```
src/
  contollers/
    user.controller.js
  middlewares/
     auth.js
     multer.js
  modles/
  routes/
  utils/
    APiError.js
    ApiResponse.js
    asynchHandler.js
    cloudinary.js

```

.env file{

    PORT="port number"
    MONGODB_URI="your url"
    //define here origin which you want to allow . In my case a url form database
    CORS_ORIGIN=""
    ACCESS_TOKEN_SECRET=""
    ACCESS_TOKEN_EXPIRY=""
    REFRESH_TOKEN_SECRET=""
    REFRESH_TOKEN_EXPIRY=""
     // from cloudinary account 
    CLOUDINARY_CLIENT_NAME=""
    CLOUDINARY_API_KEY=""
    CLOUDINARY_API_SECRET=""
}

## Installation

To set up the project and use , follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Change to the project directory:

   ```bash
   cd <project_directory>
   ```

3. Install dependencies using Node(npm) - for both Backend and Frontend:

   ```bash
   npm install
   ```


## Running the Application

To run the application, you can use the following command:

```bash
npm run dev
```

This will start your development server (as well client) and allow you to interact with your this application.

## Conclusion

This README provides a basic overview of setting up and using User Authentication System with CRUD operations in your JavaScript project.I have enjoyed working on this project and appreciate the opportunity to learn and grow. Thank you once again 
