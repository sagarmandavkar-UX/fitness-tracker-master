const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

// Configure Nodemailer with your email service
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: functions.config().email.user,  // Use environment variable to store email user
    pass: functions.config().email.password  // Use environment variable to store email password
  }
});

// HTTPS function to handle contact form submissions
exports.sendEmail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    // Extract data from POST request body
    const { name, email, message } = req.body;

    // Create email message
    const mailOptions = {
      from: 'Your Name <your-email@gmail.com>',  // Sender address
      to: 'svatsal64@gmail.com',  // Replace with your email address
      subject: 'New Inquiry from Contact Form',
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully');
      }
    });
  });
});
