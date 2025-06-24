// creating user schema...
import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true // <-- This enables createdAt and updatedAt
});


const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;