const rateLimit = require("express-rate-limit");

module.exports = function (req, res, next) {
  console.log("here")
  rateLimit({
    windowMs: 1 * 60 * 1000, // 12 hour duration in milliseconds
    max: 5,
    message: "You exceeded 5 requests in 1 min limit!",
    headers: true,
  })
  next()
}