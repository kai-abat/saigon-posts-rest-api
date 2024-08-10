const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const postRoutes = require("./routes/postRoutes");
// Mongoose - Object document mapping library

// mongodb+srv://dbKai:dbKai1234@cluster0.gefumij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const dbURI =
  "mongodb+srv://dbKai:dbKai1234@cluster0.gefumij.mongodb.net/saigonBrewsersDB?retryWrites=true&w=majority&appName=Cluster0";

// express app
const app = express();

// register view engine
app.set("view engine", "ejs");

app.use(express.json());

// listen for requests after database connection is completed
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3001, () => console.log("server started from port 3001"));
  })
  .catch((err) => {
    console.log(err);
  });

app.use((req, res, next) => {
  console.log("new request made:");
  console.log("host: ", req.hostname);
  console.log("path: ", req.path);
  console.log("method: ", req.method);
  next();
});

app.use((req, res, next) => {
  console.log("in the next middleware");
  next();
});

// cors policy
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// middleware & static files
// public folder
app.use(express.static("public"));
// form data
app.use(express.urlencoded({ extended: true }));

// 3rd party middleware
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

app.use("/api/posts", postRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
