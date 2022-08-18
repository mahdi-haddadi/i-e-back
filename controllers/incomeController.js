const Income = require("./../models/Income");

// @desc    get income data
// @route   GET  /API/v1/manage/get-income
// @access  public
exports.handleGetIncome = async (req, res) => {
  try {
    const incomeData = await Income.find({});
    return res.status(200).json(incomeData);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "There Is A Problem Of Side Server", error: error });
  }
};

// @desc    set income data
// @route   POST  /API/v1/manage/set-income
// @access  public
exports.handleSetIncome = async (req, res) => {
  try {
    const { origin, total, dateOfDeposit, storage, title, description } =
      req.body;
    await Income.incomeValidation(req.body);

    const income = await Income.create({
      origin,
      total,
      dateOfDeposit,
      storage,
      title,
      description,
    });

    if (income) {
      return res.status(201).json({
        success: true,
      });
    } else {
      return res.status(400).json({ msg: "invalid set income" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "There Is A Problem Of Side Server", error: error });
  }
};

// @desc    update income data
// @route   PUT  /API/v1/manage/update-income
// @access  public
exports.handleUpdateIncome = async (req, res) => {
  try {
    const { origin, total, dateOfDeposit, storage, title, description, _id } =
      req.body;

    await Income.incomeValidation({
      origin,
      total,
      dateOfDeposit,
      storage,
      title,
      description,
    });

    const update = await Income.updateOne(
      { _id },
      { origin, total, dateOfDeposit, storage, title, description }
    );
    // or $inc

    if (update) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ msg: "invalid set income" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "There Is A Problem Of Side Server", error: error });
  }
};

// @desc    delete income data
// @route   DELETE  /API/v1/manage/delete-income
// @access  public
exports.handleDeleteIncome = async (req, res) => {
  try {
    await Income.deleteOne({ _id: req.body.id });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "There Is A Problem Of Side Server", error });
  }
};
