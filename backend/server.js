require("dotenv").config();
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
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));  
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

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
    .connect(process.env.PUBLIC_MONGO_URI) 
    .then(() => {

        app.listen(PORT, () => {
            console.log(`Server Running on Port ${PORT}`)
        })
        console.log('hoga connect');  
    })
    .catch((err) => console.log(err)); 
