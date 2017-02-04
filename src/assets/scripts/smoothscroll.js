initSmoothScrolling();

function initSmoothScrolling() {
  if ('scrollBehavior' in document.documentElement.style) return;

  var duration = 300,
    pageUrl = location.hash ? stripHash(location.href) : location.href;

  addClickHandler();

  function addClickHandler() {
    var links = [...document.querySelectorAll('a')].filter(isInPageLink);
    for (let a of links) {
      a.addEventListener('click', onClick, false);
    }

    function onClick(e) {
      e.stopPropagation();
      e.preventDefault();
      var hash = e.target.hash;

      jump(hash, {
        duration: duration,
        callback: function() {
          setFocus(hash);
          history.pushState(null,null,hash);
        }
      });
    }

  }

  function isInPageLink(n) {
    return n.tagName.toLowerCase() === 'a' &&
      n.hash.length > 0 &&
      stripHash(n.href) === pageUrl;
  }

  function stripHash(url) {
    return url.slice(0, url.lastIndexOf('#'));
  }

  function setFocus(hash) {
    var element = document.getElementById(hash.substring(1));

    if (element) {
      if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
        element.tabIndex = -1;
      }

      element.focus();
    }
  }

}

function jump(target, options) {
  var
    start = window.pageYOffset,
    opt = {
      duration: options.duration,
      offset: options.offset || 0,
      callback: options.callback,
      easing: options.easing || easeInOutQuad
    },
    distance = typeof target === 'string' ?
      opt.offset + document.querySelector(target).getBoundingClientRect().top :
      target,
    duration = typeof opt.duration === 'function' ?
      opt.duration(distance) :
      opt.duration,
    timeStart, timeElapsed;

  requestAnimationFrame(function(time) {
    timeStart = time;
    loop(time);
  });

  function loop(time) {
    timeElapsed = time - timeStart;

    window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));

    if (timeElapsed < duration)
      requestAnimationFrame(loop);
    else
      end();
  }

  function end() {
    window.scrollTo(0, start + distance);

    if (typeof opt.callback === 'function')
      opt.callback();
  }

  // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

}
