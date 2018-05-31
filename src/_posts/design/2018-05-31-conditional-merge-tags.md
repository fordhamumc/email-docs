---
layout: post
date: 2018-05-31
title: Conditional merge tags
description: Conditionally show/hide content based on merge tag values
category: design
order: 11
---

`*|IF:MERGE|*` Display if the merge tag value is true. 
~~~ 
*|IF:MERGE|* content to display *|END:IF|* 
~~~

`*|ELSE:|*` Indicate alternative content to display if the merge tag value is false. 
~~~ 
*|IF:MERGE|* content to display
*|ELSE:|* alternative content to display
*|END:IF|*
~~~

`*|ELSEIF:MERGE|*` Specify a new merge tag to be matched against if the first merge tag value is false.
~~~ 
*|IF:MERGE|* content to display
*|ELSEIF:MERGE|* alternative content to display
*|ELSE:|* alternative content to display
*|END:IF|*
~~~

`*|IFNOT|*` Display the content if the merge tag value is false. 
~~~ 
*|IFNOT:MERGE|* content to display *|END:IF|*
~~~ 
