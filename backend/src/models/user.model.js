import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Enter the full name"],
      trim: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      requard: [true, "please enter valid email"],
      unique: [true, "email already exits"],
      lowecase: true,
      trim: true,
    },
    mobileNo: {
      type: Number,
      requard: [true, "please enter valid mobile number"],
      unique: [true, "Mobile Number already exits"],
    },
    password: {
      type: String,
      requard: [true, "Password is required"],
      select: false,
    },
    avatar: {
      type: String, // cloudinary url
      required: false,
    },
    refreshToken: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    verified: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

// Pre middleware to hash the password before saving
//Pre middleware functions are executed one after another, when each middleware calls next.
userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next(); // to check password field is modified or not

  this.password = await bcrypt.hash(this.password, 10);
  next();
}); //this will save password with hashed

//check password or compare password (controller)
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
}; // saved password = this.password

//generate acces token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

//generate refreshtoken
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// export const User = mongoose.model("User", userSchema)

const User = new mongoose.model("User", userSchema);
export default User;
