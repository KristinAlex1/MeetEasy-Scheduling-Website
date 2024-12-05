import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Fetch OAuth tokens from session or database (or pass them directly for now)
    const { accessToken, refreshToken } = req.body; // Make sure to pass the tokens in the request body

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const event = {
      summary: req.body.summary,  // Event title
      location: req.body.location, // Event location
      description: req.body.description, // Event description
      start: {
        dateTime: req.body.startDateTime, // Start date and time (ISO format)
        timeZone: 'America/New_York', // Your timezone (change as needed)
      },
      end: {
        dateTime: req.body.endDateTime,  // End date and time (ISO format)
        timeZone: 'America/New_York',
      },
      attendees: req.body.attendees,  // Array of attendees (optional)
    };

    try {
      const calendarEvent = await calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });

      res.status(200).json({ event: calendarEvent.data });
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ error: 'Error creating the event' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
