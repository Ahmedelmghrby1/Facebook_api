import { Router } from "express";
import { getUserWithPostAndComments } from "./userPostes.controller.js";

const userPosts = Router()
userPosts.get('/user/:userId/post/:postId',getUserWithPostAndComments)
export default userPosts