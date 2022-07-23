const {
  handleGetIncome,
  handleSetIncome,
  handleUpdateIncome,
  handleDeleteIncome,
} = require("../controllers/incomeController");

const router = require("express").Router();

// income route
router.get("/get-income", handleGetIncome);
router.post("/set-income", handleSetIncome);
router.put("/update-income", handleUpdateIncome);
router.delete("/delete-income", handleDeleteIncome);

module.exports = router;
