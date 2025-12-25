import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  try {
    //created a transporter defining the service used to sent the mail n the auth from the source account
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending mail ", error);
    throw new Error("Email could not be sent");
  }
};

export default sendEmail;
