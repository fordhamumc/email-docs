import jump from 'jump.js';

(function() {
  "use strict";

  var inPageLinks = [ ...document.querySelectorAll('a') ].filter(isInPageLink);

  for (let a of inPageLinks) {
    a.addEventListener('click', onClick, false);
  }

  function onClick(e) {
    e.stopPropagation();
    e.preventDefault();
    jump(e.target.hash);
  }

  function isInPageLink(n) {
    return n.tagName.toLowerCase() === 'a'
      && n.hash.length > 0
      && stripHash(n.href) === stripHash(location.href);
  }

  function stripHash(url) {
    var hashPosition = url.lastIndexOf('#');
    if (hashPosition == -1) return url;
    return url.slice(0, hashPosition);
  }
}());
