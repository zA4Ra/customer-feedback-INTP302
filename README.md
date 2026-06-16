# Customer Feedback Sentiment Dashboard

INTP302 – Midterm Team Project

A web app where users submit feedback, Azure AI analyzes the sentiment, and results are saved and displayed on a dashboard.

## Team

| Name      | Role                |
| --------- | ------------------- |
| Diego     | Frontend            |
| Anshpreet | Cloud Development   |
| Aryan     | AI Integration      |
| Zaara     | Data Storage & Docs |

## Azure Services

| Service            | What it does                                |
| ------------------ | ------------------------------------------- |
| Azure App Service  | Hosts the app                               |
| Azure AI Language  | Analyzes sentiment and extracts key phrases |
| Azure SQL Database | Saves all feedback entries                  |

## How to Run Locally

1. Clone the repo and install dependencies:

```bash
git clone https://github.com/zA4Ra/customer-feedback-INTP302.git
cd customer-feedback-INTP302
npm install
```

2. Create a `.env.local` file with these variables:

```
AZURE_SQL_CONNECTION_STRING=your_connection_string
AZURE_LANGUAGE_KEY=your_language_key
AZURE_LANGUAGE_ENDPOINT=your_language_endpoint
```

3. Start the app:

```bash
npm run dev
```

## Database

Table name: `feedback`

| Column      | Description                           |
| ----------- | ------------------------------------- |
| FeedbackID  | Auto ID                               |
| CommentText | The feedback text                     |
| Sentiment   | positive / negative / neutral / mixed |
| KeyPhrases  | Key words extracted from feedback     |
| SubmittedAt | Date and time submitted               |

## Environment Variables

| Variable                    | Purpose                        |
| --------------------------- | ------------------------------ |
| AZURE_SQL_CONNECTION_STRING | Connects to Azure SQL Database |
| AZURE_LANGUAGE_KEY          | Azure AI Language API key      |
| AZURE_LANGUAGE_ENDPOINT     | Azure AI Language endpoint URL |

> API keys are stored in Azure App Settings for deployment — never in the code or GitHub.

## Known Limitations

- Best with English text; other languages may give inaccurate results
- No user login — anyone with the URL can submit feedback
- Short or sarcastic feedback may not be analyzed correctly

## Responsible AI

- **Fairness:** Sentiment accuracy may vary by language or writing style
- **Privacy:** No personal data collected; API keys are secured
- **Transparency:** Users are not currently told AI is analyzing their input
- **Accountability:** A human should review results before making decisions

## Future Plans

Add an AI agent that automatically routes negative feedback to a support team and creates tickets.
