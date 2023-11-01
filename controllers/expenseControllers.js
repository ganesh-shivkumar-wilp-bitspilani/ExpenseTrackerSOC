//@desc Get all the expenses
//@route GET /api/expenses
//@access PUBLIC

const getExpenses = (req, res) => {
    res.status(200).json({message : "Getting all the expenses"});
}

//@desc Creating an expenses
//@route POST /api/expenses
//@access PUBLIC

const createExpense = (req, res) => {
    res.status(201).json({message : "Creating an expenses"});
}

//@desc Get the expense by id
//@route GET /api/expenses/:id
//@access PUBLIC
const getExpense = (req, res) => {
    res.status(200).json({message : `Getting an expenses for ${req.params.id}`});
};

//@desc Update the expense by id
//@route PUT /api/expenses/:id
//@access PUBLIC
const updateExpense = (req, res) => {
    res.status(200).json({message : `Updating an expenses for ${req.params.id}`});
};

//@desc Delete the expense by id
//@route DELETE /api/expenses/:id
//@access PUBLIC
const deleteExpense = (req, res) => {
    res.status(200).json({message : `Deleting an expenses for ${req.params.id}`});
};


module.exports = {getExpenses, createExpense, getExpense, updateExpense, deleteExpense};