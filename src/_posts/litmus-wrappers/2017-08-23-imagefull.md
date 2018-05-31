---
layout: post
date: 2017-08-23
title: Image Row (Full Width)
description: A large image that takes up the entire message (without the white border)
imagewidth: 1095
trigger: imagefull
category: litmus-wrappers
subcategory: 1 Column
order: 3
---

A large image that takes up the entire message (without the white border).

![Full-width image]({{site.image_path}}/{{page.category}}/image-full.jpg)

~~~
<tr><td class="inner contents fullimage">
    <img src="{image 1095px wide}" width="730" alt="{alt}"/>
</td></tr>

~~~
{: .language-html.toggle}
