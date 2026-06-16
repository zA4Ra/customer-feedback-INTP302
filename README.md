# Customer Feedback Sentiment Dashboard

A web application that analyzes the sentiment of customer feedback using Azure AI Language. Users submit feedback through a clean dark-themed interface and instantly see whether the sentiment is positive, negative, neutral, or mixed — along with key phrases and a confidence score. All results are stored in Azure SQL Database and displayed on a live dashboard.

Built as part of the INTP302 Emerging Trends in Software Development midterm project at SAIT.

---

## Team Members

| Name | Role |
|------|------|
| Ansh Singh | Cloud Deployment & Frontend(Azure App Service) |
| Aryan Saini | AI Integration & Dashboard (Azure AI Language) |
| Zaara Ahmad | Data Storage & Documentation (Azure SQL Database) |

---

## Live App

> Link will be added once deployed by Ansh

---

## Features

- Submit customer feedback through a clean dark-themed UI
- Instant sentiment analysis powered by Azure AI Language
- Displays sentiment label (positive, negative, neutral, mixed)
- Shows confidence score and key phrases for each submission
- Dashboard showing live sentiment counts and recent submissions
- All feedback stored persistently in Azure SQL Database

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js (React) |
| AI Service | Azure AI Language |
| Cloud Hosting | Azure App Service |
| Data Storage | Azure SQL Database |
| Language | JavaScript |

---

## Azure Services Used

- **Azure App Service** — hosts the Next.js web application on a live public URL
- **Azure AI Language** — analyzes feedback text and returns sentiment label, confidence score, and key phrases
- **Azure SQL Database** — stores each feedback entry with text, sentiment result, key phrases, and timestamp

---

## Database Schema

```sql
CREATE TABLE feedback (
  FeedbackID   INT IDENTITY(1,1) PRIMARY KEY,
  CommentText  NVARCHAR(MAX) NOT NULL,
  Sentiment    NVARCHAR(50) NOT NULL,
  KeyPhrases   NVARCHAR(MAX),
  SubmittedAt  DATETIME DEFAULT GETDATE()
);
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org) (LTS version)
- [Git](https://git-scm.com)
- An Azure account with access to Azure AI Language and Azure SQL Database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/zA4Ra/customer-feedback-INTP302.git
cd customer-feedback-INTP302
```

2. Go into the frontend folder:
```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
```

4. Create a `.env.local` file inside the `frontend` folder:
```
AZURE_LANGUAGE_KEY=your_azure_language_key
AZURE_LANGUAGE_ENDPOINT=your_azure_language_endpoint
AZURE_SQL_CONNECTION_STRING=Server=tcp:feedback123.database.windows.net,1433;Initial Catalog=feedbackdb;Persist Security Info=False;User ID=your_username;Password=your_password;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
```

5. Run the app locally:
```bash
npm run dev
```

6. Open your browser and go to:
- `http://localhost:3000` — Submit Feedback page
- `http://localhost:3000/dashboard` — Sentiment Dashboard

---

## Environment Variables

| Variable | Description | Set Up By |
|----------|-------------|-----------|
| `AZURE_LANGUAGE_KEY` | API key for Azure AI Language service | Aryan |
| `AZURE_LANGUAGE_ENDPOINT` | Endpoint URL for Azure AI Language service | Aryan |
| `AZURE_SQL_CONNECTION_STRING` | Connection string for Azure SQL Database | Zaara |

> Never commit your `.env.local` file to GitHub. It is already listed in `.gitignore`.

---

## How It Works

1. User types feedback into the form and clicks **Analyze Sentiment**
2. The frontend sends the text to a Next.js API route (`/api/analyze`)
3. The API route calls Azure AI Language with the feedback text
4. Azure returns a sentiment label, confidence score, and key phrases
5. The result is saved to Azure SQL Database via `/api/save-feedback`
6. The dashboard reads stored entries via `/api/get-feedback` and shows live sentiment counts

---

## Project Structure

```
customer-feedback-INTP302/
  frontend/                        # Next.js app
    app/
      page.js                      # Feedback submission form
      layout.js                    # Navigation bar and layout
      dashboard/
        page.js                    # Sentiment dashboard
      api/
        analyze/
          route.js                 # Azure AI Language API route (Aryan)
        save-feedback/
          route.js                 # Saves feedback to SQL Database (Aryan + Zaara)
        get-feedback/
          route.js                 # Reads feedback from SQL Database (Aryan + Zaara)
    .env.local                     # Secret keys (never committed)
  database/                        # SQL schema and setup scripts (Zaara)
  docs/                            # Project documents
  README.md
```

---

## Known Limitations

- Very short inputs like "ok" may return inaccurate sentiment results due to lack of context
- Sarcastic text may not always be detected correctly — the AI reads the words literally
- Azure AI Language performs best on formal English; slang or mixed-language input may be less accurate
- The free tier of Azure AI Language has a limit of 5,000 text records per month
- The dashboard displays only the 20 most recent entries and does not paginate
- The Azure SQL Database firewall must be configured to allow the app's IP address

---

## Responsible AI

This project uses AI-generated sentiment analysis. Results are for informational purposes only and should not replace human judgment for important business decisions. Confidence scores are displayed alongside each result so users understand how certain the AI is. No personal data is collected — only the feedback text submitted through the form.

---

## License

This project was built for educational purposes as part of INTP302 at SAIT.
