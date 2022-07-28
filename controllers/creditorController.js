const Creditor = require("./../models/Creditor");

// @desc    get creditor data
// @route   GET  /API/v1/manage/get-creditor
// @access  public
exports.handleGetCreditor = async (req, res) => {
  try {
    const creditorData = await Creditor.find({});
    return res.status(200).json({ data: creditorData });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "There Is A Problem Of Side Server", error: error });
  }
};

// @desc    set creditor data
// @route   POST  /API/v1/manage/set-creditor
// @access  public
exports.handleSetCreditor = async (req, res) => {
  try {
    const { who, amount, loanDate, description } = req.body;
    await Creditor.creditorValidation({ who, amount });

    const expense = await Creditor.create({
      who,
      amount,
      loanDate,
      description,
    });

    if (expense) {
      return res.status(201).json({
        success: true,
      });
    } else {
      return res.status(400).json({ msg: "invalid set creditor" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "There Is A Problem Of Side Server", error: error });
  }
};

// @desc    update creditor data
// @route   PUT  /API/v1/manage/update-creditor
// @access  public
exports.handleUpdateCreditor = async (req, res) => {
  try {
    const { who, amount, loanDate, description, _id } = req.body;

    await Creditor.creditorValidation({ who, amount });

    const update = await Creditor.updateOne(
      { _id },
      { who, amount, loanDate, description }
    );
    // or $inc

    if (update) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ msg: "invalid set creditor" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "There Is A Problem Of Side Server", error: error });
  }
};

// @desc    delete creditor data
// @route   DELETE  /API/v1/manage/delete-creditor
// @access  public
exports.handleDeleteCreditor = async (req, res) => {
  try {
    await Creditor.deleteOne({ _id: req.body._id });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "There Is A Problem Of Side Server", error });
  }
};
