const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    store: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
    storeWebsite: {
        type: String,
        trim: true,
    },
    code: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"]
    },
    phone: {
        type: String
    },
    role: {
        type: Number,
        default: 0 // 0 = user, 1 = admin
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
    },
    profile: {
        type: Number,
        default: 0 // 0 = seller, 1 = buyer | 
    },
    department: {
        type: Number,
        default: 0 // 0 = admins, 1 = marketing | 
    },
    name: {
        type: String,
        // trim: true,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)