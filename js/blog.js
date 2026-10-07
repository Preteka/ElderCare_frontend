/**
 * ElderCare - Blog Page Interactive Logic
 * Handles dynamic post rendering, real-time search, category filtering, and URL state
 */

document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById("blogCardsGrid");
  const searchInput = document.getElementById("blogSearchInput");
  const categoriesContainer = document.getElementById("blogCategoriesNav");

  if (!gridContainer || typeof BLOG_POSTS === "undefined") return;

  let activeCategory = "All";
  let searchQuery = "";

  // Check URL params for category on load
  const urlParams = new URLSearchParams(window.location.search);
  const paramCategory = urlParams.get("category");
  if (paramCategory) {
    const validCategory = getBlogCategories().find(
      cat => cat.toLowerCase() === paramCategory.toLowerCase()
    );
    if (validCategory) activeCategory = validCategory;
  }

  // Initialize category buttons
  function renderCategories() {
    if (!categoriesContainer) return;
    const categories = getBlogCategories();
    categoriesContainer.innerHTML = categories.map(category => `
      <button 
        type="button" 
        class="blog-cat-btn ${category === activeCategory ? 'is-active' : ''}" 
        data-category="${escapeHtml(category)}"
        aria-pressed="${category === activeCategory}"
      >
        ${escapeHtml(category)}
      </button>
    `).join("");

    categoriesContainer.querySelectorAll(".blog-cat-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const cat = btn.getAttribute("data-category");
        if (cat === activeCategory) return;
        activeCategory = cat;
        updateCategoryButtons();
        filterAndRender();
      });
    });
  }

  function updateCategoryButtons() {
    if (!categoriesContainer) return;
    categoriesContainer.querySelectorAll(".blog-cat-btn").forEach(btn => {
      const isMatch = btn.getAttribute("data-category") === activeCategory;
      btn.classList.toggle("is-active", isMatch);
      btn.setAttribute("aria-pressed", isMatch ? "true" : "false");
    });
  }

  // Render cards
  function renderCards(posts) {
    if (posts.length === 0) {
      gridContainer.innerHTML = `
        <div class="blog-no-results">
          <div class="blog-no-results-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </div>
          <h3 class="blog-no-results-title">No articles found</h3>
          <p class="blog-no-results-desc">We couldn't find any articles matching your search query. Try searching with different keywords or browse all categories.</p>
          <button type="button" class="btn btn-primary" id="resetBlogFilterBtn">
            <span>Show All Articles</span>
          </button>
        </div>
      `;
      const resetBtn = document.getElementById("resetBlogFilterBtn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          activeCategory = "All";
          searchQuery = "";
          if (searchInput) searchInput.value = "";
          updateCategoryButtons();
          filterAndRender();
        });
      }
      return;
    }

    gridContainer.innerHTML = posts.map(post => `
      <article class="blog-card" data-id="${post.id}">
        <div class="blog-card-media">
          <img src="${post.image}" alt="${escapeHtml(post.title)}" class="blog-card-img" loading="lazy" />
          <span class="blog-card-category-tag">${escapeHtml(post.category)}</span>
        </div>
        <div class="blog-card-body">
          <div class="blog-card-meta-top">
            <span>${escapeHtml(post.date)}</span>
            <span class="blog-card-dot" aria-hidden="true"></span>
            <span>${escapeHtml(post.readTime)}</span>
          </div>
          <h3 class="blog-card-title">
            <a href="blog-detail.html?id=${encodeURIComponent(post.id)}">${escapeHtml(post.title)}</a>
          </h3>
          <p class="blog-card-excerpt">${escapeHtml(post.excerpt)}</p>
          <div class="blog-card-footer">
            <div class="blog-card-author-info">
              <img src="${post.authorImage}" alt="${escapeHtml(post.author)}" class="blog-card-author-avatar" />
              <span class="blog-card-author-name">${escapeHtml(post.author)}</span>
            </div>
            <a href="blog-detail.html?id=${encodeURIComponent(post.id)}" class="blog-card-read-link" aria-label="Read article: ${escapeHtml(post.title)}">
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

  // Filter logic
  function filterAndRender() {
    let filtered = getAllBlogPosts();

    // Category filter
    if (activeCategory !== "All") {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    // Search query filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p => {
        const titleMatch = p.title.toLowerCase().includes(q);
        const excerptMatch = p.excerpt.toLowerCase().includes(q);
        const authorMatch = p.author.toLowerCase().includes(q);
        const categoryMatch = p.category.toLowerCase().includes(q);
        const contentMatch = p.content.some(block => 
          (block.text && block.text.toLowerCase().includes(q)) ||
          (block.items && block.items.some(item => item.toLowerCase().includes(q)))
        );
        return titleMatch || excerptMatch || authorMatch || categoryMatch || contentMatch;
      });
    }

    renderCards(filtered);
  }

  // Search input listener
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      filterAndRender();
    });
  }

  // Helper escape
  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Initial render
  renderCategories();
  filterAndRender();
});
