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
    shops: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shops"
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)