import { Router } from "express";
import { getAllUsers, getMessages } from "../controller/user.controller.js";
import { requireAuth } from "@clerk/express";
const router = Router();

router.get("/", requireAuth(), getAllUsers);
router.get("/messages/:userId", requireAuth(), getMessages);

export default router;
