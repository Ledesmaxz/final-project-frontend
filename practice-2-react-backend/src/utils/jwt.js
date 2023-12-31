const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../constants");

const createAccessToken = (user) => {
    const expToken = new Date();
    expToken.setHours(expToken.getHours()+2);
    const payload = {
        token_type: "access",
        user_id : user._id,
        iat : Date.now(),
        ep : expToken.getTime(),
        role : user.role,
        document : user.document
    };
    return jwt.sign(payload, JWT_SECRET_KEY);
};

const createRefreshToken = (user) => {
    const expToken = new Date();
    expToken.getMonth(expToken.getMonth()+1);
    const payload = {
        token_type: "refresh",
        user_id : user._id,
        iat : Date.now(),
        ep : expToken.getTime(),
        role : user.role,
        document : user.document
    };
    return jwt.sign(payload, JWT_SECRET_KEY);
};

const decoded = (token) => {
    return jwt.decode(token, JWT_SECRET_KEY);
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    decoded
};
