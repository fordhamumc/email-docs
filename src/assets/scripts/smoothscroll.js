// current scroll position
"use strict";
function scroller () {
  "use strict";

  function location() {
    return window.scrollY || window.pageYOffset
  }

  // element offset

  function top(element) {
    return element.getBoundingClientRect().top + start
  }
}

function *ag() {
  var start = new Date();

  for (let i = 0; i < 2000; i++) {
    window.requestAnimationFrame(function() {
      yield i;
    });
  }
  var end = new Date();
  console.log(`Time elapsed: ${end.getTime() - start.getTime()}`);
}

for (a of ag()) {
  console.log(a);
}





function linearEasing(t, b, c, d) {
  return c*t/d + b;
}

function *step(currentTime = 0, {
  duration = 300,         // scroll duration            (ms)
  start = 10,             // starting scroll position   (px)
  end = 1000,             // ending scroll position     (px)
  offset = 0,             // end position adjustment    (px)
  easing = linearEasing   // easing function            (function)
} = {}) {

  var distance = end - start + offset,
      timeStart = currentTime;

  function timeElapsed() {
    return currentTime - timeStart;
  }

  function next() {
    return easing(timeElapsed(), start, distance, duration);
  }

  while (timeElapsed() < duration) {
    currentTime = yield next();
  }

  return end + offset;
}

function scroll(options) {
  var position;

  function loop(timeCurrent) {
    var next = position.next(timeCurrent);
    console.log(next);
    if (!next.done) window.requestAnimationFrame(loop);
  }

  window.requestAnimationFrame( function (timeCurrent) {
    position = step(timeCurrent, options);
    loop(timeCurrent);
  });
}

scroll({duration: 600, end: 3234});




function jumper() {
  // private variable cache
  // no variables are created during a jump, preventing memory leaks

  let element         // element to scroll to                   (node)

  let start           // where scroll starts                    (px)
  let stop            // where scroll stops                     (px)

  let offset          // adjustment from the stop position      (px)
  let easing          // easing function                        (function)
  let a11y            // accessibility support flag             (boolean)

  let distance        // distance of scroll                     (px)
  let duration        // scroll duration                        (ms)

  let timeStart       // time scroll started                    (ms)
  let timeElapsed     // time spent scrolling thus far          (ms)

  let next            // next scroll position                   (px)

  let callback        // to call when done scrolling            (function)

  // scroll position helper

  function location () {
    return window.scrollY || window.pageYOffset
  }

  // element offset helper

  function top (element) {
    return element.getBoundingClientRect().top + start
  }

  // rAF loop helper

  function loop (timeCurrent) {
    // store time scroll started, if not started already
    if (!timeStart) {
      timeStart = timeCurrent
    }

    // determine time spent scrolling so far
    timeElapsed = timeCurrent - timeStart

    // calculate next scroll position
    next = easing(timeElapsed, start, distance, duration)

    // scroll to it
    window.scrollTo(0, next)

    // check progress
    timeElapsed < duration
      ? window.requestAnimationFrame(loop)       // continue scroll loop
      : done()                                   // scrolling is done
  }

  // scroll finished helper

  function done () {
    // account for rAF time rounding inaccuracies
    window.scrollTo(0, start + distance)

    // if scrolling to an element, and accessibility is enabled
    if (element && a11y) {
      // add tabindex indicating programmatic focus
      element.setAttribute('tabindex', '-1')

      // focus the element
      element.focus()
    }

    // if it exists, fire the callback
    if (typeof callback === 'function') {
      callback()
    }

    // reset time for next jump
    timeStart = false
  }

  // API

  function jump (target, {
    duration = 300,
    offset = 0,
    easing = function(){},
    a11y = false
  } = {}) {

    // cache starting position
    // resolve target
    switch (typeof target) {
      // scroll from current position
      case 'number':
        element = undefined           // no element to scroll to
        a11y = false                  // make sure accessibility is off
        stop = start + target
        break

      // scroll to element (node)
      // bounding rect is relative to the viewport
      case 'object':
        element = target
        stop = top(element)
        break

      // scroll to element (selector)
      // bounding rect is relative to the viewport
      case 'string':
        element = document.querySelector(target)
        stop = top(element)
        break
    }

    // resolve scroll distance, accounting for offset
    distance = stop - start + offset

    // resolve duration
    switch (typeof duration) {
      // number in ms
      case 'number':
        duration = duration
        break

      // function passed the distance of the scroll
      case 'function':
        duration = duration(distance)
        break
    }

    // start the loop
    window.requestAnimationFrame(loop)
  }

  // expose only the jump method
  return jump


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

}

