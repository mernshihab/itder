import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  tagTypes: ["course"],

  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => ({
        url: "/api/get-course-list",
      }),
      providesTags: ["course"],
    }),
  }),
});

export const {
  useGetCoursesQuery,
} = courseApi;
