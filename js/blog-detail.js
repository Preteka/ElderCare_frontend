/**
 * ElderCare - Blog Detail Page Interactive Logic
 * Reads URL parameter, dynamically renders article blocks, author bio, sidebar, and related articles.
 */

document.addEventListener("DOMContentLoaded", () => {
  const articleContentWrapper = document.getElementById("articleContentWrapper");
  const notFoundWrapper = document.getElementById("articleNotFoundWrapper");

  if (!articleContentWrapper || typeof BLOG_POSTS === "undefined") return;

  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("id");
  const post = getBlogPostById(blogId);

  if (!post) {
    showNotFound();
    return;
  }

  // Update Page Title & Metadata
  document.title = `${post.title} – ElderCare Journal`;

  // Render Article Header
  const headerContainer = document.getElementById("articleHeaderContainer");
  if (headerContainer) {
    headerContainer.innerHTML = `
      <a href="blog.html" class="article-back-link">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Back to All Articles</span>
      </a>
      <span class="article-header-category">${escapeHtml(post.category)}</span>
      <h1 class="article-header-title">${escapeHtml(post.title)}</h1>
      <p class="article-header-excerpt">${escapeHtml(post.excerpt)}</p>
      <div class="article-meta-row">
        <div class="article-meta-author">
          <img src="${post.authorImage}" alt="${escapeHtml(post.author)}" class="article-author-img" />
          <div class="article-author-meta">
            <strong>${escapeHtml(post.author)}</strong>
            <span>${escapeHtml(post.authorRole)}</span>
          </div>
        </div>
        <div class="article-meta-divider" aria-hidden="true"></div>
        <div class="article-meta-stats">
          <span>${escapeHtml(post.date)}</span>
          <span class="article-meta-dot" aria-hidden="true"></span>
          <span>${escapeHtml(post.readTime)}</span>
        </div>
      </div>
    `;
  }

  // Render Cover Image
  const coverContainer = document.getElementById("articleCoverContainer");
  if (coverContainer) {
    coverContainer.innerHTML = `
      <div class="article-cover-box">
        <img src="${post.image}" alt="${escapeHtml(post.title)}" class="article-cover-img" />
      </div>
    `;
  }

  // Render Article Prose Content Blocks
  const proseContainer = document.getElementById("articleProseContainer");
  if (proseContainer) {
    proseContainer.innerHTML = post.content.map(block => {
      switch (block.type) {
        case "paragraph":
          return `<p>${escapeHtml(block.text)}</p>`;
        case "heading":
          return `<h2>${escapeHtml(block.text)}</h2>`;
        case "quote":
          return `<blockquote>"${escapeHtml(block.text)}"</blockquote>`;
        case "list":
          return `
            <ul>
              ${block.items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          `;
        default:
          return "";
      }
    }).join("");
  }

  // Render Author Box
  const authorBoxContainer = document.getElementById("articleAuthorBoxContainer");
  if (authorBoxContainer) {
    authorBoxContainer.innerHTML = `
      <div class="article-author-box">
        <img src="${post.authorImage}" alt="${escapeHtml(post.author)}" class="author-box-img" />
        <div class="author-box-body">
          <span class="author-box-role">${escapeHtml(post.authorRole)}</span>
          <h3>${escapeHtml(post.author)}</h3>
          <p class="author-box-bio">${escapeHtml(post.authorBio)}</p>
        </div>
      </div>
    `;
  }

  // Render Sidebar Categories
  const sidebarCatContainer = document.getElementById("sidebarCategoriesList");
  if (sidebarCatContainer) {
    const categories = getBlogCategories().filter(c => c !== "All");
    sidebarCatContainer.innerHTML = categories.map(cat => `
      <li class="sidebar-category-item">
        <a href="blog.html?category=${encodeURIComponent(cat)}">
          <span>${escapeHtml(cat)}</span>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </a>
      </li>
    `).join("");
  }

  // Render Sidebar Recent Posts
  const sidebarRecentContainer = document.getElementById("sidebarRecentList");
  if (sidebarRecentContainer) {
    const recentPosts = getRecentBlogPosts(3);
    sidebarRecentContainer.innerHTML = recentPosts.map(rPost => `
      <a href="blog-detail.html?id=${encodeURIComponent(rPost.id)}" class="sidebar-recent-card">
        <div class="sidebar-recent-thumb">
          <img src="${rPost.image}" alt="${escapeHtml(rPost.title)}" loading="lazy" />
        </div>
        <div class="sidebar-recent-info">
          <h4 class="sidebar-recent-title">${escapeHtml(rPost.title)}</h4>
          <span class="sidebar-recent-date">${escapeHtml(rPost.date)}</span>
        </div>
      </a>
    `).join("");
  }

  // Render Related Posts Section (You May Also Like)
  const relatedGridContainer = document.getElementById("relatedPostsGrid");
  if (relatedGridContainer) {
    const related = getRelatedBlogPosts(post.id, 3);
    relatedGridContainer.innerHTML = related.map(rPost => `
      <article class="blog-card" data-id="${rPost.id}">
        <div class="blog-card-media">
          <img src="${rPost.image}" alt="${escapeHtml(rPost.title)}" class="blog-card-img" loading="lazy" />
          <span class="blog-card-category-tag">${escapeHtml(rPost.category)}</span>
        </div>
        <div class="blog-card-body">
          <div class="blog-card-meta-top">
            <span>${escapeHtml(rPost.date)}</span>
            <span class="blog-card-dot" aria-hidden="true"></span>
            <span>${escapeHtml(rPost.readTime)}</span>
          </div>
          <h3 class="blog-card-title">
            <a href="blog-detail.html?id=${encodeURIComponent(rPost.id)}">${escapeHtml(rPost.title)}</a>
          </h3>
          <p class="blog-card-excerpt">${escapeHtml(rPost.excerpt)}</p>
          <div class="blog-card-footer">
            <div class="blog-card-author-info">
              <img src="${rPost.authorImage}" alt="${escapeHtml(rPost.author)}" class="blog-card-author-avatar" />
              <span class="blog-card-author-name">${escapeHtml(rPost.author)}</span>
            </div>
            <a href="blog-detail.html?id=${encodeURIComponent(rPost.id)}" class="blog-card-read-link" aria-label="Read article: ${escapeHtml(rPost.title)}">
              <span>Read Article</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </article>
    `).join("");
  }

  function showNotFound() {
    if (articleContentWrapper) articleContentWrapper.style.display = "none";
    if (notFoundWrapper) notFoundWrapper.style.display = "block";
    document.title = "Article Not Found – ElderCare";
  }

  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
});
