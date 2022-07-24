const {
  handleGetExpense,
  handleSetExpense,
  handleUpdateExpense,
  handleDeleteExpense,
} = require("../controllers/expenseController");
const {
  handleGetIncome,
  handleSetIncome,
  handleUpdateIncome,
  handleDeleteIncome,
} = require("../controllers/incomeController");
const {
  handleGetSource,
  handleSetSource,
  handleUpdateSource,
  handleDeleteSource,
} = require("../controllers/sourceController");

const router = require("express").Router();

// income route
router.get("/get-income", handleGetIncome);
router.post("/set-income", handleSetIncome);
router.put("/update-income", handleUpdateIncome);
router.delete("/delete-income", handleDeleteIncome);

// expense route
router.get("/get-expense", handleGetExpense);
router.post("/set-expense", handleSetExpense);
router.put("/update-expense", handleUpdateExpense);
router.delete("/delete-expense", handleDeleteExpense);

// expense route
router.get("/get-source", handleGetSource);
router.post("/set-source", handleSetSource);
router.put("/update-source", handleUpdateSource);
router.delete("/delete-source", handleDeleteSource);

module.exports = router;
