import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
    "categories/fetch",
    async () => {
        const res = await fetch(`${import.meta.env.VITE_ENDPOINT}/api/categories`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const data = await res.json();
        return data.categories;
    },
);

export const addCategory = createAsyncThunk("categories/add", async (name) => {
    const res = await fetch(`${import.meta.env.VITE_ENDPOINT}/api/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name }),
    });

    const data = await res.json();
    return data.category;
});

export const deleteCategory = createAsyncThunk(
    "categories/delete",
    async (id) => {
        await fetch(`http://localhost:8000/api/categories/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        return id;
    },
);

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        items: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload || [];
            })

            .addCase(addCategory.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })

            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (c) => c.id !== action.payload,
                );
            });
    },
});

export default categoriesSlice.reducer;
