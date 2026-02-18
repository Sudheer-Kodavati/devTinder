const isAdminAuth = (req, res, next) => {
  const token = "xyz";
  const isAdminAuthorised = token === "xyz";
  if (!isAdminAuthorised) {
    res.status(401).send("unAuthorised access!");
  } else {
    next();
  }
};

const isUserAuth = (req, res, next) => {
  const token = "xyz";
  const isAdminAuthorised = token === "xyz";
  if (!isAdminAuthorised) {
    res.status(401).send("unAuthorised access!");
  } else {
    next();
  }
};

module.exports = { isAdminAuth, isUserAuth };
