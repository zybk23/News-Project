module.exports = {
  rules: {
    "testing-library/no-debugging-utils": [
      "error",
      {
        utilsToCheckFor: {
          debug: false,
          logRoles: true,
          logDOM: true,
        },
      },
    ],
  },
};
