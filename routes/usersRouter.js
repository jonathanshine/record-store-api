import express from 'express';
const router = express.Router();

import {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
} from '../controllers/usersController.js';

router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUser).delete(deleteUser).put(updateUser);

export default router;