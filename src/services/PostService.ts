import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPost } from "../models/IPost";

export const postAPI = createApi({
  reducerPath: "postAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  tagTypes: ["post"],
  endpoints: (build) => ({
    fetchAllPosts: build.query<IPost[], number>({
      query: (limit) => ({
        url: "posts",
        params: {
          _limit: limit,
        },
      }),
      providesTags: ["post"],
    }),
    createPost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: "posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["post"],
    }),
    updatePost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: `posts/${post.id}`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["post"],
    }),
    deletePost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: `posts/${post.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["post"],
    }),
  }),
});
