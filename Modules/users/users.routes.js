import { Router } from "express";
import { login, registerUser } from "./users.controller.js";
const userRouter = Router();

userRouter.post("/adduser", registerUser);
userRouter.post("/loginuser",login)


export default userRouter;