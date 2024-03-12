import { Router } from "express";
import { home } from "../controllers/PagesController.js";
import { isAuthenticated } from "../controllers/AuthenticationController.js";

// Creates a router
const router = Router();

// Defines routes and associates them with controller actions
router.get("/404", (req, res) => {
    res.render("errors/404");
});

router.get("/401", (req, res) => {
    res.render("errors/401");
});

router.get("/403", (req, res) => {
    res.render("errors/403");
});

router.get("/500", (req, res) => {
    res.render("errors/500");
});

export default router;
