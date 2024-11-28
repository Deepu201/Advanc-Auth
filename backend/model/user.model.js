import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email must be required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password must be required'],
    },
    name: {
        type: String,
        required: [true, 'Name must be required'],
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
}, { timestamps: true });


const User =mongoose.model('User',userSchema)
export { User}