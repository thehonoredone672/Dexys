// server.js
require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Static Files */
// This serves static assets like CSS, images, and JS files from the public folder
app.use(express.static(path.join(__dirname, "public")));

/* API Routes */
const contactRoute = require("./routes/contact");
app.use("/api/contact", contactRoute);

/* --- HTML Page Routes --- */

// Homepage
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.get("/home", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

// Main Pages
app.get("/products-services", (req, res) => res.sendFile(path.join(__dirname, "public", "products-services.html")));
app.get("/contact", (req, res) => res.sendFile(path.join(__dirname, "public", "contact.html")));
app.get("/about", (req, res) => res.sendFile(path.join(__dirname, "public", "about.html")));

// Team / Profile Pages
app.get("/dharsan", (req, res) => res.sendFile(path.join(__dirname, "public", "dharsan.html")));
app.get("/naveenkumar", (req, res) => res.sendFile(path.join(__dirname, "public", "naveenkumar.html")));
app.get("/arun", (req, res) => res.sendFile(path.join(__dirname, "public", "arun.html")));
// app.get("/anton", (req, res) => res.sendFile(path.join(__dirname, "public", "anton.html")));

/* ------------------------ */

/* Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`DEXYS server running on port ${PORT}`);
});
