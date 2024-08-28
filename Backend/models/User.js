import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    completeName:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    profilePicture:{
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg",
    },
    bio:{
        type: String,
        default: ""
    },
    gender:{
        type: String,
        enum: ["male", "female","other"]
    },
    followers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    following:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    bookmarks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
},{timestamps: true})

export const User = mongoose.model('User', userSchema)