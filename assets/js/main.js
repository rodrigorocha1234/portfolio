lucide.createIcons();

const activeTags = new Set();

const filterButtons = document.querySelectorAll(".filter-tag");
const projects = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const tag = btn.dataset.tag;

    // toggle estado
    if (activeTags.has(tag)) {
      activeTags.delete(tag);
      btn.classList.remove("active");
    } else {
      activeTags.add(tag);
      btn.classList.add("active");
    }

    filterProjects();
  });
});

function filterProjects() {
  projects.forEach(project => {
    const tags = project.dataset.tags.split(",").map(t => t.trim());

    // sem filtro → mostra tudo
    if (activeTags.size === 0) {
      project.style.display = "block";
      return;
    }

    // OR logic: basta 1 match
    const match = [...activeTags].some(tag => tags.includes(tag));

    project.style.display = match ? "block" : "none";
  });
}