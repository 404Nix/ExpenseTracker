import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "userId name is required"],
            index: true,
        },
        amount: { type: Number, required: true, min: 0 },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "CategoryId name is required"],
            index: true,
        },
        date: { type: Date, required: [true, "date is required"], index: true },
        note: { type: String, trim: true, default: "" },
    },
    { timestamps: true },
);

transactionSchema.index({ userId: 1, date: -1 });

export const Transaction = mongoose.model("Transaction", transactionSchema);
