const express = require("express");
const {getExpense, getExpenses, createExpense, updateExpense, deleteExpense} = require("../controllers/expenseControllers")

const router = express.Router();
router.route('/').get(getExpenses).post(createExpense);
router.route('/:id').get(getExpense).put(updateExpense).delete(deleteExpense);

module.exports = router;