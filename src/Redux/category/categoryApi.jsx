import { apiSlice } from "../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  tagTypes: ["category"],

  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/api/category",
      }),
      providesTags: ["category"],
    }),

    getCategory: builder.query({
      query: (id) => ({
        url: `/api/category/${id}`,
      }),
    }),

    addCategory: builder.mutation({
      query: (formData) => ({
        url: `/api/category/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["category"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/category/update/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/api/category/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
