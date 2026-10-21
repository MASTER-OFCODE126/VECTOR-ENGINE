const expres = require('express');
const authRouter = expres.Router();
const authControllers = require('./../controllers/auth.controller');
const authMiddleware = require('./../middlewares/auth.middleware');


/**
 * @route POST api/auth/register
 * @description Register a new user
 * @acces Public 
*/
authRouter.post('/register', authControllers.registerUser);

/**
 * @route POST api/auth/login
 * @description Login an existing user with email and password
 * @acces Public 
*/
authRouter.post('/login',authControllers.loginUser);

/**
 * @route GET api/auth/logout
 * @description Clear the token from the cookie and blacklist it
 * @acces Public 
*/
authRouter.get('/logout',authControllers.logout);

/**
 * @route GET api/auth/get-me
 * @description Get the current user Information
 * @acces Private 
*/

authRouter.get('/get-me',authMiddleware.authUser,authControllers.getMe);

module.exports = authRouter;