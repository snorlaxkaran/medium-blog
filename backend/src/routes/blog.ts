import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@snorlax.karan/medium-common";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";
  console.log("Auth Header:", authHeader);
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user && typeof user.id === "string") {
      c.set("userId", user.id);
      return await next(); // Just proceed to next handler
    } else {
      c.status(403);
      return c.json({ error: "unauthorized" });
    }
  } catch (e) {
    c.status(403);
    return c.json({ error: "unauthorized" });
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs are not correct",
    });
  }
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.create({
    data: {
      title: body.title,
      context: body.context,
      authorId: userId,
    },
  });

  return c.json({ id: post.id });
});

blogRouter.put("/blog", async (c) => {
  const body = await c.req.json();

  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs are not correct",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        context: body.context,
      },
    });

    return c.json({ id: post.id });
  } catch (error) {
    c.status(411);
    return c.json({ message: "Error while updating" });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany({
      select: {
        title: true,
        context: true,
        id: true,
        authorId: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return c.json({ posts }); // Corrected response
  } catch (error) {
    c.status(500);
    return c.json({ error: "Error fetching posts" });
  }
});

blogRouter.get("/:id", async (c) => {
  const id = await c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.findFirst({
      where: { id: id },
      select: {
        id: true,
        title: true,
        context: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({ post: post });
  } catch (error) {
    c.status(411);
    return c.json({ message: "Error while fetching" });
  }
});
