const rateLimit = require("express-rate-limit");

const reviewLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 1, 
  message: "You have reached the daily limit. Please log in to get more requests.",
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    return req.user && req.user.id;
  },
});

module.exports = {
  reviewLimiter,
};
