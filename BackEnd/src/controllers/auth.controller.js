const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");
const { generateToken } = require("../middleware/auth");
const User = require("../models/User");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const sanitizeUser = (user) => ({
  email: user.email,
  name: user.name,
  picture: user.picture,
  provider: user.provider,
});

module.exports.googleCallback = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;
    const providerUserId = `google-${sub}`;
    const maxCredits = parseInt(process.env.MAX_CREDITS) || 5;
    let user = await User.findOne({ providerUserId });

    if (!user) {
      user = await User.create({
        name,
        email,
        picture,
        provider: "google",
        providerId: sub,
        providerUserId,
        credits: maxCredits,
        creditsResetAt: new Date(),
      });
    } else {
      user.name = name;
      user.picture = picture;
      user.email = email;
      await user.save();
    }

    const jwtToken = generateToken({
      id: user._id.toString(),
      email: user.email,
    });

    res.json({
      success: true,
      token: jwtToken,
      user: sanitizeUser(user), 
    });
  } catch (error) {
    console.error("❌ Google OAuth error:", error.message);
    res.status(401).json({
      success: false,
      message: "Authentication failed", 
    });
  }
};

module.exports.githubCallback = async (req, res) => {
  try {
    const { code } = req.body;
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: clientId,
        client_secret: clientSecret,
        code,
      },
      { headers: { Accept: "application/json" } }
    );
    
    const { access_token } = tokenResponse.data;
    
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    
    const { id, login, name, avatar_url, email } = userResponse.data;
    const providerUserId = `github-${id}`;
    const maxCredits = parseInt(process.env.MAX_CREDITS) || 5;
    let user = await User.findOne({ providerUserId });

    if (!user) {
      user = await User.create({
        name: name || login,
        email: email || `${login}@github.com`,
        picture: avatar_url,
        provider: "github",
        providerId: id.toString(),
        providerUserId,
        credits: maxCredits,
        creditsResetAt: new Date(),
      });
    } else {
      user.name = name || login;
      user.picture = avatar_url;
      if (email) user.email = email;
      await user.save();
    }

    const jwtToken = generateToken({
      id: user._id.toString(),
      email: user.email,
    });

    res.json({
      success: true,
      token: jwtToken,
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("❌ GitHub OAuth error:", error.message);
    res.status(401).json({
      success: false,
      message: "Authentication failed",
      message: "GitHub authentication failed",
    });
  }
};
