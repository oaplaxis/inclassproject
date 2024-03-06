import { Router } from "express";
import { home } from "../controllers/PagesController.js";
import { isAuthenticated } from "../controllers/AuthenticationController.js";

// Creates a router
const router = Router();

// Defines routes and associates them with controller actions
router.get("/404", (req, res) => {
    res.render("errors/404");
});

export default router;
