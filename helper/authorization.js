const User = require("../database/model/users.js");

const isAdmin = async (userId) => {
  const user = await User.findById(userId);
  if (user.admin) {
    return user.admin;
  }
  return false;
};

module.exports.authorizer =
  ({ type }) =>
  async (req, res, next) => {
    const fieldId = req.params.id;
    if (await isAdmin(res.locals.userId)) {
      next();
      return;
    }

    if (type.toLowerCase() == "user" && res.locals.userId == fieldId) {
      next();
      return;
    }
  };