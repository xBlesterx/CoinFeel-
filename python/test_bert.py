from transformers import BertForSequenceClassification, BertTokenizerFast
import pandas as pd
import torch

# Load the saved model and tokenizer

tokenizer = BertTokenizerFast.from_pretrained(
    "python\sentiment_model4_Tokinizer")
model = BertForSequenceClassification.from_pretrained(
    "python\sentiment_model4")


# Make sure to move the model to 'cuda' if you are using GPU
# Check for GPU availability and move the model to GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)


# assuming you have a dataframe 'df_test' with columns 'text' (the review text) and 'sentiment' (the actual sentiment)


def get_sentiment(text):
    if isinstance(text, str):
        inputs = tokenizer(text, truncation=True,
                           padding=True, return_tensors='pt').to(device)
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
