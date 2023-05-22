// const sub = 24; // sub это сколько месяцев отнять, можно передавать в req.query например
const moment = require("moment");

const ageFunction = (age) => {
  let ageQuery;
  if (age === 12) {
    // типа год и меньше, либа момент для удобства, const moment = require("moment");
    const start = new Date(moment().subtract(age, "month"));
    return (ageQuery = {
      $expr: {
        $gt: [{ $toDate: "$date" }, start], // date больше чем текущее время минус год, то есть пету точно меньше 1
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
            $lt: [{ $toDate: "$date" }, end], // date меньше чем текущее время минус год, то есть пету точно 1
          },
        },
        {
          $expr: {
            $gt: [{ $toDate: "$date" }, start], // date больше чем текущее время минус 2 года, то есть пету точно нет 2
          },
        },
      ],
    });
  } else if (age === 25) {
    // 2+
    const end = new Date(moment().subtract(24, "month"));
    return (ageQuery = {
      $expr: {
        $lt: [{ $toDate: "$date" }, end], // date меньше чем текущее время минус два года, то есть пету точно 2 года
      },
    });
  }
};

module.exports = ageFunction;
