import { Router } from "express";
import congratulationController from "../controllers/congratulation.js";
import homeController from "../controllers/home.controller.js";

const homeRoutes = Router();

homeRoutes.get('/', homeController)

homeRoutes.get('/congratulation', congratulationController)

export default homeRoutes;