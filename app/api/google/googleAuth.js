const { google } = require("googleapis");
const fs = require("fs");

// Load your OAuth 2.0 credentials (JSON downloaded from Google Cloud)
const credentials = JSON.parse(fs.readFileSync("path/to/credentials.json"));

// Set up OAuth2 client
const { client_id, client_secret, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Generate Auth URL
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
});

console.log("Authorize your app by visiting this URL:", authUrl);

// Exchange authorization code for tokens
async function getAccessToken(code) {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  console.log("Tokens saved:", tokens);
  return oAuth2Client;
}

module.exports = { oAuth2Client, getAccessToken };
