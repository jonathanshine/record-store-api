import express from 'express';
const router = express.Router();

import {
    getRecords,
    getRecord,
    createRecord,
    deleteRecord,
    updateRecord,
} from '../controllers/recordsController.js';

import { isRecordValid } from "../middleware/recordValidation.js"

router.route("/").get(getRecords).post(isRecordValid, createRecord);
router.route("/:id").get(getRecord).delete(deleteRecord).put(updateRecord);

export default router;