import { DataTypes } from "sequelize";
import { sequelize } from "../../Database/dbConnection.js";
import { postModel } from "../posts/posts.controller.js";
import { userModel } from "../users/users.controller.js";
let commentModel = sequelize.define("comment", {
  content: {
    type: DataTypes.STRING(100),
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: postModel,
      key: "id",
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: userModel,
      key: "id",
    },
  },
});

// addcomment
const addcomment = async (req, res) => {
  const { postId } = req.body;
  try {
    const post = await postModel.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await commentModel.create(req.body);
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


  // getcomment
  const getcomment = async (req, res) => {
    let comments = await commentModel.findAll();
    res.status(200).json({
      message: "success",
      comments,
    });
  };

  // updateposts
  const updatecomment = async (req, res) => {
    let [updat_comment] = await commentModel.update(
      {
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (updat_comment) {
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
  const deletecomment = async (req, res) => {
      let delete_comment = await commentModel.destroy(
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if (delete_comment) {
        res.status(200).json({
          message: "success",
        });
      } else {
        res.status(404).json({
          message: "not found",
        });
      }
    };

export { commentModel, addcomment,getcomment,updatecomment,deletecomment };
