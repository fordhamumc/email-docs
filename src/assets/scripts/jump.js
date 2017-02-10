const jumper = function() {
  "use strict";

  function setOptions(target, {
    duration = 300,           // scroll duration                        (ms)
    offset = 0,               // adjustment from the stop position      (px)
    easing = easeInOutQuad,   // easing function                        (function)
    a11y = true               // accessibility support flag             (boolean)
  } = {}) {

    var element,              // target element                         (object)
        start,                // starting scroll position               (px)
        end;                  // ending scroll position                 (px)

    start = scrollLocation();

    if (typeof target == 'string') {
      element = document.querySelector(target);
    }

    if (typeof target == 'object') {
      element = target;
    }

    if (!element) {
      a11y = false;   // there will be nothing to focus on if target is undefined
      end = start + (target * 1 || 0);
    } else {
      end = elementLocation(element, start);
    }

    return {element, a11y, start, end, easing, offset, duration};
  }

  // default easing function

  function easeInOutQuad (t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
  }

  // scroll position helper

  function scrollLocation() {
    return window.scrollY || window.pageYOffset;
  }

  // element offset helper

  function elementLocation(element, start) {
    return element.getBoundingClientRect().top + start;
  }

  function *step(currentTime = 0, {duration, start, end, offset, easing}) {

    var distance = end - start + offset,
        timeStart = currentTime;

    function timeElapsed() {
      return currentTime - timeStart;
    }

    while (timeElapsed() < duration) {
      currentTime = yield easing(timeElapsed(), start, distance, duration);
    }

    return end + offset;
  }


  function jump(target, options) {
    var position;

    // rAF scroll loop
    function loop(timeCurrent) {
      var next = position.next(timeCurrent);
      console.log(next);
      if (!next.done) window.requestAnimationFrame(loop);
    }

    // kick off scrolling
    window.requestAnimationFrame(function (timeCurrent) {
      position = step(timeCurrent, setOptions(target, options));
      loop(timeCurrent);
    });
  }

  return jump;
};

export default jumper;
