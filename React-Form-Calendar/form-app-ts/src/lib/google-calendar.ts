const { google } = require("googleapis");

const calendar = google.calendar("v3");

const auth = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY,
  ["https://www.googleapis.com/auth/calendar.readonly"]
);

export default auth;