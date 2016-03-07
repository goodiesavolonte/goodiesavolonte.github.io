---
layout: page
title: Recipes
permalink: /recipes/
order: 3
custom_js:
- post-browser
---

<ul class="pb-option-list">
{% include pb-options.html options=site.categories option_type="Categories" %}
{% include pb-options.html options=site.tags option_type="Ingredients" %}
</ul>
<ul class="pb-post-list">
{% for post in site.posts %}
{% if post.thumbnail %}
	{% assign cat_classes = "" %}
	{% for cat in post.categories %}
		{% assign cat_name = cat | replace:' ','-' %}
		{% assign cat_classes = cat_classes | append: " pb-cat-" | append: cat_name %}
	{% endfor %}
	{% for tag in post.tags %}
		{% assign tag_name = tag | replace:' ','-' %}
		{% assign cat_classes = cat_classes | append: " pb-cat-" | append: tag_name %}
	{% endfor %}
  <li class="pb-post-item {{ cat_classes }}">
  	<a href="{{ post.url | prepend: site.baseurl }}">
  		<h3>{{ post.title }}</h3>
	  	<img width="150" height="150" src="{{ post.thumbnail | prepend: site.baseurl }}" />
  	</a>
  </li>
{% endif %}
{% endfor %}
</ul>
