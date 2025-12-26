---
layout: default
title: 首頁
---

<div class="posts-grid">
    {% for post in site.posts %}
    <div class="post-card">
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <time>{{ post.date | date: "%Y年%m月%d日" }}</time>
        <p>{{ post.excerpt }}</p>
    </div>
    {% endfor %}
</div>