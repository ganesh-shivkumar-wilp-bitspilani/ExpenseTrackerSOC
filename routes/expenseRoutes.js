const express = require("express");
const router = express.Router();

router.route('/').get((req, res) => {
    res.status(200).json({message : "Getting all the expenses"});
});

router.route('/').post((req, res) => {
    res.status(200).json({message : "Creating an expenses"});
});

router.route('/:id').get((req, res) => {
    res.status(200).json({message : `Getting an expenses for ${req.params.id}`});
});

router.route('/:id').put((req, res) => {
    res.status(200).json({message : `Updating an expenses for ${req.params.id}`});
});

router.route('/:id').delete((req, res) => {
    res.status(200).json({message : `Deleting an expenses for ${req.params.id}`});
});
module.exports = router;