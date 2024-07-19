const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
// Serve static files from frontend/build
app.use(express.static(path.join(__dirname, "../frontend/build")));
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000', // Allow only this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent
    allowedHeaders: 'Content-Type,Authorization'
  }));
// app.use(cors({
//     origin: ["http://localhost:3000","https://pinvent-app.vercel.app"],
//     credentials: true,
//  }));

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);

// Routes
// app.get("/", (req, res) => {
//     res.send("Home Page");
// });

// Error Middleware
app.use(errorHandler);

app.get("*", (req, res) => {
    const filePath = path.join(__dirname, "../frontend/build/index.html");
    console.log(`Serving file from ${filePath}`);
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error(`Error serving file: ${err}`);
        res.status(500).send(`Error serving file: ${err}`);
      }
    });
  });
const PORT = process.env.PORT || 5000;

// Connect to DB and start server
mongoose 
    .connect(process.env.MONGO_URI) 
    .then(() => {

        app.listen(PORT, () => {
            console.log(`Server Running on Port ${PORT}`)
        })
        console.log('hoga connect');
    })
    .catch((err) => console.log(err))