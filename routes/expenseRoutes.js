const express = require("express");
const router = express.Router();
const {getExpense, getExpenses, createExpense, updateExpense, deleteExpense} = require("../controllers/expenseControllers")

router.route('/').get(getExpenses).post(createExpense);
router.route('/:id').get(getExpense).put(updateExpense).delete(deleteExpense);

module.exports = router;