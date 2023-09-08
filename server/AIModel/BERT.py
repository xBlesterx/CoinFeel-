from transformers import BertForSequenceClassification, BertTokenizerFast
import torch
import sys
import json

# Load the saved model and tokenizer
MODEL_PATH = r"C:\Users\user\Desktop\APU\APU_Levet3\semester 2\FYP\FYP_CODE\server\AIModel\sentiment_model2"


tokenizer = BertTokenizerFast.from_pretrained(
    MODEL_PATH)
model = BertForSequenceClassification.from_pretrained(
    MODEL_PATH)


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


if __name__ == "__main__":
    titles = json.loads(sys.argv[1])
    sentiments = [get_sentiment(title) for title in titles]
    print(json.dumps(sentiments))
