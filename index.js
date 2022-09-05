const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require("dotenv").config();
const fileUpload = require('express-fileupload')
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;

//DB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});


// Data parsing
app.use(cors({
    credentials: true,
    origin: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);
app.use(fileUpload({
    useTempFiles: true
}));

//routes


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


// HTTP request logger
app.listen(PORT, console.log(`Server is starting at ${PORT}`));