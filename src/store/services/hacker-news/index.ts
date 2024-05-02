import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TComment, TStory } from '../../../utils/types';

// Определите базовый URL вашего Hacker News API.
const baseUrl = 'https://hacker-news.firebaseio.com/v0';

export const hackerNewsApi = createApi({
  reducerPath: 'hackerNewsApi',

  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    // Метод для получения истории по ID
    getStoryById: builder.query<TStory | null, number>({
      query: (id) => `/item/${id}.json`,
    }),
    // Метод для получения комментария по ID
    getCommentById: builder.query<TComment | null, number>({
      query: (id) => `/item/${id}.json`,
    }),
    // Метод для получения последних историй
    getLatestStories: builder.query<number[] | null, void>({
      query: () => '/newstories.json',
      transformResponse: (response: number[]) => {
        return response.slice(0, 100);
      },
    }),
  }),
  refetchOnReconnect: true,
  refetchOnFocus: true,
});

export const {
  useGetStoryByIdQuery,
  useGetCommentByIdQuery,
  useGetLatestStoriesQuery,
} = hackerNewsApi;
