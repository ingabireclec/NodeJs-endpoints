import { Router } from "express";
import { getAllQueries, createQuery } from "../controllers/query.controller.js";
import {
  isAdmin,
  isLoggedIn,
} from "../middleware/authentication/auth.middleware.js";
import { queriesSchema } from "../middleware/validation/validation.js";
import validate from "../middleware/validation/validation.middleware.js";
const queryRouter = Router();

queryRouter.get("/messages", [isLoggedIn, isAdmin], getAllQueries);
queryRouter.post("/messages", validate(queriesSchema), createQuery);

export default queryRouter;
