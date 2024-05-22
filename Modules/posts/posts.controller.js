import { DataTypes } from "sequelize";
import { sequelize } from "../../Database/dbConnection.js";
import { userModel } from "../users/users.controller.js";
let postModel = sequelize.define("post", {
  title: {
    type: DataTypes.STRING(100),
  },
  content: {
    type: DataTypes.STRING(400),
  },
  author: {
    type: DataTypes.INTEGER,
    references: {
      model: userModel,
      key: "id",
    },
  },
});

// addposts
const addpost = async (req, res) => {
  await postModel.create(req.body);
  res.status(200).json({
    message: "success",
  });
};

// getposts
const getposts = async (req, res) => {
  let posts = await postModel.findAll();
  res.status(200).json({
    message: "success",
    posts,
  });
};

// updateposts
const updateposts = async (req, res) => {
  let [updat_post] = await postModel.update(
    {
      title: req.body.title,
      content: req.body.content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  if (updat_post) {
    res.status(200).json({
      message: "success",
    });
  } else {
    res.status(404).json({
      message: "not found",
    });
  }
};
// deleteposts
const deleteposts = async (req, res) => {
  let delete_posts = await postModel.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (delete_posts) {
    res.status(200).json({
      message: "success",
    });
  } else {
    res.status(404).json({
      message: "not found",
    });
  }
};

//   Get a specific post with the author.
const post_author = async (req, res) => {
        try {
          let post = await postModel.findOne({
            where: {
              id: req.params.id,
            },
          });
          if (!post) {
            return res.status(404).json({ message: "Post Not Found" });
          }
          let user = await userModel.findOne({
            where: {
              id: post.author,
            },
          });
          const data = {
            Post_id: post.id,
            Title: post.title,
            Author_id: post.author,
            Author_Name: user.username,
          };
      
          res.status(200).json({ message: "Success", data });
        } catch (err) {
          return res.status(500).json({ Message: "Internal Server Error", err });
        }
      };

export { postModel, addpost, getposts, updateposts, deleteposts, post_author };
