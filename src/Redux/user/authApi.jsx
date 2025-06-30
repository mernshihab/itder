import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./userSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginInfo) => ({
        url: "/api/login",
        method: "POST",
        body: loginInfo,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          if (data?.access_token && data?.userData) {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                token: data.access_token,
                user: data.userData,
              })
            );

            dispatch(
              userLoggedIn({
                token: data.access_token,
                user: data.userData,
              })
            );
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
