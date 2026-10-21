const userModel = require('./../models/user.model');
const tokenBlacklistModel = require('./../models/blacklist.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

/**
 * @name  registerUser
 * @description Register a new user, exprects username ,email,password
 * @acces Public 
*/

async function registerUser(req, res) {
    
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please provide email,username and password" });

    }
    const isUserExists = await userModel.findOne({
        $or: [{ email: email }, { username: username }]
    });

    if (isUserExists) return res.status(400).json({ message: "User Already Exists with this Username or emial" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    });

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
    res.cookie('token', token);

    return res.status(201).json({
        message: "User created successfully",
        user : {
            id:user._id,
            username:user.username,
            email:user.email
        }
    })

}

/**
 * @name  loginUser
 * @description Login an existing user, exprects email and password
 * @acces Public 
*/

async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });

    }
    const user = await userModel.findOne({ email });

    if (!user) return res.status(400).json({ message: "User Not Found with this Username or email" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
    res.cookie('token', token);

    return res.status(200).json(
        {
            message: "User Logged in successfully",
            user: {
                id: user._id,
                username: user.username
            }
        }

    );

}

/**
 * @name  logout
 * @description Clear the token from the cookie and blacklist it
 * @acces Public 
*/

async function logout(req, res) {
    const { token } = req.cookies; // Destructure

    if (!token) {
        return res.status(400).json({ message: "No token found" });
    }

    // Add the token to the blacklist
    await tokenBlacklistModel.create({ token });

    // Clear the token from the cookie
    res.clearCookie('token');

    return res.status(200).json({ message: "User logged out successfully" });
}

/**
 * @route get-me
 * @description Get the current user Information
 * @acces Private 
*/

async function getMe(req,res)
{

    

    const user = await userModel.findById(req.user.id); // Used the user id from the token to get the user information that is saved in the req.user object by the authUser middleware
    return res.status(200).json({
        message : "User details fetched successfully",
        user : {
            id : user._id,
            username : user.username
        }
    })
}

module.exports = { registerUser, loginUser, logout ,getMe};