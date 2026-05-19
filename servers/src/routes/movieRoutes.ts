// server/src/routes/movieRoutes.ts
import { Router } from "express";
import * as moviesController from "../controllers/movieController";
import { authorize } from "../middleware/authMiddleware";

const router = Router();

router.get("/movies", moviesController.getAllMovies);
router.get("/movies/search/:mname", moviesController.getByNameMovies); 
router.get("/movies/:id", moviesController.getByIdMovies);
router.post("/movies", moviesController.createMovie);
router.put("/movies/:id", moviesController.updateMovie);

router.delete("/movies/:id", authorize(["MANAGER"]), moviesController.deleteMovie);

export default router;