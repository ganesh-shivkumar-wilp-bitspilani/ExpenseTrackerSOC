const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use("/api/users", require("./routes/userRoute"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});