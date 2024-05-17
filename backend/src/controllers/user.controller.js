import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

//generate tokens
//on the basis of userId
const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    //save
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); //dosenot peform any validation just save
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

// for refresh access  token  --it will help when user is not login longtime or experied token
const refreshAccessToken = asyncHandler(async (req, res) => {
  //access thorugh cookies or body
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    //get user  form db throught token  userid
    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    //when true, as compliant clients will not allow client-side JavaScript to see the cookie in document.cookie.
    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { fullName, username, email, password, mobileNo } = req.body;
  //console.log("email: ", email);

  // check for all fileds using [array]method
  //.some A function that accepts up to three arguments. The some method calls the predicate function for each element in the array until the predicate returns a value which is coercible to the Boolean value true, or until the end of the array.
  if (
    [fullName, username, email, mobileNo, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return next(new ApiError(400, "Please provide valid email"));
  }

  //to check user exist or not
  // User.findOne()-Fetches a single document from the MongoDB collection that matches the provided query.
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  //This is a MongoDB query operator. The $or operator is used to specify that the query should match documents where at least one of the given conditions is true

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  //console.log(req.files);

  //multer gives req.files excess
  const avatarLocalPath = req.files?.avatar[0]?.path; //its (multer) give proper file path

  //check for avatar
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file path is required");
  }

  //upload on cloudinary  its takes time to upload so its betterto use await
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  //to create file in db  use store image ko url
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    email,
    password,
    mobileNo,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  ); // not return password and refreshToken

  //check user register ornot
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  //req body-> data
  //username or email
  //find user
  //password check
  //access and refresh token
  //send token through cookies

  const { email, username, password } = req.body;
  //console.log(email)

  //we need username or email
  if (!username && !email) {
    throw new ApiError(400, "username or email is required");
  }
  // alternative of above code
  // if (!(username || email)) {
  //     throw new ApiError(400, "username or email is required")

  // }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  }); //we find user based on  username or email

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  //check password
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  //generate token here
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  //above user token is empty bcz we generate token below  so i used User(Model)
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //now for cookies
  const options = {
    httpOnly: true,
    secure: true,
  }; //this cookies only modified by server

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  //we get user through middlewere verifyjwt
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    } // new: tre-> return response  will get  new updated value
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);

  const { oldPassword, newPassword, confirmPassword } = req.body;

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }
  if (!newPassword === confirmPassword) {
    throw new ApiError(400, "Password must  be match");
  }

  //now user can change
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

//due to middlewar  req.user= user -> middleware  so we esaily get user from req only if user is logined
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  // user cannot update email or username in my case
  const { fullName, mobileNo } = req.body;

  if (!fullName || !mobileNo) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        mobileNo: mobileNo,
        email: email,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});
const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path; //we need only one file

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading on avatar");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar image updated successfully"));
});

export {
  refreshAccessToken,
  registerUser,
  loginUser,
  logoutUser,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
};
