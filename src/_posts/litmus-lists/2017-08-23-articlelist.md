---
layout: post
date: 2017-08-23
title: Article List
description: A list of articles.
category: litmus-lists
subcategory: Article
trigger: articlelist
order: 1
---

A list of articles.

![Article list]({{site.image_path}}/{{page.category}}/articlelist.jpg)

~~~
<tr><td class="inner contents article-cont"><table width="100%">
    <tr><td class="article-item">
        <h4><a href="{url}" target="_blank">{title}</a></h4>
        <a href="{url}" target="_blank" class="textlink">{content}</a>
    </td></tr>
    
    <tr><td class="article-item">
        <h4><a href="{url}" target="_blank">{title}</a></h4>
        <a href="{url}" target="_blank" class="textlink">{content}</a>
    </td></tr>
    
    <tr><td class="article-item">
        <h4><a href="{url}" target="_blank">{title}</a></h4>
        <a href="{url}" target="_blank" class="textlink">{content}</a>
    </td></tr>
</table></td></tr>

~~~
{: .language-html.toggle}
