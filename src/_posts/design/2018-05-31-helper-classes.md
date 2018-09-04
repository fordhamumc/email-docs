---
layout: post
date: 2018-05-31
title: Helper classes
description: Screen size-specific classes
category: design
order: 10
---

|---
| Code | Description
|-|-
| `class="cntr-lg"` | Centered content on large screens but not small screens
| `class="cntr-sm"` | Centered content on small screens but not large screens
| `class="hide-md"` | Shows content on large screens but not on medium or small screens
| `class="hide-sm"` | Shows content on large and medium screens but not on small screens
| `class="btn-block-sm"` | Button will take up the full width on small screens. 
| `class="textlink"` | Makes links the color of the text instead of the default link color.

<br> Only show content on small screens
~~~html
<!--[if !mso]><!--><div class="show-sm">Content</div><!--<![endif]-->
~~~
