const aiService = require("../services/ai.service");
const User = require("../models/User");

module.exports.getReview = async (req, res) => {
  const code = req.body.code;
  if (!code) {
    return res.status(400).send("Prompt is required");
  }
  
  const response = await aiService(code);

  const maxCredits = parseInt(process.env.MAX_CREDITS) || 5;
  const responseData = {
    review: response,
    credits: {
      remaining: req.remainingCredits !== undefined ? req.remainingCredits : null,
      max: req.user ? maxCredits : 1,
    }
  };
  
  res.json(responseData);
};

module.exports.getCredits = async (req, res) => {
  try {
    const maxCredits = parseInt(process.env.MAX_CREDITS) || 5;
    if (req.user && req.user.id) {
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return res.status(401).json({
          statusCode: 401,
          message: "User not found.",
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

      return res.json({
        credits: {
          remaining: user.credits,
          max: maxCredits,
        }
      });
    }

    return res.json({
      credits: {
        remaining: 1,
        max: 1,
      }
    });
  } catch (error) {
    console.error("Error fetching credits:", error);
    return res.status(500).json({
      message: "Error fetching credits",
    });
  }
};
