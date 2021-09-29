import express from 'express';
const router = express.Router();

import {
    getRecords,
    getRecord,
    createRecord,
    deleteRecord,
    updateRecord,
} from '../controllers/recordsController.js';

import { isRecordValid } from "../middleware/validation/recordValidation.js";
import auth from "../middleware/authentication/authentication.js";

router.route("/").get(getRecords).post(auth, isRecordValid, createRecord);
router.route("/:id").get(getRecord).delete(auth, deleteRecord).put(auth, updateRecord);

export default router;