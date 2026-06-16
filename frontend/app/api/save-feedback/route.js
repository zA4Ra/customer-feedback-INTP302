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

export async function POST(request) {
  try {
    const { text, sentiment, keyPhrases } = await request.json();

    const pool = await sql.connect(config);
    await pool.request()
      .input("CommentText", sql.NVarChar, text)
      .input("Sentiment", sql.NVarChar, sentiment)
      .input("KeyPhrases", sql.NVarChar, Array.isArray(keyPhrases) ? keyPhrases.join(", ") : keyPhrases)
      .query("INSERT INTO feedback (CommentText, Sentiment, KeyPhrases) VALUES (@CommentText, @Sentiment, @KeyPhrases)");

    return Response.json({ success: true });

  } catch (error) {
    console.error("SQL save error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}