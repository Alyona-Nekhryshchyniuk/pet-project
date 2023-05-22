const moment = require("moment");

const ageFunction = (age) => {
  let ageQuery;
  if (age === 12) {
    const start = new Date(moment().subtract(age, "month"));
    return (ageQuery = {
      $expr: {
        $gt: [{ $toDate: "$date" }, start],
      },
    });
  } else if (age === 24) {
    // 1 полный год
    const start = new Date(moment().subtract(age, "month"));
    const end = new Date(moment().subtract(12, "month"));
    return (ageQuery = {
      $and: [
        {
          $expr: {
            $lt: [{ $toDate: "$date" }, end],
          },
        },
        {
          $expr: {
            $gt: [{ $toDate: "$date" }, start],
          },
        },
      ],
    });
  } else if (age === 25) {
    // 2+
    const end = new Date(moment().subtract(24, "month"));
    return (ageQuery = {
      $expr: {
        $lt: [{ $toDate: "$date" }, end],
      },
    });
  }
};

module.exports = ageFunction;
