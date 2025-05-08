import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

   const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY;

   if (!rapidApiKey) {
       console.error('VITE_RAPID_API_KEY is not set in environment variables');
   }

   export const articleApi = createApi({
       reducerPath: 'articleApi',
       baseQuery: fetchBaseQuery({
           baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
           prepareHeaders: (headers) => {
               if (!rapidApiKey) {
                   throw new Error('RapidAPI key is missing'); 
               }
               headers.set('x-rapidapi-key', rapidApiKey);
               headers.set('x-rapidapi-host', 'article-extractor-and-summarizer.p.rapidapi.com');
               return headers;
           },
       }),
       endpoints: (builder) => ({
           getSummary: builder.query({
               query: (params) => {
                   if (!params?.articleUrl) {
                       throw new Error('articleUrl is required');
                   }
                   return `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`;
               },
           }),
       }),
   });

   export const { useLazyGetSummaryQuery } = articleApi;