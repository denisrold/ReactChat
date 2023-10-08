import express from "express";
import controller from "../controllers/message.js";

const router = express.Router();

//Routes Define:

router.post("/save", controller.save);
router.get("/message", controller.getMessage);

export default router;
