import { Router } from "express";
import { addpost, deleteposts, getposts, post_author, updateposts } from "./posts.controller.js";

const postRouter = Router();

postRouter.post("/addpost", addpost);
postRouter.get("/posts",getposts)
postRouter.put("/posts/:id",updateposts)
postRouter.delete("/posts/:id",deleteposts)
postRouter.get("/postauthor/:id",post_author)






export default postRouter;
