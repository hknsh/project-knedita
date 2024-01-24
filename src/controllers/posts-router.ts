import { Router } from "express";

// Controllers
import post from "./posts";

// Middlewares
import authenticated from "middlewares/authenticated";

const postsRouter = Router();

// GET
postsRouter.get("/fetch-likes", post.fetchLikes);
postsRouter.get("/info", post.fetch);

// POST
postsRouter.post("/create", authenticated, post.create);
postsRouter.post("/delete", authenticated, post.delete);

// PUT
postsRouter.put("/update", authenticated, post.update);

export default postsRouter;
