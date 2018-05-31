---
layout: post
date: 2017-08-23
title: Event List
description: A list of events.
category: litmus-lists
subcategory: Event
trigger: eventlist
order: 1
---

A list of events.

![Event list]({{site.image_path}}/{{page.category}}/eventlist.jpg)

~~~
<tr><td class="cont event-list">
    <div class="event"><!--[if (gte mso 9)|(IE)]><table width="100%"><tr><td width="220" valign="top"><![endif]-->
        <div class="col event-img"><table width="100%"><tr><td class="inner contents">
            <a href="{link}" target="_blank">
                <img src="{image 285x160}" width="190" alt="{alt}"/>
            </a>
        </td></tr></table></div><!--[if (gte mso 9)|(IE)]></td><td width="330" valign="top"><![endif]-->
    
        <div class="col event-desc"><table width="100%"><tr><td class="inner contents">
            <h5><a href="{link}" target="_blank">{title}</a></h5>
            <a href="{link}" target="_blank" class="textlink">{date and location}</a>
        </td></tr></table></div><!--[if (gte mso 9)|(IE)]></td><td width="110" valign="top"><![endif]-->

        <div class="col event-rsvp"><table width="100%"><tr><td class="inner contents">
            <a class="btn-sm btn-secondary btn-block" href="{register link}" target="_blank">
                <!--[if (mso)]><pre>&nbsp;&nbsp;&nbsp;&nbsp;</pre><![endif]-->RSVP<!--[if (mso)]><pre>&nbsp;&nbsp;&nbsp;&nbsp;</pre><![endif]--></a>
        </td></tr></table></div><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
        <div class="event-hr">&nbsp;</div>
    </div>
    <!-- ADDITIONAL EVENTS GO HERE tag: event -->
    
    <table width="100%"><tr><td class="inner contents">
        <div class="event-more">
            <a href="{calendar link}" target="_blank">View more events on our calendar.</a>
        </div>
        <div class="break">&nbsp;</div>
    </td></tr></table>
</td></tr>

~~~
{: .language-html.toggle}
