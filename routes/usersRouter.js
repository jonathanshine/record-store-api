import express from 'express';
const router = express.Router();

import {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    loginUser
} from '../controllers/usersController.js';

import { createOrder, deleteOrder, getOrder, getOrders, updateOrder } from '../controllers/ordersControllers.js';

router.route("/").get(getUsers).post(createUser);
router.route("/login").post(loginUser);
router.route("/:id").get(getUser).delete(deleteUser).put(updateUser);
router.route("/:id/orders").get(getOrders).post(createOrder);
router.route("/:id/orders/:id").get(getOrder).delete(deleteOrder).put(updateOrder);


export default router;