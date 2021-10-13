import express from 'express';
const router = express.Router();

import {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    loginUser,
    verifyCookie,
    sendUser,
    verifyEmail,
    signUpGoogleUser
} from '../controllers/usersController.js';

import { createOrder, deleteOrder, getOrder, getOrders, updateOrder } from '../controllers/ordersControllers.js';

import { userValidationRules, userValidationErrorHandling } from "../middleware/validation/userValidation.js";
import auth from "../middleware/authentication/authentication.js";
import sendEmail from "../middleware/mailer/setup.js";
import verif from "../middleware/authentication/verification.js";
import isUserVerified from '../middleware/authentication/isUserVerified.js';
import isAdmin from '../middleware/authentication/isAdmin.js';

router.route("/").get(auth, isAdmin, getUsers).post(
    userValidationRules(),
    userValidationErrorHandling,
    createUser,
    sendEmail,
    sendUser
);

router.route("/googleSignUp").post(signUpGoogleUser);
router.route("/verify-email/:token").post(verif, verifyEmail);
router.route("/login").post(loginUser);
router.route("/auth").post(auth, verifyCookie);
router.route("/:id").get(auth, getUser).delete(auth, deleteUser).put(auth, updateUser);
router.route("/:id/orders").get(auth, getOrders).post(auth, isUserVerified, createOrder);
router.route("/:id/orders/:id").get(auth, getOrder).delete(auth, isAdmin, deleteOrder).put(auth, isAdmin, updateOrder);


export default router;