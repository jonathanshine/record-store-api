import express from 'express';
const router = express.Router();

import {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    loginUser,
    verifyCookie
} from '../controllers/usersController.js';

import { createOrder, deleteOrder, getOrder, getOrders, updateOrder } from '../controllers/ordersControllers.js';

import { userValidationRules, userValidationErrorHandling } from "../middleware/validation/userValidation.js";
import auth from "../middleware/authentication/authentication.js"

router.route("/").get(auth, getUsers).post(
    userValidationRules(),
    userValidationErrorHandling,
    createUser
);
router.route("/login").post(loginUser);
router.route("/auth").post(auth, verifyCookie);
router.route("/:id").get(auth, getUser).delete(auth, deleteUser).put(auth, updateUser);
router.route("/:id/orders").get(auth, getOrders).post(auth, createOrder);
router.route("/:id/orders/:id").get(auth, getOrder).delete(auth, deleteOrder).put(auth, updateOrder);


export default router;