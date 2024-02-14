import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose, { Model } from "mongoose";
import ENV from "../constants/env.constant";
import { JwtTokenType } from "../constants/index";
import { defaultModelSettings } from "../constants/model.constant";

export interface IUser {
  id: string;
  _id: string;
  fullname: string;
  email: string;
  password: string;
  profilePic?: string;
  location?: string;
  isAccountVerified?: boolean;
  tokens?: { accessToken: string; refreshToken: string }[];
  fcmToken?: string;

  subStatus: "paid" | "free_tier";
  [key: string]: any;
}

export type IUserModel = Model<IUser>;

interface IUserStaticHandlers {
  login: (by: string, string: string, password: string) => Promise<any>;
}

interface IUserInstanceHandlers {
  [key: string]: any;
}

const userSchema = new mongoose.Schema<
  IUser,
  IUserModel,
  IUserInstanceHandlers,
  {},
  {},
  IUserStaticHandlers
>(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    }, // will be hidden
    profilePic: String,
    location: String,
    subStatus: {
      type: String,
      enum: ["paid", "free_tier"],
      default: "free_tier",
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    tokens: [
      {
        accessToken: String,
        refreshToken: String,
      },
    ],
  },
  {
    ...defaultModelSettings,
  }
);

// Obscuring the user details
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// this method generates a new token for a user
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const accessToken = jwt.sign(
    { _id: user._id.toString() },
    ENV.ACCESS_TOKEN_SEC,
    {
      expiresIn: ENV.TOKEN_EXPIRATION_TIME || "5m",
    }
  );
  const refreshToken = jwt.sign(
    { _id: user._id.toString() },
    ENV.REFRESH_TOKEN_SEC,
    {
      expiresIn: "1d",
    }
  );

  user.tokens = user.tokens.concat({ accessToken, refreshToken });
  await user.save();

  return { accessToken, refreshToken };
};

userSchema.methods.refreshAuthToken = async function () {
  const user = this;

  const tokens = await user.generateAuthToken();
  const obscuredUser = user.toJSON();

  return { ...obscuredUser, ...tokens };
};

// verification ...
userSchema.methods.generateVerificationToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id, type: JwtTokenType.verification },
    ENV.REFRESH_TOKEN_SEC,
    {
      expiresIn: 600, // expire time is very important for verifications
    }
  );

  return token;
};

// implement send code on email
userSchema.statics.login = async (
  by = "email" || "username",
  string,
  password
) => {
  return new Promise(async (res, rej) => {
    const user: any = await User.findOne({ [by]: string });

    const errMessage = {
      message: "Pls provide valid credentials",
    };

    if (!user) {
      // 404 but lets keep it simple bcuz of hackers
      rej(errMessage);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) rej(errMessage);

    const tokens = await user.generateAuthToken();
    const obsuredUser: object = user.toJSON();

    res({ ...obsuredUser, ...tokens });
  });
};

userSchema.pre("save", async function (next) {
  const user: any = this;

  // Hash the plain text password before saving
  if (user.isModified("password")) {
    const saltEnv: number = parseInt(ENV.BCRYPT_SALT as string);
    const salt = bcrypt.genSaltSync(saltEnv);
    user.password = bcrypt.hashSync(user.password, salt);
  }

  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const doc: any = this;
  const user: any = doc._update;
  const previousUser: any = await doc.model.findOne(this.getQuery());

  // Hash the plain text password before saving
  if (user?.password && user?.password !== previousUser?.password) {
    user.password = await bcrypt.hash(user.password, ENV.BCRYPT_SALT);
  }

  next();
});

// Delete collections when user is removed
userSchema.pre("remove", async function (next) {
  const user: any = this;

  // await Model.deleteMany({ userId: user._id })
  // add the remaining collections to be deleted when a user is removed!

  next();
});

const User = mongoose.model("users", userSchema);

module.exports = User;
export default User;
