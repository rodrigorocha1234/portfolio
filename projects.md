---
layout: default
title: Projetos
permalink: /projects/
css: projects.css
---

<section class="py-24 px-6 bg-[#0a1628] min-h-screen">
  <div class="max-w-6xl mx-auto">

    <!-- TITLE -->
    <h1 class="text-3xl font-bold text-white text-center mb-8">
      Projetos
    </h1>

    <!-- TAG FILTERS -->
    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-2 mb-12">

      {% assign all_tags = site.projects | map: "tags" | join: "," | split: "," | uniq %}

      {% for tag in all_tags %}
        <button
          class="filter-tag w-full text-center truncate whitespace-nowrap overflow-hidden"
          title="{{ tag | strip }}"
          data-tag="{{ tag | strip }}">
          {{ tag | strip }}
        </button>
      {% endfor %}

    </div>

    <!-- PROJECTS GRID -->
    <div id="projectsGrid" class="grid md:grid-cols-3 gap-8">

      {% assign projects_sorted = site.projects | sort: "date" | reverse %}

      {% for project in projects_sorted %}
      <a href="{{ project.url }}"
         class="project-card group relative block bg-[#122b50] rounded-2xl overflow-hidden transition"
         data-tags="{{ project.tags | join: ',' }}"
         data-title="{{ project.title | downcase }}">

        <!-- IMAGE (AJUSTADA) -->
        <img
          src="{{ project.image }}"
          alt="{{ project.title }}"
          class="h-36 w-full object-cover rounded-t-2xl">

        <div class="p-6">

          <!-- TITLE -->
          <h3 class="text-white font-bold text-lg flex items-center gap-2">
            {{ project.title }}

            {% if forloop.first %}
              <span class="text-[10px] px-2 py-[2px] rounded-full bg-cyan-400 text-[#0a1628] font-bold">
                Novo
              </span>
            {% endif %}
          </h3>

          <!-- DESCRIPTION -->
          <p class="text-gray-400 text-sm mt-2">
            {{ project.description }}
          </p>

          <!-- TAGS -->
          <div class="flex flex-wrap gap-2 mt-4">
            {% for tag in project.tags %}
              <span
                class="inline-flex items-center px-3 py-1 text-[11px] font-semibold rounded-full
                       text-cyan-300 bg-cyan-400/10 border border-cyan-400/25
                       hover:bg-cyan-400/20 transition">
                {{ tag }}
              </span>
            {% endfor %}
          </div>

          <!-- HINT -->
          <div class="project-hint">
            <span>Ler projeto completo</span>
            <span class="project-arrow">→</span>
          </div>

        </div>
      </a>
      {% endfor %}

    </div>

  </div>
</section>