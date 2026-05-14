---
layout: default
title: Projetos
permalink: /projects/
---

<section class="py-24 px-6 bg-[#0a1628] min-h-screen">
  <div class="max-w-6xl mx-auto">

    <h1 class="text-3xl font-bold text-white text-center mb-10">
      Projetos
    </h1>

    <!-- FILTERS -->
    <div class="flex flex-wrap justify-center gap-2 mb-12">

      {% assign all_tags = site.projects | map: "tags" | join: "," | split: "," | uniq %}

      {% for tag in all_tags %}
        <button class="filter-tag"
                data-tag="{{ tag | strip }}">
          {{ tag | strip }}
        </button>
      {% endfor %}

    </div>

    <!-- PROJECT GRID -->
    <div id="projects-grid" class="grid md:grid-cols-3 gap-8">

      {% for project in site.projects %}
      <a href="{{ project.url }}"
         class="project-card block bg-[#122b50] rounded-2xl overflow-hidden transition-all duration-300"
         data-tags="{{ project.tags | join: ',' }}">

        <img src="{{ project.image }}" class="h-48 w-full object-cover">

        <div class="p-6">
          <h3 class="text-xl font-bold text-white">
            {{ project.title }}
          </h3>

          <p class="text-gray-400 text-sm mt-2">
            {{ project.description }}
          </p>

          <div class="flex flex-wrap gap-2 mt-4">
            {% for tag in project.tags %}
              <span class="project-tag">{{ tag }}</span>
            {% endfor %}
          </div>
        </div>

      </a>
      {% endfor %}

    </div>
  </div>
</section>