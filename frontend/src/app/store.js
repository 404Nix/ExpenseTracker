import { configureStore } from "@reduxjs/toolkit";
import analyticsReducer from "../features/analyticsSlice";
import transactionsReducer from "../features/transactionsSlice";
import categoriesReducer from "../features/categorySlice";
import budgetReducer from "../features/budgetSlice";

export const store = configureStore({
    reducer: {
        analytics: analyticsReducer,
        transactions: transactionsReducer,
        categories: categoriesReducer,
        budget: budgetReducer,
    },
});
