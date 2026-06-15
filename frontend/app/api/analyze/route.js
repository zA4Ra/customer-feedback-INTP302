export async function POST(request) {
  try {
    const { text } = await request.json();

    const endpoint = process.env.AZURE_FOUNDRY_ENDPOINT;
    const apiKey = process.env.AZURE_FOUNDRY_KEY;

    const response = await fetch(
      `${endpoint}/openai/deployments/gpt-4.1-mini/chat/completions?api-version=2025-04-01-preview`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `You are a sentiment analysis assistant.
              Analyze the given customer feedback and respond ONLY with a JSON object like this:
              {
                "sentiment": "positive" or "negative" or "neutral" or "mixed",
                "confidence": a number between 0 and 1,
                "keyPhrases": ["phrase1", "phrase2", "phrase3"]
              }
              No extra text, just the JSON.`,
            },
            {
              role: "user",
              content: text,
            },
          ],
          max_tokens: 200,
        }),
      }
    );

    // Check if the response is ok
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Azure error:", errorText);
      return Response.json(
        { success: false, error: errorText },
        { status: 500 }
      );
    }

    const data = await response.json();
    const raw = data.choices[0].message.content;
    const result = JSON.parse(raw);

    return Response.json({ success: true, result });

  } catch (error) {
    console.error("AI error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}