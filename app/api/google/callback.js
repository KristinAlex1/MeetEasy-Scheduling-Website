import { google } from "googleapis";

export default async function handler(req, res) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const { code } = req.query; // Get the authorization code from the query params

  try {
    const { tokens } = await oauth2Client.getToken(code); // Exchange code for tokens
    oauth2Client.setCredentials(tokens);

    // Save tokens to session or database (for simplicity, we'll send them back)
    res.status(200).json({ tokens });
  } catch (error) {
    console.error("Error during callback:", error);
    res.status(500).send("Authentication failed.");
  }
}
