var User = require("../../mongo/User");

async function getUserOfCookie(req, res, next) {
    // Obtain user based on session cookie
    if (!req.cookies.sessionID) {
        return res.status(401).json({ message: "Not logged in" });
    }
    try {
        req.user = await User.findOne({ sessionID: req.cookies.sessionID }, "_id username name email phoneNumber isHost roomCode");
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    // If user does not exist, session cookie is expired or invalid
    if (!req.user) {
        return res.status(401).json({ message: "Invalid Session" });
    }
    next();
}

module.exports = getUserOfCookie;