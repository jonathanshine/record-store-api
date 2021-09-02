import express from 'express';
const router = express.Router();

import {
    getRecords,
    getRecord,
    createRecord,
    deleteRecord,
    updateRecord,
} from '../controllers/recordsController.js';


router.route("/").get(getRecords).post(createRecord);
router.route("/:id").get(getRecord).delete(deleteRecord).put(updateRecord);

export default router;