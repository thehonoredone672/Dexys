const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {

  const { name, email, message } = req.body;

  console.log("REQUEST RECEIVED:", req.body);

  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"DEXYS Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,

      /* SUBJECT */
      subject: `New Contact Message from ${name}`,

      /* EMAIL CONTENT */
      html: `
        <h2>📩 New Contact Message</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>

        <hr>

        <p><strong>Message:</strong></p>
        <p>${message}</p>

        <br>
        <small>Sent from DEXYS Website Contact Form</small>
      `,
    });

    console.log("EMAIL SENT SUCCESS");

    res.json({ success: true });

  } catch (err) {
    console.log("EMAIL ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
