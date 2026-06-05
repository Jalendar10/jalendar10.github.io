const year = document.getElementById("year");
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
const repoGrid = document.getElementById("repoGrid");
const commitList = document.getElementById("commitList");

const repositories = [
  {
    name: "jalendar10.github.io",
    description: "Personal portfolio website.",
    url: "https://github.com/Jalendar10/jalendar10.github.io",
    language: "HTML",
    stars: 0,
    forks: 0,
    updated: "2026-06-05",
  },
  {
    name: "GRC_System",
    description: "Public repository.",
    url: "https://github.com/Jalendar10/GRC_System",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    updated: "2026-05-25",
  },
  {
    name: "floci-ui",
    description: "Public repository.",
    url: "https://github.com/Jalendar10/floci-ui",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    updated: "2026-05-18",
  },
  {
    name: "ML",
    description: "Public repository.",
    url: "https://github.com/Jalendar10/ML",
    language: "Jupyter Notebook",
    stars: 0,
    forks: 0,
    updated: "2026-05-17",
  },
  {
    name: "codevisual",
    description: "Public repository.",
    url: "https://github.com/Jalendar10/codevisual",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    updated: "2026-04-20",
  },
  {
    name: "GhostIDE",
    description: "Public repository.",
    url: "https://github.com/Jalendar10/GhostIDE",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    updated: "2026-04-11",
  },
  {
    name: "copliot_bypass_cli",
    description: "Public repository.",
    url: "https://github.com/Jalendar10/copliot_bypass_cli",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    updated: "2026-03-18",
  },
  {
    name: "Browsershield",
    description: "Public repository.",
    url: "https://github.com/Jalendar10/Browsershield",
    language: "JavaScript",
    stars: 1,
    forks: 0,
    updated: "2026-03-09",
  },
  {
    name: "deer-flow",
    description: "An open-source SuperAgent harness that researches, codes, and creates.",
    url: "https://github.com/Jalendar10/deer-flow",
    language: "Public",
    stars: 0,
    forks: 0,
    updated: "2026-03-23",
  },
  {
    name: "EduOrbit",
    description: "Public repository.",
    url: "https://github.com/Jalendar10/EduOrbit",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    updated: "2026-02-25",
  },
  {
    name: "systemcontrol",
    description: "Public repository.",
    url: "https://github.com/Jalendar10/systemcontrol",
    language: "Python",
    stars: 0,
    forks: 0,
    updated: "2026-02-25",
  },
  {
    name: "OpenMind",
    description: "Public repository.",
    url: "https://github.com/Jalendar10/OpenMind",
    language: "Python",
    stars: 0,
    forks: 0,
    updated: "2026-02-24",
  },
  {
    name: "agent-zero",
    description: "Agent Zero AI framework.",
    url: "https://github.com/Jalendar10/agent-zero",
    language: "Public",
    stars: 0,
    forks: 0,
    updated: "2026-02-23",
  },
  {
    name: "AI-Trader",
    description: "AI-Trader: Can AI Beat the Market?",
    url: "https://github.com/Jalendar10/AI-Trader",
    language: "Public",
    stars: 0,
    forks: 0,
    updated: "2025-12-19",
  },
  {
    name: "alm-core",
    description: "Public repository.",
    url: "https://github.com/Jalendar10/alm-core",
    language: "Python",
    stars: 0,
    forks: 0,
    updated: "2025-12-14",
  },
  {
    name: "docker-mlops-platform",
    description: "Complete MLOps Platform with Docker, Streamlit, FastAPI, and MLflow.",
    url: "https://github.com/Jalendar10/docker-mlops-platform",
    language: "Python",
    stars: 0,
    forks: 0,
    updated: "2025-08-05",
  },
  {
    name: "Nova",
    description: "Public repository.",
    url: "https://github.com/Jalendar10/Nova",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    updated: "2026-02-08",
  },
  {
    name: "MITChallenge1_AlignOS",
    description: "Public repository.",
    url: "https://github.com/Jalendar10/MITChallenge1_AlignOS",
    language: "Public",
    stars: 0,
    forks: 0,
    updated: "2026-02-08",
  },
  {
    name: "merge_cli_test",
    description: "Public repository.",
    url: "https://github.com/Jalendar10/merge_cli_test",
    language: "Public",
    stars: 0,
    forks: 0,
    updated: "2026-03-18",
  },
];

const commits = [
  {
    repo: "jalendar10.github.io",
    sha: "9334e46",
    message: "feat: redesign portfolio website",
    date: "2026-06-05",
    url: "https://github.com/Jalendar10/jalendar10.github.io/commit/9334e46451f0e6d0d698748949c8873b6e35b277",
  },
  {
    repo: "jalendar10.github.io",
    sha: "af8fb77",
    message: "Add personal portfolio website",
    date: "2026-06-05",
    url: "https://github.com/Jalendar10/jalendar10.github.io/commit/af8fb77f4566c7f85994bcb22124c497dbe474fd",
  },
  {
    repo: "GRC_System",
    sha: "ee40949",
    message: "Infographic v5: remove yellow arc, remove Built-with-Claude, clean arrows",
    date: "2026-05-25",
    url: "https://github.com/Jalendar10/GRC_System/commit/ee40949e065384ca19b44ab0a736e01d61d613ce",
  },
  {
    repo: "GRC_System",
    sha: "bbf2549",
    message: "Remove yellow arc arrow and 'Built with Claude AI' from infographic",
    date: "2026-05-25",
    url: "https://github.com/Jalendar10/GRC_System/commit/bbf2549cf930c3a67fbe6210ad5aa3df3f507d59",
  },
  {
    repo: "floci-ui",
    sha: "a857ced",
    message: "Add right-side AI Agent panel for creating AWS services via chat",
    date: "2026-05-18",
    url: "https://github.com/Jalendar10/floci-ui/commit/a857ced2f985f41653811334927b42bfe2283425",
  },
  {
    repo: "floci-ui",
    sha: "55095be",
    message: "Build Floci from source so image always has latest code",
    date: "2026-05-18",
    url: "https://github.com/Jalendar10/floci-ui/commit/55095be671256247bf3e76fcdf3c4d687431642c",
  },
  {
    repo: "ML",
    sha: "15b8c9b",
    message: "first commit",
    date: "2026-05-17",
    url: "https://github.com/Jalendar10/ML/commit/15b8c9b8e06d4661854c8fb7c69822cb4df3376c",
  },
];

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

if (repoGrid) {
  repoGrid.innerHTML = repositories
    .map(
      (repo) => `
        <a class="repo-card reveal" href="${repo.url}" target="_blank" rel="noopener">
          <div>
            <h3>${repo.name}</h3>
            <p>${repo.description}</p>
          </div>
          <div class="repo-meta">
            <span>${repo.language}</span>
            <span>${repo.stars} stars</span>
            <span>${repo.forks} forks</span>
            <span>Updated ${repo.updated}</span>
          </div>
        </a>
      `,
    )
    .join("");
}

if (commitList) {
  commitList.innerHTML = commits
    .map(
      (commit) => `
        <article class="commit-card">
          <a href="${commit.url}" target="_blank" rel="noopener">${commit.repo} · ${commit.sha}</a>
          <p>${commit.date} · ${commit.message}</p>
        </article>
      `,
    )
    .join("");
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
