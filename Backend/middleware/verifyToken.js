
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    console.log(req.cookies);
    console.log("Token:", req.cookies.token);
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Login First"
        });
    }
    try {
        const checker = jwt.verify(token, process.env.JWT_SECRET);
        // req.user = checker;
        req.userId = checker.userId;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Not a Valid User"
        })
    }
}
module.exports = verifyToken;