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

// Middlewares
app.use(cors({
// <<<<<<< HEAD
  // origin: ["http://localhost:3000", "https://inven-red.onrender.com"],
// <<<<<<< HEAD
// =======
  // origin: ["*", "https://inven-red.onrender.com"],
// >>>>>>> 26c1f2d750329a3a9047f0973a22efc64896986b
  // credentials: true, 
// =======
// =======
  origin: ["*"],
// >>>>>>> 26c1f2d750329a3a9047f0973a22efc64896986b
  credentials: true,
// >>>>>>> 2da72ef249422b70dc5d9a39524b029248a28fc6
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use(cookieParser());
app.use(express.urlencoded({extended: false})); 
app.use(bodyParser.json());

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
