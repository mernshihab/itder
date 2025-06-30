import { apiSlice } from "../api/apiSlice";

export const checkoutApi = apiSlice.injectEndpoints({
  tagTypes: ["checkout"],

  endpoints: (builder) => ({
    addCheckout: builder.mutation({
      query: (formData) => ({
        url: `/api/course-purchase`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["checkout"],
    }),

    searchPurchaseData: builder.query({
      query: (body) => ({
        url: "/api/search-purchase-data",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useAddCheckoutMutation,
  useLazySearchPurchaseDataQuery,
} = checkoutApi;
