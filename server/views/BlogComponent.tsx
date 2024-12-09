import React from "react";
import { hydrateRoot } from "react-dom/client";

const BlogComponent = ({ blogData }) => {
  return (
    <article>
      <h2 className="font-bold text-3xl bg-orange-700">{blogData.title}</h2>
      <p>{blogData.content}</p>
    </article>
  );
};

if (typeof window !== "undefined") {
  const blogDataElement = document.getElementById("blog-data");
  const blogContentElement = document.getElementById("blog-content");

  if (blogDataElement && blogContentElement) {
    const blogData = JSON.parse(blogDataElement.textContent || "{}");
    hydrateRoot(blogContentElement, <BlogComponent blogData={blogData} />);
  } else {
    console.error("Required DOM elements are missing.");
  }
}

export default BlogComponent;
