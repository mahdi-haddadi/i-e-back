const Expense = require("./../models/Expense");

// @desc    get expense data
// @route   GET  /API/v1/manage/get-expense
// @access  public
exports.handleGetExpense = async (req, res) => {
  try {
    const expenseData = await Expense.find({});
    return res.status(200).json(expenseData);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "There Is A Problem Of Side Server", error: error });
  }
};

// @desc    set expense data
// @route   POST  /API/v1/manage/set-expense
// @access  public
exports.handleSetExpense = async (req, res) => {
  try {
    const { title, description, source, cost, expenditureDate } = req.body;
    await Expense.expenseValidation(req.body);

    const expense = await Expense.create({
      title,
      description,
      source,
      cost,
      expenditureDate,
    });

    if (expense) {
      return res.status(201).json({
        success: true,
      });
    } else {
      return res.status(400).json({ msg: "invalid set expense" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "There Is A Problem Of Side Server", error: error });
  }
};

// @desc    update expense data
// @route   PUT  /API/v1/manage/update-expense
// @access  public
exports.handleUpdateExpense = async (req, res) => {
  try {
    const { title, description, source, cost, expenditureDate, _id } = req.body;

    await Expense.expenseValidation({
      title,
      description,
      source,
      cost,
      expenditureDate,
    });

    const update = await Expense.updateOne(
      { _id },
      { title, description, source, cost, expenditureDate }
    );
    // or $inc

    if (update) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ msg: "invalid set expense" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "There Is A Problem Of Side Server", error: error });
  }
};

// @desc    delete expense data
// @route   DELETE  /API/v1/manage/delete-expense
// @access  public
exports.handleDeleteExpense = async (req, res) => {
  try {
    await Expense.deleteOne({ _id: req.body._id });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "There Is A Problem Of Side Server", error });
  }
};
