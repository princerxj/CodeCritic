const rateLimit = require("express-rate-limit");
const User = require("../models/User");

const guestCredits = new Map();
const creditChecker = async (req, res, next) => {
  try {
    const maxCredits = parseInt(process.env.MAX_CREDITS) || 5;
    if (req.user && req.user.id) {
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return res.status(401).json({
          statusCode: 401,
          message: "User not found. Please log in again.",
        });
      }
      if (user.credits === null || user.credits === undefined) {
        user.credits = maxCredits;
        user.creditsResetAt = new Date();
        await user.save();
      }

      const now = new Date();
      const timeSinceReset = now - new Date(user.creditsResetAt || now);
      const twentyFourHours = 24 * 60 * 60 * 1000;
      if (timeSinceReset >= twentyFourHours) {
        user.credits = maxCredits;
        user.creditsResetAt = now;
        await user.save();
      }

      if (user.credits <= 0) {
        const timeUntilReset = twentyFourHours - timeSinceReset;
        const hoursUntilReset = Math.ceil(timeUntilReset / (60 * 60 * 1000));
        
        return res.status(429).json({
          statusCode: 429,
          message: `You have used all ${maxCredits} credits for today. Your credits will reset in ${hoursUntilReset} hour(s).`,
          credits: 0,
          maxCredits,
          retryAfter: `${hoursUntilReset} hour(s)`,
        });
      }
      user.credits -= 1;
      await user.save();
      req.remainingCredits = user.credits;
      
      return next();
    }

    const clientIP = req.ip || req.connection.remoteAddress;
    const guestKey = `guest-${clientIP}`;
    
    const guestData = guestCredits.get(guestKey);
    const now = Date.now();

    if (!guestData) {
      guestCredits.set(guestKey, {
        credits: 0,
        resetTime: now + 24 * 60 * 60 * 1000,
      });
      
      req.remainingCredits = 0;
      
      return next();
    }

    if (now >= guestData.resetTime) {
      guestCredits.set(guestKey, {
        credits: 0,
        resetTime: now + 24 * 60 * 60 * 1000,
      });
      
      req.remainingCredits = 0;
      
      return next();
    }
    const timeUntilReset = Math.ceil((guestData.resetTime - now) / 1000 / 60); 
    
    return res.status(429).json({
      statusCode: 429,
      message: `You have used your 1 free review. Please log in to get ${maxCredits} reviews, or wait ${timeUntilReset} minutes.`,
      credits: 0,
      maxCredits: 1,
      retryAfter: timeUntilReset,
    });

  } catch (error) {
    console.error("Credit checker error:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error checking credits. Please try again.",
    });
  }
};


const reviewLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 1, 
  message: "You have reached the daily limit. Please log in to get more requests.",
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    return true;
  },
});

module.exports = {
  reviewLimiter,
  creditChecker,
};
