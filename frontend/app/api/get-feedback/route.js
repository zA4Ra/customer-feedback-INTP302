import sql from "mssql";

const config = {
  server: "feedback123.database.windows.net",
  database: "feedbackdb",
  user: "CloudSA272b6913",
  password: "Feedback@123",
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

export async function GET() {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .query("SELECT TOP 20 * FROM feedback ORDER BY SubmittedAt DESC");

    const entries = result.recordset.map(row => ({
      id: row.FeedbackID,
      text: row.CommentText,
      sentiment: row.Sentiment.toLowerCase(),
      keyPhrases: row.KeyPhrases ? row.KeyPhrases.split(", ") : [],
      timestamp: row.SubmittedAt
    }));

    return Response.json({ success: true, entries });

  } catch (error) {
    console.error("SQL fetch error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}