const { post } = require("axios");

require("dotenv").config();

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  const { to, subject, htmlContent } = JSON.parse(event.body);

  if (!to || !subject || !htmlContent) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing required fields" }),
    };
  }

  try {
    const response = await post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Mohamed Watches",
          email: "mohamed.watches0@gmail.com", // Must be a verified sender in Brevo
        },
        to: [{ email: to }],
        subject: subject,
        htmlContent: htmlContent,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Email sent successfully",
        response: response.data,
      }),
    };
  } catch (error) {
    console.error(
      "Email sending failed:",
      error.response?.data || error.message
    );
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Email sending failed",
        error: error.response?.data || error.message,
      }),
    };
  }
}
