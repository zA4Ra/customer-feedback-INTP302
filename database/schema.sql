CREATE TABLE Feedback (

    FeedbackID INT IDENTITY(1,1) PRIMARY KEY,

    CommentText NVARCHAR(MAX),

    Sentiment VARCHAR(20),

    PositiveScore FLOAT,

    NeutralScore FLOAT,

    NegativeScore FLOAT,

    KeyPhrases NVARCHAR(MAX),

    SubmittedAt DATETIME DEFAULT GETDATE()

<<<<<<< HEAD
);
SELECT Sentiment, COUNT(*) 
FROM Feedback
GROUP BY Sentiment;
=======
);
>>>>>>> 55dfb2fc25e994400d9b440b9d5cbb46f7fa5704
