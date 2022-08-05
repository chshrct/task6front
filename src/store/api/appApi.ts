import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  getPageRequestType,
  getPageResponseType,
  getPagesRequestType,
  getPagesResponseType,
  LocalizaitonResponseType,
} from './types';

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://itransition-task6-back.herokuapp.com/' }),
  endpoints: builder => ({
    getLocalizations: builder.query<LocalizaitonResponseType, void>({
      query: () => `localization`,
    }),
    getPages: builder.query<getPagesResponseType, getPagesRequestType>({
      query: params => ({
        url: 'getPages',
        params,
      }),
    }),
    getPage: builder.query<getPageResponseType, getPageRequestType>({
      query: params => ({
        url: 'getPage',
        params,
      }),
    }),
    getCSV: builder.query<any, getPagesRequestType>({
      query: params => ({
        url: 'getCSV',
        params,
      }),
    }),
  }),
});

export const {
  useGetLocalizationsQuery,
  useLazyGetPagesQuery,
  useLazyGetPageQuery,
  useLazyGetCSVQuery,
} = appApi;
