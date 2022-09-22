const Expense = require("./../models/Expense");

// @desc    get expense data
// @route   GET  /API/v1/manage/get-expense
// @access  protect with token
exports.handleGetExpense = async (req, res) => {
  try {
    const expenseData = await Expense.find({ userId: req.userId });
    const requiredData =
      expenseData.length > 0 &&
      expenseData.map((expense) => {
        return {
          id: expense._id,
          title: expense.title,
          description: expense.description,
          source: expense.source,
          cost: expense.cost,
          source: expense.source,
          expenditureDate: expense.expenditureDate,
          createdAt: expense.createdAt,
        };
      });
    return res.status(200).json({ data: requiredData });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "There Is A Problem Of Side Server", error: error });
  }
};

// @desc    set expense data
// @route   POST  /API/v1/manage/set-expense
// @access  protect with token
exports.handleSetExpense = async (req, res) => {
  try {
    await Expense.expenseValidation(req.body);

    Expense.create(
      {
        ...req.body,
        userId: req.userId,
      },
      (err, _) => {
        if (err) {
          return res
            .status(400)
            .json({ msg: "error in request", success: false, error: err });
        }
        return res.status(201).json({
          success: true,
        });
      }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "There Is A Problem Of Side Server", error: error });
  }
};

// @desc    update expense data
// @route   PUT  /API/v1/manage/update-expense
// @access  protect with token
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

    Expense.updateOne(
      { _id, userId: req.userId },
      { $set: { title, description, source, cost, expenditureDate } },
      null,
      (err, docs) => {
        if (err) {
          return res.status(400, {
            msg: "error in request",
            success: false,
            error: err,
          });
        }
        return res.status(200).json({ success: true });
      }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "There Is A Problem Of Side Server", error: error });
  }
};

// @desc    delete expense data
// @route   DELETE  /API/v1/manage/delete-expense
// @access  protect with token
exports.handleDeleteExpense = async (req, res) => {
  try {
    Expense.findOneAndDelete(
      { _id: req.body._id, userId: req.userId },
      null,
      (err) => {
        if (err) {
          return res
            .status(400)
            .json({ msg: "error in request", success: false, error: err });
        }
        return res.status(200).json({ success: true });
      }
    );
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "There Is A Problem Of Side Server", error });
  }
};
