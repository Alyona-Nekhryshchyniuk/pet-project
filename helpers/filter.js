const ageFunction = require("./age");

const filter = (query, gender, age) => {
  const ageFilter = ageFunction(Number(age));
  if (query && gender && age) {
    return {
      title: { $regex: query, $options: "i" },
      sex: gender,
      ...ageFilter,
    };
  }
  if (query && !gender && !age) {
    return { title: { $regex: query, $options: "i" } };
  }

  if (!query && gender && !age) {
    return {
      sex: gender,
    };
  }
  if (!query && !gender && age) {
    return {
      ...ageFilter,
    };
  }

  if (query && gender && !age) {
    return {
      title: { $regex: query, $options: "i" },
      sex: gender,
    };
  }
  if (query && !gender && age) {
    return {
      title: { $regex: query, $options: "i" },
      ...ageFilter,
    };
  }
  if (!query && gender && age) {
    return {
      sex: gender,
      ...ageFilter,
    };
  }

  if (!query && !gender && !age) {
    return {};
  }
};

module.exports = filter;
