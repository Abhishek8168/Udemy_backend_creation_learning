import mongoose, {Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import crypto from 'crypto'

const userSchema = new Schema(
    {
        avatar: {
            type: {url: String, localPath: String},
            default: {url: `https://placehold.co/200x200`, localPath: ``}
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullname: {
            type: String,
            trim: true
        },
        password: {
            type: String,
            required: [true, "password is required"]
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        refreshToken: {
            type: String
        },
        forgotPasswordToken: {
            type: String
        },
        forgotPasswordExpiry: {
            type: Date
        },
        emailVerificationToken: {
            type: String
        },
        emailVerificationExpiry: {
            type: Date
        }
    }, 
    {
        timestamps: true,
    }
);

// adding hooks
userSchema.pre('save', async function() {
    if(!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10)
});

// adding methods
userSchema.methods.isPaasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// generating access token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    )
}
// generating refresh token
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    )
}

// usign crypto for without data token
userSchema.methods.generateTemporaryToken = function(){
    const unHashedToken = crypto.randomBytes(30).toString('hex');
    const hashedToken = crypto
                            .createHash("sha256")
                            .update(unHashedToken)
                            .digest('hex');
    const tokenExpiry = Date.now() + (20*60*1000) // 20 min
    return {unHashedToken, hashedToken, tokenExpiry}
}


export const User = mongoose.model("User", userSchema)