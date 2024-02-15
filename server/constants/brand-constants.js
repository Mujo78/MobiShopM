const POST_BRAND_NAME = "Name is required!";
const BRAND_ALREADY_EXISTS = (name) =>
  `Brand with name: ${name} already exists!`;

module.exports = {
  POST_BRAND_NAME,
  BRAND_ALREADY_EXISTS,
};
