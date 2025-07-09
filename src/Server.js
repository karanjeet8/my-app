const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");
const app = express();
const PORT = 4000;

const credentials = require("./google-credentials.json");
const spreadsheetId = "YOUR_SPREADSHEET_ID";

app.use(cors());
app.use(express.json());

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

app.get("/vip-data", async (req, res) => {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A2:F",
  });

  const rows = response.data.values || [];

  const formattedData = rows.map((row) => ({
    level: row[0],
    percent: row[1],
    unlocked: row[2],
    orders: row[3],
    rate: row[4],
    image: row[5],
  }));

  res.json(formattedData);
});

app.post("/update-vip-data", async (req, res) => {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  const data = req.body;
  const values = data.map((vip) => [
    vip.level,
    vip.percent,
    vip.unlocked,
    vip.orders,
    vip.rate,
    vip.image,
  ]);

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "Sheet1!A2:F",
    valueInputOption: "RAW",
    requestBody: { values },
  });

  res.json({ message: "VIP data updated successfully." });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
