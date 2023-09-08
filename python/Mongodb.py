import pandas as pd
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()


def monogoDB():
    # List of Excel filenames
    filenames = ['topNews', 'BTC', 'ETH', 'BNB', 'XRP', 'ADA', 'SOL', 'DOT',
                 'Matic', 'USDT', 'USDC', 'DOGE', 'TRX', 'DAI', 'TON', 'SHIB', 'LTC', 'AVAX',
                 'XLM', 'LINK', 'BUSD', 'UNI', 'XMR', 'OKB', 'ATOM', 'ETC', 'HBAR', 'FIL',
                 'MNT', 'APT', 'CRO', 'QNT']

    # Dictionary to map sentiments to their respective scores
    sentiment_to_score = {
        "Positive": 2,
        "Neutral": 1,
        "Negative": 0
    }

    # To store average sentiment scores for each file
    avg_sentiments = {}

    def score_to_sentiment(score):
        if 0 <= score < 0.6:
            return "Very Negative"
        elif 0.6 <= score < 1:
            return "Negative"
        elif 1 <= score < 1.2:
            return "Neutral"
        elif 1.2 <= score < 1.4:
            return "Positive"
        elif 1.4 <= score <= 2:
            return "Very Positive"
        else:
            raise ValueError(f"Score {score} is out of bounds (0-2).")

    for filename in filenames:
        # Load the data from the Excel file
        df = pd.read_excel(filename+".xlsx")

        # Convert sentiment labels to scores
        df['ScoreDesc'] = df['SentimentDesc'].map(sentiment_to_score)
        df['ScoreTitle'] = df['SentimentTitle'].map(sentiment_to_score)

       # Calculate combined average score for each row
        df['CombinedScore'] = (df['ScoreDesc'] + df['ScoreTitle']) / 2

        # Calculate average sentiment score for the entire file
        avg_sentiments[filename] = df['CombinedScore'].mean()

    sentiments = {key: score_to_sentiment(value)
                  for key, value in avg_sentiments.items()}

    print(sentiments)

    # Connect to the MongoDB server (assuming it's running on the default port 27017 on localhost)
    client = MongoClient(os.environ.get("MONGO_URL"), 27017)

    # Choose the database and collection. For this example, I'm using 'cryptoDB' as the database and 'sentiments' as the collection.
    db = client['test']
    collection = db['sentiments']

    # Delete all documents in the collection
    collection.delete_many({})

    # Convert the data into a list of dictionaries for insertion
    data_to_insert = [{'Crypto': key, 'score': avg_sentiments[key],
                       'sentiment': sentiments[key]} for key in avg_sentiments]

    # Insert the data
    collection.insert_many(data_to_insert)

    # Close the connection
    client.close()
    # Delete the Excel files
    for filename in filenames:
        try:
            os.remove(filename + ".xlsx")
        except OSError as e:
            print(f"Error deleting file {filename}.xlsx: {e}")
    print("Opperation done successfully!!")
