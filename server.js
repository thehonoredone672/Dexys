require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Static Files */
app.use(express.static(path.join(__dirname, "public")));

/* Routes */
const contactRoute = require("./routes/contact");
app.use("/api/contact", contactRoute);

/* Homepage */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`DEXYS server running on port ${PORT}`);
});
