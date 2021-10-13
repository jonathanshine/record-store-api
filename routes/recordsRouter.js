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
import isAdmin from '../middleware/authentication/isAdmin.js';

router.route("/").get(getRecords).post(auth, isRecordValid, isAdmin, createRecord);
router.route("/:id").get(getRecord).delete(auth, isAdmin, deleteRecord).put(auth, isAdmin, updateRecord);

export default router;