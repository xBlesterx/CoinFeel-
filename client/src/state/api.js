import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: "include",
  }),
  reducerPath: "adminApi",
  tagTypes: [
    "Home",
    "Details",
    "Exchanges",
    "News",
    "Search",
    "Login",
    "Signup",
    "Current_User",
    "Logout",
    "Watchlists",
    "CryptoByWatchlist",
    "Update",
    "Sentiment",
    "MarketSentiment",
  ],
  endpoints: (builder) => ({
    getMarketData: builder.query({
      query: () => "general/home",
      providesTags: ["Home"],
    }),
    getCryptoDetails: builder.query({
      query: (id) => `currencies/details/${id}`,
      providesTags: [`Details`], // eslint-disable-line no-unused-vars
    }),
    getExchangeData: builder.query({
      query: () => "currencies/exchanges",
      providesTags: ["Exchanges"],
    }),
    getNewsData: builder.query({
      query: () => "sentiment/news",
      providesTags: ["News"],
    }),
    getSearchData: builder.query({
      query: (query) => `currencies/search/${query}`,
      providesTags: ["Search"],
    }),
    postloginUser: builder.mutation({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: credentials,
      }),
      providesTags: ["Login"],
    }),
    postSignupUser: builder.mutation({
      query: (userDetails) => ({
        url: "users/signup",
        method: "POST",
        body: userDetails,
      }),
      providesTags: ["Signup"],
    }),
    getCurrentUser: builder.query({
      query: () => "users/current_user",
      providesTags: ["Current_User"],
    }),
    postLogout: builder.query({
      query: () => "users/logout",
      providesTags: ["Logout"],
    }),
    postWatchList: builder.mutation({
      query: (crpytoWatch) => ({
        url: "currencies/watchlist",
        method: "POST",
        body: crpytoWatch,
      }),
    }),
    getWatchList: builder.query({
      query: () => `currencies/getwatchlist`,
      providesTags: ["Watchlists"],
    }),
    getCryptoByWatchlist: builder.query({
      query: () => "currencies/cryptobywatchlist",
      providesTags: ["CryptoByWatchlist"],
    }),
    putUpdateUser: builder.mutation({
      query: (userDetails) => ({
        url: "users/update",
        method: "PUT",
        body: userDetails,
      }),
      providesTags: ["Update"],
    }),
    getSentiment: builder.query({
      query: () => "general/sentiment",
      providesTags: ["Sentiment"],
    }),
    getMarketSentiment: builder.query({
      query: () => "sentiment/marketsentiment",
      providesTags: ["MarketSentiment"],
    }),
  }),
});

export const {
  useGetMarketDataQuery,
  useGetCryptoDetailsQuery,
  useGetExchangeDataQuery,
  useGetNewsDataQuery,
  useGetSearchDataQuery,
  usePostloginUserMutation,
  usePostSignupUserMutation,
  useGetCurrentUserQuery,
  usePostLogoutQuery,
  usePostWatchListMutation,
  useGetWatchListQuery,
  useGetCryptoByWatchlistQuery,
  usePutUpdateUserMutation,
  useGetSentimentQuery,
  useGetMarketSentimentQuery,
} = api;
