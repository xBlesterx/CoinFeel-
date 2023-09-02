import requests
import pandas as pd
from newsapi import NewsApiClient
from datetime import datetime, timedelta


# I


def cryptocompare():
    url = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    return df


def newsapi():
    newsapi = NewsApiClient(api_key='a1ba957a74c647a48f43d666485307c1')
    try:
        all_articles = newsapi.get_top_headlines(
            language='en', category='business')
        title = [item['title'] for item in all_articles['articles']]
        descriptions = [item['description']
                        for item in all_articles['articles']]

        # Convert to a pandas DataFrame
        df = pd.DataFrame({
            "Title": title,
            'Description': descriptions
        })
        return df
    except Exception as e:
        print(f"Error fetching data from NewsAPI: {e}")
        return pd.DataFrame()


def topNews():
    # Get data from both APIs
    df1 = newsapi()
    df2 = cryptocompare()

    # Concatenate the dataframes
    combined_df = pd.concat([df1, df2], ignore_index=True)

    # Save the combined DataFrame to an Excel file
    combined_df.to_excel("topNews.xlsx", index=False)

# ***********************************************************************************


def topBTC():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=BTC&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("BTC.xlsx", index=False)


# ***************************************************************************************************************************


def topETH():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=ETH&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("ETH.xlsx", index=False)
# ***************************************************************************************************************************


def topBNB():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=BNB&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("BNB.xlsx", index=False)
# ***************************************************************************************************************************


def topXRP():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=XRP&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("XRP.xlsx", index=False)
# ***************************************************************************************************************************


def topADA():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=ADA&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("ADA.xlsx", index=False)
# ***************************************************************************************************************************


def topSOL():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=SOL&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("SOL.xlsx", index=False)

# ***************************************************************************************************************************


def topDOT():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=DOT&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("DOT.xlsx", index=False)

# ***************************************************************************************************************************


def topMatic():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=MATIC&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("Matic.xlsx", index=False)
# ***************************************************************************************************************************


def topUSDT():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=USDT&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("USDT.xlsx", index=False)
# ***************************************************************************************************************************


def topUSDC():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=USDC&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("USDC.xlsx", index=False)
# ***************************************************************************************************************************


def topDOGE():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=DOGE&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("DOGE.xlsx", index=False)
# ***************************************************************************************************************************


def topTRX():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=TRX&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("TRX.xlsx", index=False)
# ***************************************************************************************************************************


def topDAI():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=DAI&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("DAI.xlsx", index=False)
# ***************************************************************************************************************************


def topTON():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=TON&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("TON.xlsx", index=False)
# ***************************************************************************************************************************


def topSHIB():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=SHIB&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("SHIB.xlsx", index=False)
# ***************************************************************************************************************************


def topLTC():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=LTC&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("LTC.xlsx", index=False)
# ***************************************************************************************************************************


def topAVAX():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=AVAX&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("AVAX.xlsx", index=False)
# ***************************************************************************************************************************


def topXLM():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=XLM&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("XLM.xlsx", index=False)
# ***************************************************************************************************************************


def topLINK():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=LINK&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("LINK.xlsx", index=False)
# ***************************************************************************************************************************


def topBUSD():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=BUSD&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("BUSD.xlsx", index=False)
# ***************************************************************************************************************************


def topUNI():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=UNI&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("UNI.xlsx", index=False)
# ***************************************************************************************************************************


def topXMR():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=XMR&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("XMR.xlsx", index=False)
# ***************************************************************************************************************************


def topOKB():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=OKB&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("OKB.xlsx", index=False)
# ***************************************************************************************************************************


def topATOM():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=ATOM&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("ATOM.xlsx", index=False)
# ***************************************************************************************************************************


def topETC():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=ETC&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("ETC.xlsx", index=False)
# ***************************************************************************************************************************


def topHBAR():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=HBAR&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("HBAR.xlsx", index=False)
# ***************************************************************************************************************************


def topFIL():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=FIL&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("FIL.xlsx", index=False)
# ***************************************************************************************************************************


def topMNT():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=MNT&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("MNT.xlsx", index=False)
# ***************************************************************************************************************************


def topAPT():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=APT&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("APT.xlsx", index=False)
# ***************************************************************************************************************************


def topCRO():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=CRO&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("CRO.xlsx", index=False)
# ***************************************************************************************************************************


def topQNT():
    # /v2/top-headlines
    url = "https://min-api.cryptocompare.com/data/v2/news/?categories=QNT&lang=EN&api_key=c242651eeb0d6e0a0e1d1ecc8171128973c46726cbfbc8c3616058539cf806de"
    response = requests.get(url)
    data = response.json()
    # Extract the relevant data
    title = [item['title'] for item in data['Data']]
    descriptions = [item['body'] for item in data['Data']]

    # Convert to a pandas DataFrame
    df = pd.DataFrame({
        "Title": title,
        'Description': descriptions
    })

    # Save the DataFrame to an Excel file
    df.to_excel("QNT.xlsx", index=False)
