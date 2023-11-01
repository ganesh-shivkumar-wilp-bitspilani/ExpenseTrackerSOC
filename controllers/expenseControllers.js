const asyncHandler = require("express-async-handler");

//@desc Get all the expenses
//@route GET /api/expenses
//@access PUBLIC
const getExpenses = asyncHandler(async (req, res) => {
    res.status(200).json({message : "Getting all the expenses"});
});

//@desc Creating an expenses
//@route POST /api/expenses
//@access PUBLIC
const createExpense = asyncHandler(async (req, res) => {
    const {name, amount, mode, date, description} = req.body;
    if(!name || !amount || !mode || !date) {
        res.status(400);
        throw new Error("Name, Amount, Date and Mode are mandatory for creating an expense");
    }
    res.status(201).json({message : "Creating an expenses"});
});

//@desc Get the expense by id
//@route GET /api/expenses/:id
//@access PUBLIC
const getExpense = asyncHandler(async (req, res) => {
    res.status(200).json({message : `Getting an expenses for ${req.params.id}`});
});

//@desc Update the expense by id
//@route PUT /api/expenses/:id
//@access PUBLIC
const updateExpense = asyncHandler(async (req, res) => {
    res.status(200).json({message : `Updating an expenses for ${req.params.id}`});
});

//@desc Delete the expense by id
//@route DELETE /api/expenses/:id
//@access PUBLIC
const deleteExpense = asyncHandler(async (req, res) => {
    res.status(200).json({message : `Deleting an expenses for ${req.params.id}`});
});

module.exports = {getExpenses, createExpense, getExpense, updateExpense, deleteExpense};