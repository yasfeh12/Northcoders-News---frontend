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
      throw err;
    });
};

export const getArticleById = (id) => {
  return endpoints
    .get(`/articles/${id}`)
    .then(({ data }) => {
      return data.article;
    })
    .catch((err) => {
      console.error(`Error fetching article with ID ${id}:`, err);
      throw err;
    });
};
export const getArticlesByTopic = (topic) => {
  return endpoints
    .get(`/articles`, {
      params: { topic },
    })
    .then(({ data }) => {
      return data.articles;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const getCommentsByArticleId = (articleId) => {
  return endpoints
    .get(`/articles/${articleId}/comments`)
    .then(({ data }) => {
      return data.comments;
    })
    .catch((err) => {
      console.error(`Error fetching comments for article ${articleId}:`, err);
      throw err;
    });
};

export const postCommentToArticle = (articleId, username, body) => {
  console.log("Attempting to post comment:", { articleId, username, body });
  return endpoints
    .post(`/articles/${articleId}/comments`, {
      username: username,
      body: body,
    })
    .then(({ data }) => {
      console.log("Comment successfully posted:", data.comment);
      return data.comment;
    })
    .catch((err) => {
      console.error(
        `Error posting comment to article ${articleId}:`,
        err.response ? err.response.data : err
      );
      throw err;
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
      console.error(`Error updating votes for article ${articleId}:`, err);
      throw err;
    });
};

export const patchCommentVotes = (article_id, commentId, voteChange) => {
  return endpoints
    .patch(`/articles/${article_id}/comments/${commentId}`, {
      inc_votes: voteChange,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error(
        `Error updating votes for comment ${commentId} on article ${article_id}:`,
        err
      );
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
      console.error(`Error deleting comment ${commentId}:`, err);
      throw err;
    });
};

export const getUsers = () => {
  return endpoints
    .get("/users")
    .then(({ data }) => {
      return data.users;
    })
    .catch((err) => {
      console.error("Error fetching users:", err);
      throw err;
    });
};
