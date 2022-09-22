const Creditor = require("./../models/Creditor");

// @desc    get creditor data
// @route   GET  /API/v1/manage/get-creditor
// @access  protect with token
exports.handleGetCreditor = async (req, res) => {
  try {
    const creditorData = await Creditor.find({ userId: req.userId });
    const requiredData = creditorData.map((creditor) => {
      return {
        id: creditor._id,
        who: creditor.who,
        amount: creditor.amount,
        description: creditor.description,
        loanDate: creditor.loanDate,
        createdAt: creditor.createdAt,
      };
    });
    return res.status(200).json({ data: requiredData });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "There Is A Problem Of Side Server", error: error });
  }
};

// @desc    set creditor data
// @route   POST  /API/v1/manage/set-creditor
// @access  protect with token
exports.handleSetCreditor = async (req, res) => {
  try {
    const { who, amount, loanDate, description } = req.body;
    await Creditor.creditorValidation({ who, amount });

    Creditor.create(
      {
        who,
        amount,
        loanDate,
        description,
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

// @desc    update creditor data
// @route   PUT  /API/v1/manage/update-creditor
// @access  protect with token
exports.handleUpdateCreditor = async (req, res) => {
  try {
    const { who, amount, loanDate, description, _id } = req.body;

    await Creditor.creditorValidation({ who, amount });

    Creditor.updateOne(
      { _id: _id, userId: req.userId },
      { $set: { who, amount, loanDate, description } },
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

// @desc    delete creditor data
// @route   DELETE  /API/v1/manage/delete-creditor
// @access  protect with token
exports.handleDeleteCreditor = async (req, res) => {
  try {
    Creditor.findOneAndDelete(
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
