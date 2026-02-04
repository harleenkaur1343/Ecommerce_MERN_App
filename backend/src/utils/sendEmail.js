import Brevo from "@getbrevo/brevo";

const apiInstance = new Brevo.TransactionalEmailsApi();

// SET API KEY
apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_OTP_KEY
);

const sendEmail = async (to, subject, html) => {
  try {
    console.log("BREVO KEY EXISTS:", !!process.env.BREVO_OTP_KEY);

    await apiInstance.sendTransacEmail({
      sender: {
        email: process.env.EMAIL_SENDER,
        name: "NuraSkin",
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    });

    console.log("Brevo email sent");
  } catch (error) {
    console.error("Brevo email error:", error.response?.body || error);
    throw error;
  }
};

export default sendEmail;
