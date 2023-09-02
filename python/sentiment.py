from transformers import BertForSequenceClassification, BertTokenizerFast
import pandas as pd

# Load the saved model and tokenizer
tokenizer = BertTokenizerFast.from_pretrained(
    "python\sentiment_model2")
model = BertForSequenceClassification.from_pretrained(
    "python\sentiment_model2")

# Make sure to move the model to 'cuda' if you are using GPU
model.to('cuda')


# assuming you have a dataframe 'df_test' with columns 'text' (the review text) and 'sentiment' (the actual sentiment)


def get_sentiment(text):
    if isinstance(text, str):
        inputs = tokenizer(text, truncation=True,
                           padding=True, return_tensors='pt')
        inputs.to('cuda')
        outputs = model(**inputs)
        predicted_class_idx = outputs.logits.argmax(-1).item()

        # convert index to sentiment
        # adjust this according to your label mapping
        if predicted_class_idx == 0:
            return 'Negative'
        elif predicted_class_idx == 1:
            return 'Neutral'
        else:
            return 'Positive'

# apply the model to the test data


def Sentiment():
    # List of filenames
    filenames = ['topNews', 'BTC', 'ETH', 'BNB', 'XRP', 'ADA', 'SOL', 'DOT',
                 'Matic', 'USDT', 'USDC', 'DOGE', 'TRX', 'DAI', 'TON', 'SHIB', 'LTC', 'AVAX',
                 'XLM', 'LINK', 'BUSD', 'UNI', 'XMR', 'OKB', 'ATOM', 'ETC', 'HBAR', 'FIL',
                 'MNT', 'APT', 'CRO', 'QNT']

    # Loop through each filename
    for filename in filenames:
        # Read the Excel file into a DataFrame
        df = pd.read_excel(filename+".xlsx")

        # Apply the get_sentiment function to the 'Description' column and create a new 'Sentiment' column
        df['SentimentDesc'] = df['Description'].apply(get_sentiment)
        df['SentimentTitle'] = df['Title'].apply(get_sentiment)

        # Save the updated DataFrame back to the same Excel file
        df.to_excel(filename+".xlsx", index=False)

    print("Sentiment analysis completed for all files.")
