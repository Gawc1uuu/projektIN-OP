import { Schema, model, Model, Types } from "mongoose";
import * as bcrypt from "bcrypt";
import validator from "validator";

interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  username: string;
  email: string;
  password: string;
  trips: Types.ObjectId[];
  houses: Types.ObjectId[];
}

interface IUserModel extends Model<IUser> {
  signup(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
  ): Promise<IUser>;
  login(email: string, password: string): Promise<IUser>;
}

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  trips: [{ type: Types.ObjectId, ref: "Trip" }],
  houses: [{ type: Types.ObjectId, ref: "House" }],
});

userSchema.statics.login = async function (
  email: string,
  password: string
): Promise<IUser | null> {
  if (!email || !password) {
    throw Error("email and password are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Incorrect email");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("user with that email do not exists");
  }

  const match = await bcrypt.compare(password, user.password);

  if (match) {
    return user;
  } else {
    throw Error("incorrect password");
  }
};

userSchema.statics.signup = async function (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string
): Promise<IUser> {
  if (!email || !password || !username || !firstName || !lastName) {
    throw Error("All fields are required");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("User with that email already exists");
  }
  const isUsedUsername = await this.findOne({ username });
  if (isUsedUsername) {
    throw Error("Username is already taken");
  }

  if (!validator.isEmail(email)) {
    throw Error("Incorrect email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = this.create({
    firstName,
    lastName,
    username,
    email,
    password: hash,
  });
  return user;
};

const User = model<IUser, IUserModel>("User", userSchema);
export default User;
