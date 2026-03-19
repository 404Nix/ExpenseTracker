import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId.Types,
            ref: "User",
            reqired: [true, "userId is required"],
            index: true,
        },
        name: {
            type: String,
            required: [true, "Category name is required"],
            trim: true,
        },
    },
    { timestamps: true },
);

categorySchema.index({ userId: 1, name: 1 }, { unique: true });

export const Category = mongoose.model("Category", categorySchema);
