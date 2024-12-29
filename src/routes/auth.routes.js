import authController from '../controllers/auth.controller.js';

const registerRoute = (server) => ({
  method: 'POST',
  url: '/auth/register',
  handler: authController.register,
});

const loginRoute = (server) => ({
  method: 'POST',
  url: '/auth/login',
  handler: authController.login,
});



export default [registerRoute, loginRoute];
