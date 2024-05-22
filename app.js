import express from "express";
import { sequelize } from "./Database/dbConnection.js";
import cors from "cors";
import { postModel } from "./Modules/posts/posts.controller.js";
import postRouter from "./Modules/posts/postes.routes.js";
import commentRouter from "./Modules/comments/comments.routes.js";
import { userModel } from "./Modules/users/users.controller.js";
import { commentModel } from "./Modules/comments/comments.controller.js";
import userRouter from "./Modules/users/users.routes.js";
import userPosts from "./Modules/userPosts/userPostes.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.port || 3000;
userModel;
postModel;
commentModel;

app.use("/", postRouter);
app.use("/",commentRouter)
app.use("/",userRouter)
app.use('/',userPosts)


sequelize.sync();
app.listen(port, () => console.log(`Connected on port ${port}`));
