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
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Mohamed Watches",
          email: "mohamed.watches0@gmail.com",
        },
        to: [{ email: to }],
        subject: subject,
        htmlContent: htmlContent,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Email sending failed:", data);
      return {
        statusCode: response.status,
        body: JSON.stringify({
          message: "Email sending failed",
          error: data,
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Email sent successfully",
        response: data,
      }),
    };
  } catch (error) {
    console.error("Email sending failed:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Email sending failed",
        error: error.message,
      }),
    };
  }
}
