const { generateToken, hashPassword, checkPassword } = require('../middlewares/authenticate');
const User = require('../models/userModal');

// Create a function for registering a new user
const register = async (req, res, next) => {
    try {
        const { userName,Email, Password } = req.body;
   
        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const hashedPassword = await hashPassword(Password);
        const user = new User({userName, Email, Password: hashedPassword });
        await user.save();
        const token = generateToken(user);
        return res.status(201).json({ user, token });
    } catch (error) {
        return next(error);
    }
};

// Create a function for logging in an existing user
const login = async (req, res, next) => {
    try {
        const { Email, Password } = req.body;
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const passwordMatch = await checkPassword(Password, user.Password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = generateToken(user);
        return res.json({ user, token });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    register,
    login
};
