import express from 'express';
const router = express.Router();

import {
    getRecords,
    getRecord,
    createRecord,
    deleteRecord,
    updateRecord,
} from '../controllers/recordsController.js';

import auth from "../middleware/authentication/authentication.js";

router.route("/").get(getRecords).post(auth, createRecord);
router.route("/:id").get(getRecord).delete(auth, deleteRecord).put(auth, updateRecord);

export default router;