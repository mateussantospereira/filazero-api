import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "Olá js " });
});

export default router;
