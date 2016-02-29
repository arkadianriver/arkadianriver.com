---
id: 3
title: Contact
permalink: /contact/
options: nolanding
excerpt: Get in touch
image: pic02.jpg
---

<section>
  <form method="post" action="http://arkadianriver.com/cgi-bin/cgiemail/mailtome.config">
    <div class="row uniform">
      <div class="6u 12u$(xsmall)">
        <input type="text" name="required-name" id="required-name" value="" placeholder="Name" />
      </div>
      <div class="6u$ 12u$(xsmall)">
        <input type="email" name="required-email" id="required-email" value="" placeholder="Email" />
      </div>
      <div class="12u$">
        <input type="text" name="required-subject" id="required-subject" value="" placeholder="Subject" />
      </div>
      <div class="12u$">
        <textarea name="textbody" id="textbody" placeholder="Enter your message" rows="6"></textarea>
      </div>
      <div class="12u$">
        <ul class="actions">
          <li><input type="submit" value="Send Message" class="special" /></li>
        </ul>
      </div>
    </div>
    <input type="hidden" name="success"
           value="{{ '/contact-success' | prepend: site.baseurl | prepend: site.url }}" />
  </form>
</section>
