const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");
const { generateToken } = require("../middleware/auth");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const users = new Map();

module.exports.googleCallback = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    let user = users.get(`google-${sub}`);
    if (!user) {
      user = {
        id: `google-${sub}`,
        email,
        name,
        picture,
        provider: "google",
      };
      users.set(`google-${sub}`, user);
    }

    const jwtToken = generateToken(user);

    res.json({
      success: true,
      token: jwtToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
    });
  } catch (error) {
    console.error("Google OAuth error:", error.message);
    res.status(401).json({
      success: false,
      message: "Google authentication failed",
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
    let user = users.get(`github-${id}`);
    if (!user) {
      user = {
        id: `github-${id}`,
        email: email || `${login}@github.com`,
        name: name || login,
        picture: avatar_url,
        provider: "github",
      };
      users.set(`github-${id}`, user);
    }
    const jwtToken = generateToken(user);
    res.json({
      success: true,
      token: jwtToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
    });
  } catch (error) {
    console.error("GitHub OAuth error:", error.message);
    res.status(401).json({
      success: false,
      message: "GitHub authentication failed",
    });
  }
};
