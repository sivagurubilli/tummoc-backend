const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModal');

// Configure passport to use the JWT strategy
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, async (jwtPayload, done) => {
    try {
        const user = await User.findById(jwtPayload.sub);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}));

// Create a middleware for user authentication
const authenticateUser = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    })(req, res, next);
};

// Create a middleware for generating JWT tokens
const generateToken = (user) => {
    const payload = {
        sub: user.id,
        iat: Date.now()
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Create a middleware for hashing passwords
const hashPassword = async (password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
};

// Create a middleware for checking if a password matches a hash
const checkPassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
};

// Create a middleware for expiring JWT tokens
const expireToken = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        user.tokenVersion += 1;
        await user.save();
        next();
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    authenticateUser,
    generateToken,
    hashPassword,
    checkPassword,
    expireToken
};
