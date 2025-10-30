import express, { Request, Response } from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import livereload from "livereload";
import connectLivereload from "connect-livereload";
import cookieParser from "cookie-parser";
import db from "./utils/db.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;

const liveReloadServer = livereload.createServer({
  exts: ["html", "js", "css", "tsx", "ts"],
  debug: false,
});

liveReloadServer.watch([
  join(__dirname, "../public"),
  join(__dirname, "../dist"),
  join(__dirname, "../src"),
]);

app.use(connectLivereload());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(join(__dirname, "../public")));
app.use("/dist", express.static(join(__dirname, "../dist")));

// Cart endpoints ---

app.get("/api/cart", async (req: Request, res: Response) => {
});

app.post("/api/cart", async (req: Request, res: Response) => {
});

app.delete("/api/cart", async (req: Request, res: Response) => {
});

// Auth endpoints ---

app.get("/api/auth/user", async (req: Request, res: Response<{user: string | null}>) => {
  try {
    const userId = req.cookies.userId;
    if (!userId) {
      return res.json({ user: null });
    }

    // Look up user by ID
    const [user] = await db`
      SELECT name 
      FROM users 
      WHERE id = ${userId}
    `;

    res.json({ user: user ? user.name : null });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ user: null });
  }
});

app.post("/api/auth/login", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Try to find existing user
    let [user] = await db`
      SELECT id, name 
      FROM users 
      WHERE name = ${name}
    `;

    // If user doesn't exist, create new user
    if (!user) {
      const [newUser] = await db`
        INSERT INTO users (name)
        VALUES (${name})
        RETURNING id, name
      `;
      user = newUser;
    }

    // Set cookie with user ID
    res.cookie('userId', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to log in' });
  }
});

app.post("/api/auth/logout", (req: Request, res: Response) => {
  res.clearCookie('userId');
  res.json({ success: true });
});

// Product endpoints ---

app.get("/api/products", async (req: Request, res: Response) => {
  try {
    const products = await db`
      SELECT id, title, color, size, price
      FROM products
      ORDER BY title
    `;
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// ---

app.get("/", (req: Request, res: Response) => {
  res.sendFile(join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  liveReloadServer.close();
  process.exit(0);
});
