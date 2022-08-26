const { handleError } = require("../utils/handleError");
const Income = require("./../models/Income");

// @desc    get income data
// @route   GET  /API/v1/manage/get-income
// @access  protect with token
exports.handleGetIncome = async (req, res, next) => {
  try {
    const incomeData = await Income.find({ userId: req.userId });
    const requiredData =
      incomeData.length > 0 &&
      incomeData.map((i) => {
        return {
          id: i._id,
          origin: i.origin,
          total: i.total,
          dateOfDeposit: i.dateOfDeposit,
          storage: i.storage,
          title: i.title,
          description: i.description,
        };
      });
    return res.status(200).json({ data: requiredData });
  } catch (error) {
    next(error);
  }
};

// @desc    set income data
// @route   POST  /API/v1/manage/set-income
// @access  protect with token
exports.handleSetIncome = async (req, res, next) => {
  try {
    const { origin, total, dateOfDeposit, storage, title, description } =
      req.body;
    await Income.incomeValidation(req.body);

    Income.create(
      {
        origin,
        total,
        dateOfDeposit,
        storage,
        title,
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
    next(error);
  }
};

// @desc    update income data
// @route   PUT  /API/v1/manage/update-income
// @access  protect with token
exports.handleUpdateIncome = async (req, res, next) => {
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

    Income.updateOne(
      { _id: _id, userId: req.userId },
      { $set: { origin, total, dateOfDeposit, storage, title, description } },
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
    next(error);
  }
};

// @desc    delete income data
// @route   DELETE  /API/v1/manage/delete-income
// @access  protect with token
exports.handleDeleteIncome = async (req, res, next) => {
  try {
    Income.findOneAndDelete(
      { _id: req.body.id, userId: req.userId },
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
    next(error);
  }
};
