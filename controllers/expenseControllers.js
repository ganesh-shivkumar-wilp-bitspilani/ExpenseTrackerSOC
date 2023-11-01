const asyncHandler = require("express-async-handler");
const Expense = require("../models/expenseModel");
const {constants} = require("../constants")

//@desc Get all the expenses
//@route GET /api/expenses
//@access PRIVATE
const getExpenses = asyncHandler(async (req, res) => {
    const expenses = await Expense.find({user_id: req.user.id});
    res.status(constants.SUCCESS).json(expenses);
});

//@desc Creating an expenses
//@route POST /api/expenses
//@access PRIVATE
const createExpense = asyncHandler(async (req, res) => {
    const {name, amount, mode, date, description} = req.body;
    if(!name || !amount || !mode || !date) {
        res.status(constants.BAD_REQUEST);
        throw new Error("Name, Amount, Date and Mode are mandatory for creating an expense");
    }
    const expense = await Expense.create({
        name, amount, mode, date, description, user_id: req.user.id
    })
    res.status(constants.CREATED).json(expense);
});

//@desc Get the expense by id
//@route GET /api/expenses/:id
//@access PRIVATE
const getExpense = asyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id);
    if(!expense){
        res.status(constants.NOT_FOUND);
        throw new Error("Expense not found");
    }
    res.status(constants.SUCCESS).json(expense);
});

//@desc Update the expense by id
//@route PUT /api/expenses/:id
//@access PRIVATE
const updateExpense = asyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id);
    if(!expense){
        res.status(constants.NOT_FOUND);
        throw new Error("Expense not found");
    }

    if(expense.user_id.toString() !== req.user.id) {
        res.status(constants.FORBIDDEN);
        throw new Error("User is forbidden to update this resource");
    }

    const updatedContact = await Expense.findByIdAndUpdate(req.params.id, req.body, {new : true});
    res.status(constants.SUCCESS).json(updatedContact);
});

//@desc Delete the expense by id
//@route DELETE /api/expenses/:id
//@access PRIVATE
const deleteExpense = asyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id);
    if(!expense){
        res.status(constants.NOT_FOUND);
        throw new Error("Expense not found");
    }

    if(expense.user_id.toString() !== req.user.id) {
        res.status(constants.FORBIDDEN);
        throw new Error("User is forbidden to delete this resource");
    }

    await Expense.deleteMany();
    res.status(constants.SUCCESS).json(expense);
});

module.exports = {getExpenses, createExpense, getExpense, updateExpense, deleteExpense};