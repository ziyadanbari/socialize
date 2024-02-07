import { Schema, models, model } from "mongoose";
import bcrypt from "bcryptjs";

const postsSchema = new Schema({
  photo: String,
  description: String,
  likes: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  comments: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      comment: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
      like: Number,
    },
  ],
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  provider: {
    type: String,
    required: false,
    default: "credentials",
    enum: ["credentials", "google"],
  },
  avatar: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  followers: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  following: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  posts: [postsSchema],
  blackListTokens: {
    type: [String],
    default: [],
  },
});

userSchema.statics.isExist = async function (username) {
  return this.findOne({ username });
};

userSchema.pre("save", function (next, { hashPassword }) {
  if (hashPassword) {
    const password = this.password;
    const hashedPassword = bcrypt.hashSync(password, 10);
    this.password = hashedPassword;
  }
  return next();
});

export default models?.users || model("users", userSchema);
