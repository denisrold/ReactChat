import express from "express";
import controller from "../controllers/message.js";

const router = express.Router();

//Routes Define:

router.post("/save", controller.save);
router.get("/messages", controller.getMessage);

export default router;
