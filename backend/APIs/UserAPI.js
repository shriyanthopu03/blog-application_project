import exp from "express";
import { verifyToken } from "../middlewares/VerifyToken.js";
import { ArticleModel } from "../models/ArticleModel.js";
export const userApp = exp.Router();

//Read articles of all authors
userApp.get("/articles", verifyToken("USER", "AUTHOR", "ADMIN"), async (req, res) => {
  //read artcles
  const articlesList = await ArticleModel.find({ isArticleActive: true });
  //send res
  res.status(200).json({ message: "artciles", payload: articlesList });
});

//Read article by ID
userApp.get("/article/:id", verifyToken("USER", "AUTHOR", "ADMIN"), async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id)
      .populate("comments.user", "firstName lastName email profileImageUrl");
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    
    // If article is inactive, only the author or an admin can view it
    if (!article.isArticleActive && req.user.role !== "ADMIN" && article.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to view this article" });
    }

    res.status(200).json({ message: "article", payload: article });
  } catch (err) {
    res.status(500).json({ message: "Error fetching article", error: err.message });
  }
});

//Add comment to an article
userApp.put("/articles", verifyToken("USER"), async (req, res) => {
  //get body from req
  const { articleId, comment } = req.body;
  //check article
  const articleDocument = await ArticleModel
                          .findOne({ _id: articleId, isArticleActive: true })
                           .populate("comments.user");

  console.log(articleDocument);
  //if article nbot found
  if (!articleDocument) {
    return res.status(404).json({ message: "Article not found" });
  }
  //get user id
  const userId = req.user?.id;
  //add comment to comments array of articleDocument
  articleDocument.comments.push({ user: userId, comment: comment });
  //save
  await articleDocument.save();
  //send res
  res.status(200).json({ message: "Comment added successfully", payload: articleDocument });
});