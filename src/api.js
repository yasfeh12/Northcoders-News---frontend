import axios from "axios";

const endpoints = axios.create({
  baseURL: "https://nc-project-5d75.onrender.com/api",
});

export const getArticles = (sortBy = "created_at", order = "desc") => {
  return endpoints
    .get("/articles", {
      params: {
        sort_by: sortBy,
        order: order,
      },
    })
    .then(({ data }) => {
      return data.articles;
    })
    .catch((err) => {
      console.error(err);
    });
};
export const getArticleById = (id) => {
  return endpoints
    .get(`/articles/${id}`)
    .then(({ data }) => {
      return data.article;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getCommentsByArticleId = (articleId) => {
  return endpoints
    .get(`/articles/${articleId}/comments`)
    .then(({ data }) => {
      return data.comments;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const postCommentToArticle = (articleId, username, body) => {
  return endpoints
    .post(`/articles/${articleId}/comments`, {
      username: username,
      body: body,
    })
    .then(({ data }) => {
      return data.comment;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const patchArticleVotes = (articleId, incVotes) => {
  return endpoints
    .patch(`/articles/${articleId}`, {
      inc_votes: incVotes,
    })
    .then(({ data }) => {
      return data.article;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const patchCommentVotes = (article_id, commentId, voteChange) => {
  return endpoints
    .patch(`/articles/${article_id}/comments/${commentId}`, {
      inc_votes: voteChange,
    })
    .then((response) => {
      console.log("hit in api.js");
      return response.data;
    })
    .catch((err) => {
      console.error("Error in patchCommentVotes API call:", err);
      throw err;
    });
};

export const deleteCommentById = (commentId) => {
  return endpoints
    .delete(`/comments/${commentId}`)
    .then(() => {
      return { msg: "Comment deleted successfully" };
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getUsers = () => {
  return endpoints
    .get("/users")
    .then(({ data }) => {
      return data.users;
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.updateCommentVotes = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;

  if (typeof inc_votes !== "number") {
    return res
      .status(400)
      .send({ msg: "Bad request: Missing or invalid field(s)" });
  }

  updateCommentById(comment_id, inc_votes)
    .then((updatedComment) => {
      res.status(200).send({ comment: updatedComment });
    })
    .catch((err) => {
      if (err.code === "22P02" || err.code === "22003") {
        res.status(400).send({ msg: "Invalid comment ID" });
      } else if (err.status === 404) {
        res.status(404).send({ msg: "Comment not found" });
      } else {
        next(err);
      }
    });
};
