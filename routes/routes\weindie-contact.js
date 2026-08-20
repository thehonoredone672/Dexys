const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {

  const { name, email, about } = req.body;

  console.log("WEINDIE JOIN REQUEST RECEIVED:", req.body);

  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"WeIndie" <${process.env.EMAIL_USER}>`,
      to: "weindiecommunity@gmail.com",

      /* SUBJECT */
      subject: `New WeIndie Join Request from ${name}`,

      /* EMAIL CONTENT */
      html: `
        <h2>New WeIndie Join Request</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>

        <hr>

        <p><strong>Who they are / what they're building:</strong></p>
        <p>${about}</p>

        <br>
        <small>Sent from the WeIndie join form</small>
      `,
    });

    console.log(`WEINDIE EMAIL SENT SUCCESS - ${new Date().toLocaleString()}`);

    res.json({ success: true });

  } catch (err) {
    console.log(`WEINDIE EMAIL ERROR - ${new Date().toLocaleString()}:`, err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
