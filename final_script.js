const categoryIcons = {
  "Social Media": "fas fa-bullhorn",
  "Banking": "fas fa-vault",
  "Stock Market & Investment": "fas fa-chart-area",
  "Real Estate": "fas fa-house-chimney-user",
  "Transportation": "fas fa-bus-simple",
  "Weather & Maps": "fas fa-earth-europe",
  "Fitness & Sports": "fas fa-person-running",
  "Music & Audio": "fas fa-headphones",
  "TV Channels & Streaming": "fas fa-photo-film",
  "Spiritual & Religious": "fas fa-dove",
  "Events & Ticketing": "fas fa-ticket",
  "Women & Lifestyle": "fas fa-person-dress",
  "Blogging & Publishing": "fas fa-blog",
  "Startup & Business": "fas fa-rocket",
  "Learning to Code": "fas fa-terminal",
  "Kids & Parenting": "fas fa-baby",
  "Local Services": "fas fa-tools",
  "Environment & Green Tech": "fas fa-recycle"
};

const categoryColors = {
  "Social Media": "#f59e0b",
  "Banking": "#10b981",
  "Stock Market & Investment": "#8b5cf6",
  "Real Estate": "#ec4899",
  "Transportation": "#3b82f6",
  "Weather & Maps": "#0ea5e9",
  "Fitness & Sports": "#f43f5e",
  "Music & Audio": "#6366f1",
  "TV Channels & Streaming": "#eab308",
  "Spiritual & Religious": "#14b8a6",
  "Events & Ticketing": "#e11d48",
  "Women & Lifestyle": "#d946ef",
  "Blogging & Publishing": "#6d28d9",
  "Startup & Business": "#f97316",
  "Learning to Code": "#22c55e",
  "Kids & Parenting": "#fb923c",
  "Local Services": "#0d9488",
  "Environment & Green Tech": "#84cc16"
};

// --- Home Page ---
if (document.getElementById("categoriesGrid")) {
  fetch('links.json')
    .then(res => res.json())
    .then(data => {
      renderCategories(data);
      setupSearch(data);
    });

  function renderCategories(data) {
    const categoriesGrid = document.getElementById("categoriesGrid");
    categoriesGrid.innerHTML = "";
    Object.keys(data).forEach(cat => {
      const card = document.createElement("div");
      card.className = "category-card";
      const iconClass = categoryIcons[cat] || "fas fa-folder";
      const color = categoryColors[cat] || "#ccc";
      card.innerHTML = `
        <div class="icon-wrapper" style="background:${color}; color:white;">
          <i class="${iconClass}"></i>
        </div>
        <div class="category-info"><h3>${cat}</h3></div>
      `;
      card.addEventListener("click", () => {
        window.location.href = `links.html?category=${encodeURIComponent(cat)}`;
      });
      categoriesGrid.appendChild(card);
    });
  }
function setupSearch(data) {
  const searchInput = document.getElementById("searchInput");
  const categoriesGrid = document.getElementById("categoriesGrid");

  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase().trim();
    categoriesGrid.innerHTML = "";

    if (!term) {
      // If search is empty, show categories again
      renderCategories(data);
      return;
    }

    let found = false;
    for (const cat in data) {
      data[cat].forEach(link => {
        if (link.name.toLowerCase().includes(term) || link.description.toLowerCase().includes(term)) {
          const domain = new URL(link.url).hostname;
          const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
          const card = document.createElement("div");
          card.className = "link-card";
          card.innerHTML = `
            <div class="link-content">
              <img src="${favicon}" alt="logo" class="favicon">
              <div class="link-name">${link.name}</div>
              <button class="link-options"><i class="fas fa-ellipsis-v"></i></button>
            </div>
          `;
          card.addEventListener("click", () => window.open(link.url, "_blank"));
          categoriesGrid.appendChild(card);
          found = true;
        }
      });
    }

    if (!found) {
      const message = document.createElement("p");
      message.textContent = "No matching websites found.";
      message.style.textAlign = "center";
      categoriesGrid.appendChild(message);
    }
  });
}

}

// --- Links Page ---
if (document.getElementById("linksGrid")) {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  fetch('links.json')
    .then(res => res.json())
    .then(data => {
      if (category && data[category]) {
        renderLinks(data[category], category);
      } else {
        renderLinks([], "Unknown Category");
      }
      setupSearchLinks(data);
    });

  function renderLinks(links, catName) {
    const linksGrid = document.getElementById("linksGrid");
    const categoryIcon = document.getElementById("categoryIcon");
    const categoryNameText = document.getElementById("categoryNameText");
    linksGrid.innerHTML = "";
    categoryIcon.className = categoryIcons[catName] || "fas fa-folder";
    categoryIcon.style.color = categoryColors[catName] || "#000";
    categoryNameText.textContent = catName;

    links.forEach(link => {
      const domain = new URL(link.url).hostname;
      const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
      const card = document.createElement("div");
      card.className = "link-card";
      card.innerHTML = `
        <div class="link-content">
          <img src="${favicon}" alt="logo" class="favicon">
          <div class="link-name">${link.name}</div>
          <button class="link-options"><i class="fas fa-ellipsis-v"></i></button>
        </div>
      `;
      card.addEventListener("click", () => window.open(link.url, "_blank"));
      linksGrid.appendChild(card);
    });
  }

  function setupSearchLinks(data) {
    const searchInput2 = document.getElementById("searchInput2");
    searchInput2.addEventListener("input", e => {
      const term = e.target.value.toLowerCase().trim();
      const linksGrid = document.getElementById("linksGrid");
      linksGrid.innerHTML = "";

      let found = false;
      for (const cat in data) {
        for (const link of data[cat]) {
          if (link.name.toLowerCase().includes(term) || link.description.toLowerCase().includes(term)) {
            const domain = new URL(link.url).hostname;
            const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
            const card = document.createElement("div");
            card.className = "link-card";
            card.innerHTML = `
              <div class="link-content">
                <img src="${favicon}" alt="logo" class="favicon">
                <div class="link-name">${link.name}</div>
                <button class="link-options"><i class="fas fa-ellipsis-v"></i></button>
              </div>
            `;
            card.addEventListener("click", () => window.open(link.url, "_blank"));
            linksGrid.appendChild(card);
            found = true;
          }
        }
      }

      if (!found) {
        const message = document.createElement("p");
        message.textContent = "No matching websites found.";
        message.style.textAlign = "center";
        linksGrid.appendChild(message);
      }
    });

    document.getElementById("backButton").addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
}

// --- Settings & Theme (Common) ---
const settingsIcon = document.getElementById("settingsIcon");
const settingsMenu = document.getElementById("settingsMenu");
const toggleTheme = document.getElementById("toggleTheme");
const closeSettings = document.getElementById("closeSettings");

if (settingsIcon) {
  settingsIcon.addEventListener("click", () => {
    settingsMenu.classList.toggle("hidden");
  });
  closeSettings.addEventListener("click", () => {
    settingsMenu.classList.add("hidden");
  });
  document.addEventListener("click", (e) => {
    if (!settingsMenu.contains(e.target) && !settingsIcon.contains(e.target)) {
      settingsMenu.classList.add("hidden");
    }
  });

  toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggleTheme.textContent = document.body.classList.contains("dark-mode")
      ? "Theme: Light"
      : "Theme: Dark";
  });
}
