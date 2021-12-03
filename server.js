require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const path = require('path')
const morgan = require('morgan');


const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))
app.use(morgan('dev'));

// Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api/cars', require('./routes/carRouter'))
app.use('/api/shop', require('./routes/shopRouter'))
app.use('/api/product', require('./routes/productRouter'))

// Files Uploads
app.use('/public', express.static('public'));

// Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log(`DB Connected...`)
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})