import express from 'express'
import {customData} from '../controller/dataController.js'
import { verifyToken } from '../middlewares/authJwt.js';
const router = express.Router();

router.get("/customdata",verifyToken,customData)

export default router