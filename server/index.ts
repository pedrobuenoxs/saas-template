import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(cors());
import helmet from "helmet";
app.use(helmet());

import rateLimit from "express-rate-limit";
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
});
app.use(limiter);
// Initialize Supabase client
import { fileURLToPath } from "url";
import { dirname } from "path";
import pageConfig from "./pageConfig.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
    },
  })
);

const ENV = process.env.NODE_ENV;
console.log({ ENV });

const buildPath =
  ENV === "production"
    ? path.join(__dirname, "..", "/build")
    : path.join(__dirname, "..");

const filePath = path.resolve(buildPath, "index.html");

app.get("/", (req, res) => {
  const route = req.path;

  // Fetch metadata from pageConfig
  const metaTags = {
    title: "Quantas calorias tem",
    description: "Descubra quantas calorias tem no seu prato de comida!",
    keywords: [
      "quantas calorias tem",
      "quantas calorias",
      "calorias prato de comida",
    ],
  };
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.error(err);
    }

    const updatedHtml = data
      .replace(/\$OG_TITLE/g, metaTags.title)
      .replace(/\$OG_KEYWORDS/g, metaTags.keywords.join(","))
      .replace(/\$OG_DESCRIPTION/g, metaTags.description)
      .replace(/\$OG_TYPE/g, "website")
      .replace(/\$OG_IMAGE/g, "/icon.svg")
      .replace(/\$OG_URL/g, `https://www.quantascaloriastem.com.br${route}`);

    res.send(updatedHtml);
  });
});

app.get("/sitemap.xml", async (req, res) => {
  try {
    res.header("Content-Type", "application/xml");
  } catch (err) {
    console.error("Error generating sitemap:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send(`User-agent: *
Allow: /
Sitemap: https://my-pet.website/sitemap.xml`);
});

import ReactDOMServer from "react-dom/server";
import React from "react";
import BlogComponent from "./views/BlogComponent.js";

app.get("/blog/:slug", async (req, res) => {
  const slug = req.params.slug;

  // Fetch blog data from your database or API
  const blogData = await fetchBlogFromDatabase(slug);

  // Render a React component to a string (optional)
  const blogContent = ReactDOMServer.renderToString(
    React.createElement(BlogComponent, { blogData })
  );

  // Pass data and React content to EJS
  res.render("blog", {
    title: blogData.title,
    description: blogData.description,
    content: blogContent,
    cssFilePath: "/server.css",
    blogData,
  });
});

async function fetchBlogFromDatabase(slug) {
  return {
    title: `Blog Title for ${slug}`,
    description: `Description for blog ${slug}`,
    content: `This is the content of the blog post with slug ${slug}.`,
  };
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Adjust the views folder path
app.use(express.static(buildPath, { maxAge: "1m" }));

// Serve static files

app.get("*", (req, res) => {
  const route = req.path;
  const metaTags = pageConfig[route] || pageConfig.default;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server Error");
      return;
    }

    const updatedHtml = data
      .replace(/\$OG_TITLE/g, metaTags.title)
      .replace(/\$OG_DESCRIPTION/g, metaTags.description)
      .replace(/\$OG_KEYWORDS/g, metaTags.keywords.join(","))
      .replace(/\$OG_TYPE/g, "website")
      .replace(/\$OG_IMAGE/g, "/icon.svg")
      .replace(/\$OG_URL/g, `https://www.quantascaloriastem.com.br${route}`);

    res.send(updatedHtml);
  });
});

// Start Server
const PORT = +process.env.PORT! || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
