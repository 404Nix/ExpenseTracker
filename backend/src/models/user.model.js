import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Name is required"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: [true, "Must be Unique"],
            lowercase: [true, "Must be in all lowerCase"],
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
    },
    { timestamps: true },
);

userSchema.pre("save", async function() {

    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
})

export const User = mongoose.model("User", userSchema);