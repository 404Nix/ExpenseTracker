import mongoose from "mongoose";

const budgetSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId.Types,
        ref: "User",
        index: true,
        required: [true, "UserId is required"],
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
    },
    month: {
        type: String,
        required: [true, "Month is required"],
        min: 0
    }
    
}, { timestamps: true });

budgetSchema.index({userId: 1, month: -1}, { unique: true });

export const Budget = mongoose.model("Budget", budgetSchema);
