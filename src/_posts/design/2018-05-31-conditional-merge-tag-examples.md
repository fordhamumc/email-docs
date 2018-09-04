---
layout: post
date: 2018-05-31
title: Conditional merge tag examples
description: Examples using the conditional merge syntax
category: design
order: 13
---

Conditionally show a salutation to the people who have a first name and hide for everyone else:
~~~ 
*|IF:FNAME|* Dear *|FNAME|*,<br /><br />*|END:IF|*
~~~ 

Conditionally show a salutation to the people who have a first name and a generic greeting to everyone else:
~~~ 
Dear *|IF:FNAME|**|FNAME|**|ELSE:|*Rams*|END:IF|*,<br /><br />
~~~ 

