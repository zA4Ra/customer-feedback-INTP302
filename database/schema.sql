CREATE TABLE Feedback (

    FeedbackID INT IDENTITY(1,1) PRIMARY KEY,

    CommentText NVARCHAR(MAX),

    Sentiment VARCHAR(20),

    PositiveScore FLOAT,

    NeutralScore FLOAT,

    NegativeScore FLOAT,

    KeyPhrases NVARCHAR(MAX),

    SubmittedAt DATETIME DEFAULT GETDATE()

);