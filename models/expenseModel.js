const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: [true, "Please add the expense name"],
    },
    amount: {
        type: String,
        required: [true, "Please add the expense amount"],
    },
    mode: {
        type: String,
        required: [true, "Please add the mode of payment"],
    },
    date: {
        type: Date,
        required: [true, "Please add the date of the expense"],
    },
    description: {
        type: String
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Expense", expenseSchema);
