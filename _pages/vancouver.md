---
key: 2
title: Vanouver Reception
permalink: /Vancouver/
excerpt: If you're coming to Vancouver
image: Vancouver.jpg
background-image: Vancouver.jpg
---
{%
if site.social.linkedin-square %}
<div class="table-wrapper">
  <table class="alt"><tbody><tr><td style="text-align: center;">Visit my
  <a target="_blank" href="{{ site.social.linkedin-square }}">LinkedIn profile</a></td>
  </tr></tbody></table>
</div>{%
endif %}
{%
if site.categories.works %}
<div class="table-wrapper">
  <table>
    <tbody>{%
      include fn_groupsort_reverse.html unsorted=site.categories.works groupby='priority' sortby='date'
%}{%  for work in sorted_list %}
      <tr>
        <td><b><a href="{{ work.url | prepend: site.baseurl }}">{{ work.title }}</a></b></td>
        <td>{{ work.date | date: "%b %Y" }}</td>
        <td>{{ work.excerpt | strip_html | truncatewords: 12 }}</td>
        <td>
          {% include techlist.html %}
        </td>
      </tr>{%
      endfor %}
    </tbody>
  </table>
</div>{%
  if site.works_in_progress %}
  <div class="works_inprogress">In-progress, more to come.</div>{%
  endif %}{%
endif
%}
