import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTransactions = createAsyncThunk(
    "transactions/fetch",
    async () => {
        const res = await fetch("http://localhost:8000/api/transactions", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const data = await res.json();
        return data.transactions;
    },
);

export const addTransaction = createAsyncThunk(
    "transactions/add",
    async (body) => {
        const res = await fetch("http://localhost:8000/api/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        return data.transaction;
    },
);

export const deleteTransaction = createAsyncThunk(
    "transactions/delete",
    async (id) => {
        await fetch(`http://localhost:8000/api/transactions/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        return id;
    },
);

const transactionsSlice = createSlice({
    name: "transactions",
    initialState: {
        items: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload || [];
            })

            .addCase(addTransaction.fulfilled, (state, action) => {
                state.items.unshift(action.payload); // 🔥 add at top
            })

            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (t) => t.id !== action.payload,
                );
            });
    },
});

export default transactionsSlice.reducer;
