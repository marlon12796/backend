import { Router } from "express";
import { requireAdmin } from "../middleware/auth.middleware.js";
import { getStats } from "../controller/stat.controller.js";
import { requireAuth } from "@clerk/express";

const router = Router();

router.get("/", requireAuth(), requireAdmin, getStats);

export default router;
