const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      // Password is optional since OAuth users don't need it , I have added it for potential local auth in the future  
      default: null,
    },
    picture: {
      type: String,
      default: null,
    },
    provider: {
      type: String,
      enum: ["google", "github", "local"],
      required: true,
    },
    providerId: {
      type: String,
      required: true,
    },
    providerUserId: {
      type: String,
      unique: true,
      required: true,
    },
    credits: {
      type: Number,
      default: 5,
    },
    creditsResetAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function(next) {
  const maxCredits = parseInt(process.env.MAX_CREDITS) || 5;
  if (this.credits === null || this.credits === undefined) {
    this.credits = maxCredits;
  }

  if (!this.creditsResetAt) {
    this.creditsResetAt = new Date();
  }
  
  next();
});

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
