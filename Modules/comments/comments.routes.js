import { Router } from "express";
import { addcomment, deletecomment, getcomment, updatecomment } from "./comments.controller.js";
const commentRouter = Router();

commentRouter.post("/addcomment", addcomment);
commentRouter.get("/comments",getcomment)
commentRouter.put("/comments/:id",updatecomment)
commentRouter.delete("/comments/:id",deletecomment)


export default commentRouter;