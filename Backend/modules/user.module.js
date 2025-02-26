import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password: {
        type:String,
        require: true
    },
    first_name: {
        type: String,
        require: true,
    },
    last_name: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true
    },
    phone: {
        type:String,
        require:false
    },
    lastLogin: {
        type: Date,
        dafault:Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    },
    {timestamps: true}
)

export const User = mongoose.model('Utilisateure', userSchema)