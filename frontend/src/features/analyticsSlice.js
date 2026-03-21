import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAnalytics = createAsyncThunk(
    "analytics/fetchAnalytics",
    async (month) => {
        const res = await fetch(
            `http://localhost:8000/api/analytics?month=${month}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            },
        );

        const data = await res.json();
        return data;
    },
);

const initialState = {
    budget: 0,
    spent: 0,
    remaining: 0,
    percent: 0,
    byCategory: [],
    daily: [],
    loading: false,
  }

export const analyticsSlice = createSlice({
    name: "analytics",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;

        state.budget = action.payload.budget;
        state.spent = action.payload.spent;
        state.remaining = action.payload.remaining;
        state.percent = action.payload.percent;
        state.byCategory = action.payload.byCategory;
        state.daily = action.payload.daily;
      })
      .addCase(fetchAnalytics.rejected, (state) => {
        state.loading = false;
      });
  },
})

export default analyticsSlice.reducer;