const {
  handleGetCreditor,
  handleSetCreditor,
  handleUpdateCreditor,
  handleDeleteCreditor,
} = require("../controllers/creditorController");
const {
  handleGetDebtor,
  handleSetDebtor,
  handleUpdateDebtor,
  handleDeleteDebtor,
} = require("../controllers/debtorController");
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
const { accessToken } = require("../middlewares/auth");

const router = require("express").Router();

// income route
router.get("/get-income", accessToken, handleGetIncome);
router.post("/set-income", accessToken, handleSetIncome);
router.put("/update-income", accessToken, handleUpdateIncome);
router.delete("/delete-income", accessToken, handleDeleteIncome);

// expense route
router.get("/get-expense", accessToken, handleGetExpense);
router.post("/set-expense", accessToken, handleSetExpense);
router.put("/update-expense", accessToken, handleUpdateExpense);
router.delete("/delete-expense", accessToken, handleDeleteExpense);

// expense route
router.get("/get-source", accessToken, handleGetSource);
router.post("/set-source", accessToken, handleSetSource);
router.put("/update-source", accessToken, handleUpdateSource);
router.delete("/delete-source", accessToken, handleDeleteSource);

// debtor route
router.get("/get-debtor", accessToken, handleGetDebtor);
router.post("/set-debtor", accessToken, handleSetDebtor);
router.put("/update-debtor", accessToken, handleUpdateDebtor);
router.delete("/delete-debtor", accessToken, handleDeleteDebtor);

// creditor route
router.get("/get-creditor", accessToken, handleGetCreditor);
router.post("/set-creditor", accessToken, handleSetCreditor);
router.put("/update-creditor", accessToken, handleUpdateCreditor);
router.delete("/delete-creditor", accessToken, handleDeleteCreditor);

module.exports = router;
