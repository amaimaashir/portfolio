// ================================
//  SANITY CONFIG
//  Replace these with your actual
//  Sanity project values
// ================================
const SANITY_PROJECT_ID = "zzi4rw4f";   // from sanity.io/manage
const SANITY_DATASET    = "production";         // usually 'production'
const SANITY_API_VER    = "2024-01-01";         // any recent date is fine


// ================================
//  BUILD SANITY IMAGE URL
// ================================
function buildImageUrl(ref) {
  if (!ref) return null;

  // ref format: image-XXXXX-800x600-jpg
  const parts = ref.split("-");
  const id    = parts[1];
  const dims  = parts[2];
  const fmt   = parts[3];

  return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dims}.${fmt}`;
}


// ================================
//  FETCH FROM SANITY
// ================================
async function sanityFetch(query) {
  const encoded = encodeURIComponent(query);
  const url     = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VER}/data/query/${SANITY_DATASET}?query=${encoded}`;

  try {
    const res  = await fetch(url);
    const data = await res.json();
    return data.result;
  } catch (err) {
    console.error("Sanity fetch error:", err);
    return [];
  }
}


// ================================
//  BUILD GITHUB PROJECT CARD
// ================================
function buildGithubCard(project) {
  const imageUrl = buildImageUrl(project.thumbnail?.asset?._ref);

  const thumb = imageUrl
    ? `<img src="${imageUrl}" alt="${project.title}" class="card-thumb" />`
    : `<div class="card-thumb-placeholder">&#60;/&#62;</div>`;

  const tags = (project.tags || [])
    .map((t) => `<span class="card-tag">${t}</span>`)
    .join("");

  return `
    <div class="card fade-up">
      ${thumb}
      <div class="card-body">
        <h3 class="card-title">${project.title}</h3>
        <p class="card-desc">${project.description || ""}</p>
        <div class="card-tags">${tags}</div>
        <div class="card-links">
          ${project.githubUrl
            ? `<a href="${project.githubUrl}" target="_blank" class="card-btn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </a>`
            : ""}
          ${project.liveUrl
            ? `<a href="${project.liveUrl}" target="_blank" class="card-btn live">
                <span class="live-dot"></span>
                Live
              </a>`
            : ""}
        </div>
      </div>
    </div>
  `;
}


// ================================
//  BUILD AI WEBSITE CARD
// ================================
function buildAiCard(project) {
  const imageUrl = buildImageUrl(project.thumbnail?.asset?._ref);

  const thumb = imageUrl
    ? `<img src="${imageUrl}" alt="${project.title}" class="card-thumb" />`
    : `<div class="card-thumb-placeholder">&#9881;</div>`;

  const tools = (project.toolsUsed || [])
    .map((t) => `<span class="card-tag">${t}</span>`)
    .join("");

  return `
    <div class="card fade-up">
      ${thumb}
      <div class="card-body">
        <h3 class="card-title">${project.title}</h3>
        <p class="card-desc">${project.description || ""}</p>
        <div class="card-tags">${tools}</div>
        <div class="card-links">
          <span class="live-badge">
            <span class="live-dot"></span>
            Live site
          </span>
          ${project.liveUrl
            ? `<a href="${project.liveUrl}" target="_blank" class="card-btn live">
                Visit ↗
              </a>`
            : ""}
        </div>
      </div>
    </div>
  `;
}


// ================================
//  LOAD GITHUB PROJECTS
// ================================
async function loadGithubProjects() {
  const container = document.getElementById("githubCardsContainer");
  if (!container) return;

  const query = `*[_type == "githubProject"] | order(_createdAt desc) {
    title,
    description,
    githubUrl,
    liveUrl,
    tags,
    thumbnail
  }`;

  const projects = await sanityFetch(query);

  if (!projects || projects.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span>&#128193;</span>
        No projects added yet — add them in your Sanity dashboard.
      </div>`;
    return;
  }

  container.innerHTML = projects.map(buildGithubCard).join("");

  // trigger card animations after inject
  if (typeof window.animateCards === "function") {
    window.animateCards("#githubCardsContainer");
  }
}


// ================================
//  LOAD AI WEBSITES
// ================================
async function loadAiWebsites() {
  const container = document.getElementById("aiCardsContainer");
  if (!container) return;

  const query = `*[_type == "aiWebsite"] | order(_createdAt desc) {
    title,
    description,
    liveUrl,
    toolsUsed,
    thumbnail
  }`;

  const projects = await sanityFetch(query);

  if (!projects || projects.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span>&#127760;</span>
        No websites added yet — add them in your Sanity dashboard.
      </div>`;
    return;
  }

  container.innerHTML = projects.map(buildAiCard).join("");

  // trigger card animations after inject
  if (typeof window.animateCards === "function") {
    window.animateCards("#aiCardsContainer");
  }
}


// ================================
//  INIT — RUN ON PAGE LOAD
// ================================
document.addEventListener("DOMContentLoaded", () => {
  loadGithubProjects();
  loadAiWebsites();
});