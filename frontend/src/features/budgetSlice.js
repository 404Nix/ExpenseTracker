import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔥 UPDATE / INSERT BUDGET
export const updateBudget = createAsyncThunk(
    "budget/update",
    async ({ month, amount }) => {
        const res = await fetch("http://localhost:8000/api/budgets", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ month, amount }),
        });

        const data = await res.json();
        return data.budget;
    },
);

const budgetSlice = createSlice({
    name: "budget",
    initialState: {
        current: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateBudget.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateBudget.fulfilled, (state, action) => {
                state.loading = false;
                state.current = action.payload;
            });
    },
});

export default budgetSlice.reducer;
