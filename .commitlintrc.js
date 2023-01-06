const chalk = require("chalk");

console.log(
  `${chalk.bgBlueBright.black(" INFO ")} ${chalk.blueBright(
    `loading: ${__filename.slice(__dirname.length + 1)}`
  )}`
);

module.exports = {
  extends: ["@commitlint/config-conventional"],
};
